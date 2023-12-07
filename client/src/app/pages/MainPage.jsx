import React from 'react';
import { useSelector } from 'react-redux';

import Container from '../components/common/Containers/Container';
import MasterCount from '../components/common/MasterCount';
import StatusAll from '../components/common/StatusAll';
import { selectUser } from '../store/usersSlice';
import Button from '../components/common/buttons/Button';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import { ContainerScale } from '../components/common/Containers';
import { useSettings } from '../hooks/useSettings';
import OperationsTable from '../components/ui/OperationsTable';
import { useTables } from '../hooks/useTable';
import Pagination from '../components/common/pagination';
import SearchInput from '../components/common/form/SearchInput';
import ProgressBar from '../components/ui/analytics/ProgressBar';
import EmptyList from '../components/common/EmptyList';
import SearchForCategory from '../components/common/form/SearchForCategory';
import ChangeLengthList from '../components/common/form/ChangeLengthList';
import LoadingSpinners from '../components/common/LoadingSpinners';

const MainPage = () => {
  const { essenceHandleToEdit, statusOperation } = useSettings();

  const {
    operations,
    count,
    pageSize,
    currentPage,
    handlePageChange,
    searchQuery,
    handleSearchChange,
    counts,
    categories,
    setSearchQuery,
    setCategoryData,
    dataCategory,
    operationsIsLoading,
    operationCrop,
  } = useTables();

  const user = useSelector(selectUser());

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryData({
      category: '',
    });
  };

  if (operationsIsLoading)
    return (
      <LoadingSpinners number={3} style={{ width: '56px', height: '56px' }} />
    );

  return (
    <>
      {user && counts && categories && operations ? (
        <>
          <Container classes="position-relative">
            <Container newClasses="position-relative">
              <>
                <ProgressBar />
                <Container newClasses="position-absolute bottom-15 start-3">
                  <ChangeLengthList />
                  <SearchForCategory />
                </Container>
                <Container newClasses="d-flex flex-column position-absolute bottom-17 end-3">
                  <SearchInput
                    onChange={handleSearchChange}
                    value={searchQuery}
                  />
                  <Container newClasses="w-content d-flex ms-auto" zIndex={0}>
                    <Button
                      classesEl="me-3 border-0 clearFilter"
                      outline={true}
                      onClick={handleClearFilters}
                      disabled={!searchQuery && !dataCategory.category}
                    >
                      Сбросить фильтры
                    </Button>
                    {!!operationCrop.length && (
                      <Button
                        bgColor="primary"
                        classes="shadow-lg p-2"
                        dataType="operations"
                        onClick={essenceHandleToEdit}
                        imgSrc={addIcon}
                        iconSize="26px"
                      />
                    )}
                  </Container>
                </Container>
                <MasterCount
                  classes={'d-flex flex-column fs-4 w-content mx-auto'}
                />
                <StatusAll />
              </>
            </Container>
            {operationCrop.length ? (
              <ContainerScale classes="wrapper-operation flex-grow-1 mh-85vh">
                {operations ? <OperationsTable /> : null}
              </ContainerScale>
            ) : (
              <EmptyList
                title={
                  'свою первую операцию' +
                  (statusOperation === 'increment'
                    ? ' для доходов'
                    : ' для расходов')
                }
                imgSrc="https://img.icons8.com/clouds/200/pass-money.png"
                onClick={essenceHandleToEdit}
                dataType="operations"
                classes="mh-56vh"
              />
            )}
          </Container>
          {!!operationCrop.length && (
            <ContainerScale classes='mt-auto footer-group d-flex'>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <Button
                bgColor="primary"
                classes="shadow-lg p-2 w-content ms-auto me-3"
                dataType="operations"
                onClick={essenceHandleToEdit}
                imgSrc={addIcon}
              />
            </ContainerScale>
          )}
        </>
      ) : (
        <>
          <EmptyList
            title="свою первую операцию"
            imgSrc="https://img.icons8.com/clouds/200/pass-money.png"
            onClick={essenceHandleToEdit}
            dataType="operations"
          />
        </>
      )}
    </>
  );
};

export default MainPage;
