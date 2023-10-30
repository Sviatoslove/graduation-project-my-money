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
import {
  ContainerCards,
  ContainerScale,
  ContainerShow,
} from '../../components/common/Containers';
import CategoryCard from './CategoryCard';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { appearanceCountsForm, disAppearanceCountsForm, transform } =
    useForms();
  const [statusOperation, setStatusOperation] = useState('decrement');

  const categoriesDataLoaded = useSelector(selectCategriesDataloaded());
  const categoriesIsLoading = useSelector(selectCategriesIsLoading());
  const categories = useSelector(selectCategries());
  console.log('categories:', categories)
  const filteredCategories = categories
    ? Object.values(categories).filter(
        (category) => category.status === statusOperation
      )
    : null;

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
  }, []);

  const handleClick = (e) => {
    const { target } = e;
    const btnType = target.closest('button').dataset.type;
    if (btnType === 'add') {
      appearanceCountsForm();
    } else {
      setStatusOperation(btnType);
    }
  };

  return (
    <Container classes={'shadow-custom br-10 p-3'}>
      {!categoriesIsLoading && !categoriesDataLoaded && (
        <h1
          className="scaleTransition position-absolute ws-nw top-48 start-24"
          style={{ transform: transform }}
        >
          Добавьте свою первую категорию
        </h1>
      )}

      <ContainerShow type={'add'}>
        <AddAndUpdateCategories
          status={statusOperation}
          closeForm={disAppearanceCountsForm}
          currentCategory={''}
        />
      </ContainerShow>

      <StatusCategories status={statusOperation} onClick={handleClick} />

      <ContainerScale classes={'flex-grow-1 mt-5'}>
        <ContainerCards colsNumber={'6'}>
          {filteredCategories?.map(category=><CategoryCard {...category} key={category._id}/>)}
        </ContainerCards>
      </ContainerScale>

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
