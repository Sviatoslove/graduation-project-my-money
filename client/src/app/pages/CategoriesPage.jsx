import React, { useEffect } from 'react';
import Container from '../components/common/Containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import {
  loadCategories,
  selectCategries,
  selectCategriesDataloaded,
  selectCategriesIcons,
  selectCategriesIconsDataloaded,
  selectCategriesIsLoading,
  loadСategoriesIcons,
} from '../store/categoriesSlice';
import Button from '../components/common/Button';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categoriesDataLoaded = useSelector(selectCategriesDataloaded());
  const categoriesIsLoading = useSelector(selectCategriesIsLoading());
  const categories = useSelector(selectCategries());

  const categoriesIconsDataLoaded = useSelector(
    selectCategriesIconsDataloaded()
  );
  const categoriesIcons = useSelector(selectCategriesIcons());

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
    if (!categoriesIconsDataLoaded) dispatch(loadСategoriesIcons());
  }, []);

  const handleToEdit = () => {
    console.log('handleToEdit:');
  };

  return (
    <Container classes={'shadow-custom br-10'}>
      <div className="mt-8">
        {!categoriesDataLoaded && (
          <h1 className="position-absolute ws-nw top-50 start-50 translate-middle">
            Добавьте свою первую категорию
          </h1>
        )}
        <ul className="nav nav-tabs nav-tabs justify-content-evenly">
          <li className="nav-item border-4">
            <a className="nav-link active" aria-current="page" href="#">
              Расходы
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Доходы
            </a>
          </li>
        </ul>
        <Button
          color="primary"
          classes="shadow-lg p-2"
          dataType="add"
          onClick={handleToEdit}
          imgSrc={addIcon}
        />
      </div>
    </Container>
  );
};

export default CategoriesPage;
