import React from 'react';
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
import SearchInput from '../components/common/form/SearchInput';
import ProgressBar from '../components/ui/analytics/ProgressBar';
import { getUniquenessEssence } from '../utils/analyticsHelp';
import EmptyList from '../components/common/EmptyList';

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
    filteredCategories,
    searchQuery,
    handleSearchChange,
    counts,
    categories,
  } = useTables();

  const user = useSelector(selectUser());

  return (
    <>
      {user && counts ? (
        <Container classes="">
          <Container newClasses="position-relative">
            <>
              <ProgressBar />
              <Container newClasses="position-absolute bottom-0 start-5">
                <SelectedField
                  name="category"
                  type="categories"
                  label="Фильтр по категориям"
                  value={dataCategory.category}
                  options={getUniquenessEssence(filteredCategories, '_id')}
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
                <SearchInput
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
              </Container>
              <MasterCount
                classes={'d-flex flex-column fs-4 w-content mx-auto'}
              />
              <StatusAll />
            </>
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
              bgColor="primary"
              classes="shadow-lg p-2 w-content ms-auto me-3"
              dataType="add"
              onClick={essenceHandleToEdit}
              imgSrc={addIcon}
            />
          </ContainerScale>
        </Container>
      ) : (
        <EmptyList
          classes="p-3 w-98 mh-i d-flex mx-auto mt-4 flex-column"
          title="свою первую операцию"
          link={counts ? (categories ? '/' : '/categories') : '/counts'}
        />
      )}
    </>
  );
};

export default MainPage;
