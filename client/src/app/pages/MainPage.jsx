import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/common/Containers/Container';
import MasterCount from '../components/common/MasterCount';
import StatusAll from '../components/common/StatusAll';
import { selectIsLoggedIn, selectUser } from '../store/usersSlice';
import Button from '../components/common/buttons/Button';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import { ContainerScale, ContainerShow } from '../components/common/Containers';
import {
  loadOperations,
  selectOperations,
  selectOperationsDataLoaded,
} from '../store/operationsSlice';
import OperationsForm from './operationsPage/OperationsForm';
import { useForms } from '../hooks/useForm';
import {
  countsLoad,
  loadCountsData,
  selectCounts,
  selectCountsData,
  selectCountsStatus,
} from '../store/countsSlice';
import Table from '../components/common/table/Table';
import OperationsTable from '../components/ui/OperationsTable';
import { useTables } from '../hooks/useTable';
import localStorageService from '../services/localStorage.service';
import Pagination from '../components/common/pagination';

const MainPage = () => {
  const dispatch = useDispatch();
  const { essenceHandleToEdit } = useForms();
  const { operations, count, pageSize, currentPage, handlePageChange } =
    useTables();

  const user = useSelector(selectUser());

  const categoriesData = localStorageService.getCategoriesData();

  return (
    <Container>
      {user && user?.masterCount && (
        <>
          <MasterCount classes={'d-flex flex-column w-100 fs-4'} />
          <StatusAll />
        </>
      )}
      <ContainerScale classes="wrapper-operation flex-grow-1">
        {operations ? <OperationsTable /> : null}
      </ContainerScale>
      <ContainerShow type={'add'}>
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
            (!user?.masterCount && '/counts') ||
            (!categoriesData && '/categories')
          }
          bgColor="primary"
          classes="shadow-lg p-2 w-content ms-auto"
          dataType="add"
          onClick={essenceHandleToEdit}
          imgSrc={addIcon}
        />
      </ContainerScale>
    </Container>
  );
};

export default MainPage;
