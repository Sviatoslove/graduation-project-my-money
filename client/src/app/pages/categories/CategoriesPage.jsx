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
import Pagination from '../../components/common/pagination';
import { paginate } from '../../utils';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const {
    transform,
    statusOperation,
    essenceHandleToEdit,
    currentPage,
    handlePageChange,
  } = useForms();

  const categoriesIconsDataLoaded = useSelector(
    selectCategoriesIconsDataloaded()
  );

  const categoriesIcons = useSelector(selectCategoriesIcons());
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading());
  const categories = useSelector(selectCategories());
  const pageSize = 20;

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
    if (!categoriesIconsDataLoaded) dispatch(loadСategoriesIcons());
  }, []);

  const filterForLikes = (arr) => {
    return arr.reduce((acc, item) => {
      if (item.like) acc.unshift(item);
      else acc = [...acc, item];
      return acc;
    }, []);
  };

  if (!categoriesIsLoading && categories) {
    const arrCategories = Object.values(categories);

    const categoriesIncrement =
      categories && arrCategories.filter((el) => el.status === 'increment');

    const categoriesDecrement =
      categories && arrCategories.filter((el) => el.status === 'decrement');

    const count =
      statusOperation === 'increment'
        ? categoriesIncrement.length
        : categoriesDecrement.length;

    const countsCrop = paginate(
      statusOperation === 'increment'
        ? filterForLikes(categoriesIncrement)
        : filterForLikes(categoriesDecrement),
      currentPage,
      pageSize
    );

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
          <CategoriesForm/>
        </ContainerShow>

        <StatusAll classes={'mt-3'} />

        <ContainerScale classes={'flex-grow-1 mt-5'}>
          <ContainerCards colsNumber={'5'} gap={'4'}>
            {categoriesIcons ? (
              countsCrop?.map((category) => (
                <CategoryCard
                  categoriesIcons={categoriesIcons}
                  category={category}
                  key={category._id}
                />
              ))
            ) : (
              <LoadingSpinners number={3} />
            )}
          </ContainerCards>
        </ContainerScale>
        <ContainerScale classes={'mt-auto footer-group d-flex mb-4'}>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <Button
            bgColor="primary"
            classes="shadow-lg ms-auto mt-2 me-3"
            dataType="add"
            onClick={(e)=>essenceHandleToEdit(e, {['iconsForCategories']:categoriesIcons})}
            imgSrc={addIcon}
            iconSize={'52px'}
          />
        </ContainerScale>
      </Container>
    );
  }

  return (
    <LoadingSpinners
      style={{ width: '56px', height: '56px' }}
      classesSpinner=""
      number={6}
    />
  );
};

export default CategoriesPage;
