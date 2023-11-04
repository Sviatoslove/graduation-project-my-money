import React, { useEffect, useState } from 'react';
import Container from '../../components/common/Containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import {
  categoriesRemove,
  loadCategories,
  loadСategoriesIcons,
  selectCategoriesDataloaded,
  selectCategories,
  selectCategoriesIsLoading,
  categoriesUpdate,
  selectCategoriesIconsDataloaded,
  selectCategoriesIcons,
} from '../../store/categoriesSlice';
import Button from '../../components/common/buttons/Button';
import { useForms } from '../../hooks/useForm';
import CategoriesForm from './CategoriesForm';
import {
  ContainerCards,
  ContainerScale,
  ContainerShow,
} from '../../components/common/Containers';
import CategoryCard from './CategoryCard';
import StatusAll from '../../components/common/StatusAll';
import LoadingSpinners from '../../components/common/LoadingSpinners';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { disAppearanceForm, transform, statusOperation, countsHandleToEdit } =
    useForms();
  const categoriesIconsDataLoaded = useSelector(
    selectCategoriesIconsDataloaded()
  );

  const categoriesIcons = useSelector(selectCategoriesIcons());
  console.log('categoriesIcons:', categoriesIcons);
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading());
  const categories = useSelector(selectCategories());

  const filteredCategories =
    categories &&
    Object.values(categories).filter(
      (category) => category.status === statusOperation
    );

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
    if (!categoriesIconsDataLoaded) dispatch(loadСategoriesIcons());
  }, []);

  return (
    <Container classes={'shadow-custom br-10 p-3'}>
      {!categoriesDataLoaded && (
        <h1
          className="scaleTransition position-absolute ws-nw top-48 start-24"
          style={{ transform: transform }}
        >
          Добавьте свою первую категорию
        </h1>
      )}

      <ContainerShow type={'add'}>
        <CategoriesForm
          categoriesIcons={categoriesIcons}
          status={statusOperation}
          closeForm={disAppearanceForm}
          categories={categories}
        />
      </ContainerShow>

      <StatusAll classes={'mt-4'} />

      <ContainerScale classes={'flex-grow-1 mt-5'}>
        <ContainerCards colsNumber={'5'} gap={'4'}>
       
          {categoriesIcons ? filteredCategories?.map((category) => (
            <CategoryCard
              categoriesIcons={categoriesIcons}
              onClick={countsHandleToEdit}
              category={category}
              key={category._id}
            />
          )): <LoadingSpinners number={3}/>}
        </ContainerCards>
      </ContainerScale>
      <ContainerScale classes={'p-2 ms-auto'}>
        <Button
          bgColor="primary"
          classes="shadow-lg"
          dataType="add"
          onClick={countsHandleToEdit}
          imgSrc={addIcon}
          iconSize={'52px'}
        />
      </ContainerScale>
    </Container>
  );
};

export default CategoriesPage;
