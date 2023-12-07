import React, { useEffect } from 'react';
import Container from '../../components/common/Containers/Container';
import { useSelector } from 'react-redux';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import { selectCategoriesIsLoading } from '../../store/categoriesSlice';
import Button from '../../components/common/buttons/Button';
import { useSettings } from '../../hooks/useSettings';
import {
  ContainerCards,
  ContainerScale,
} from '../../components/common/Containers';
import CategoryCard from './CategoryCard';
import StatusAll from '../../components/common/StatusAll';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import Pagination from '../../components/common/pagination';
import { paginate } from '../../utils';
import EmptyList from '../../components/common/EmptyList';
import { useTables } from '../../hooks/useTable';

const CategoriesPage = () => {
  const {
    statusOperation,
    essenceHandleToEdit,
    currentPage,
    handlePageChange,
    setCurrentPage,
  } = useSettings();

  const { categoriesIcons, categories, categoriesDataLoaded } = useTables();

  const categoriesIsLoading = useSelector(selectCategoriesIsLoading());
  const pageSize = 20;

  const filterForLikes = (arr) => {
    return arr.reduce((acc, item) => {
      if (item.like) acc.unshift(item);
      else acc = [...acc, item];
      return acc;
    }, []);
  };

  const arrCategories = categories ? Object.values(categories) : [];

  const categoriesIncrement = arrCategories.filter(
    (el) => el.status === 'increment'
  );

  const categoriesDecrement = arrCategories.filter(
    (el) => el.status === 'decrement'
  );

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

  useEffect(() => {
    if (count && countsCrop && !countsCrop?.length)
      setCurrentPage((state) => state - 1);
  }, [count]);

  if (!categoriesIsLoading) {
    return (
      <Container classes="shadow-custom br-10 mh-88vh bg-paper">
        <StatusAll classes="mt-6" classesBtns="bg-transparent" />
        {categoriesDataLoaded && countsCrop.length ? (
          <>
            <ContainerScale classes="mt-5">
              <ContainerCards colsNumber="5" gap="2">
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
            <ContainerScale classes={'mt-auto footer-group d-flex mb-3'}>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <Button
                bgColor="primary"
                classes="shadow-lg ms-auto mt-2 me-3 p-2"
                dataType="categories"
                onClick={(e) =>
                  essenceHandleToEdit(e, {
                    ['iconsForCategories']: categoriesIcons,
                  })
                }
                imgSrc={addIcon}
              />
            </ContainerScale>
          </>
        ) : (
          <EmptyList
            title={
              'свою первую категорию ' +
              (statusOperation === 'increment' ? 'для доходов' : 'для расходов')
            }
            dataType="categories"
            classes="mh-75vh"
            imgSrc="https://img.icons8.com/bubbles/200/workflow.png"
            onClick={(e) =>
              essenceHandleToEdit(e, {
                ['iconsForCategories']: categoriesIcons,
              })
            }
          />
        )}
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
