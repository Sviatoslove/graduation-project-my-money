import React, { useEffect, useState } from 'react';
import Container from '../../components/common/Containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import {
  categoriesRemove,
  loadCategories,
  selectCategoriesDataloaded,
  selectCategories,
  selectCategoriesIsLoading,
} from '../../store/categoriesSlice';
import Button from '../../components/common/Button';
import { useForms } from '../../hooks/useForm';
import CategoriesForm from './CategoriesForm';
import {
  ContainerCards,
  ContainerScale,
  ContainerShow,
} from '../../components/common/Containers';
import CategoryCard from './CategoryCard';
import StatusAll from '../../components/common/StatusAll';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { disAppearanceForm, transform, statusOperation, handleClick } = useForms();
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
  }, []);

  const handleRemove = (id) => {
    dispatch(categoriesRemove(id));
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
        <CategoriesForm
          status={statusOperation}
          closeForm={disAppearanceForm}
          currentCategory={''}
        />
      </ContainerShow>

      <StatusAll classes={'mt-4'} />

      <ContainerScale classes={'flex-grow-1 mt-5'}>
        <ContainerCards colsNumber={'5'} gap={'4'}>
          {filteredCategories?.map((category) => (
            <CategoryCard
              remove={handleRemove}
              {...category}
              key={category._id}
            />
          ))}
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
