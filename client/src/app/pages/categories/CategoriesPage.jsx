import React, { useEffect, useState } from 'react';
import Container from '../../components/common/Containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import {
  loadCategories,
  selectCategries,
  selectCategriesDataloaded,
  selectCategriesIsLoading,
} from '../../store/categoriesSlice';
import Button from '../../components/common/Button';
import StatusCategories from './StatusCategories';
import { useForms } from '../../hooks/useForm';
import AddAndUpdateCategories from './AddAndUpdateCategories';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const {
    countAdd,
    appearanceCountsForm,
    disAppearanceCountsForm,
    transform
  } = useForms();
  const [statusOperation, setStatusOperation] = useState('decrement');

  const categoriesDataLoaded = useSelector(selectCategriesDataloaded());
  const categoriesIsLoading = useSelector(selectCategriesIsLoading());
  const categories = useSelector(selectCategries());
  console.log('categories:', categories)

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
  }, []);

  const handleClick = (e) => {
    const { target } = e;
    const btnType = target.closest('button').dataset.type;
    if (btnType === 'add') {
      appearanceCountsForm()
    } else {
      setStatusOperation(btnType);
    }
  };


  return (
    <Container classes={'shadow-custom br-10 p-3'}>
      {countAdd && <AddAndUpdateCategories status={statusOperation} closeForm={disAppearanceCountsForm} currentCategory={''}/>}

      <div className="mt-4 flex-grow-1">

        {!categoriesDataLoaded && (
          <h1 className="position-absolute ws-nw top-50 start-50 translate-middle">
            Добавьте свою первую категорию
          </h1>
        )}

        <StatusCategories status={statusOperation} onClick={handleClick} />

      </div>

      <Button
        color="primary"
        classes="shadow-lg p-2 ms-auto"
        dataType="add"
        onClick={handleClick}
        imgSrc={addIcon}
      />

    </Container>
  );
};

export default CategoriesPage;
