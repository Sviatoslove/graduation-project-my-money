import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from '../components/common/Containers/Container';
import MasterCount from '../components/common/MasterCount';
import StatusAll from '../components/common/StatusAll';
import { selectUser } from '../store/usersSlice';
import Button from '../components/common/buttons/Button';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import { ContainerScale, ContainerShow } from '../components/common/Containers';
import OperationsForm from './operationsPage/OperationsForm';
import { useSettings } from '../hooks/useSettings';
import OperationsTable from '../components/ui/OperationsTable';
import { useTables } from '../hooks/useTable';
import Pagination from '../components/common/pagination';
import { SelectedField } from '../components/common/form';
import _ from 'lodash';
import SearchInput from '../components/common/form/SearchInput';
import ProgressBar from '../components/ui/analytics/ProgressBar';
import localStorageService from '../services/localStorage.service';
import ChartRound from '../components/ui/analytics/ChartRound';

const MainPage = () => {
  const { essenceHandleToEdit } = useSettings();

  const {
    dataCategory,
    operations,
    count,
    pageSize,
    currentPage,
    handlePageChange,
    handleChange,
    categoriesDataLoaded,
    filteredCategories,
    searchQuery,
    handleSearchChange,
  } = useTables();

  const user = useSelector(selectUser());

  return (
    <Container newClasses={'w-98 h-90vh d-flex mx-auto mt-4 flex-column '}>
      <Container newClasses="position-relative">
        <ProgressBar />
        <ChartRound/>
        {user && user?.masterCount && (
          <>
            <Container newClasses="position-absolute bottom-0 start-5">
              <SelectedField
                name="category"
                type="categories"
                label="Фильтр по категориям"
                value={dataCategory.category}
                options={_.uniqWith(
                  filteredCategories,
                  (first, second) => first._id === second._id
                )}
                onChange={handleChange}
                defaultOption={
                  !filteredCategories.length
                    ? 'Нет категорий'
                    : 'Не фильтровать'
                }
                disabled={!filteredCategories.length ? true : false}
              />
            </Container>
            <Container newClasses="position-absolute bottom-7 end-0">
              <SearchInput onChange={handleSearchChange} value={searchQuery} />
            </Container>
            <MasterCount
              classes={'d-flex flex-column fs-4 w-content mx-auto'}
            />
            <StatusAll />
          </>
        )}
      </Container>
      <ContainerScale classes="wrapper-operation flex-grow-1">
        {operations ? <OperationsTable /> : null}
      </ContainerScale>

      <ContainerShow type={'add'} classes={'position-relative'}>
        <OperationsForm />
      </ContainerShow>
      <ContainerScale classes={`mt-auto footer-group d-flex mb-4`}>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Button
          link={
            (!localStorageService.getMasterCount() && '/counts') ||
            (!categoriesDataLoaded && '/categories')
          }
          bgColor="primary"
          classes="shadow-lg p-2 w-content ms-auto me-3"
          dataType="add"
          onClick={essenceHandleToEdit}
          imgSrc={addIcon}
        />
      </ContainerScale>
    </Container>
  );
};

export default MainPage;
