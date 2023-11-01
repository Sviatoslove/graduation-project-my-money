import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/common/Containers/Container';
import MasterCount from '../components/common/MasterCount';
import StatusAll from '../components/common/StatusAll';
import { selectUser } from '../store/usersSlice';
import Button from '../components/common/Button';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import { ContainerScale, ContainerShow } from '../components/common/Containers';
import {
  loadOperations,
  selectOperations,
  selectOperationsDataLoaded,
} from '../store/operationsSlice';
import OperationsForm from './operationsPage/OperationsForm';
import { useForms } from '../hooks/useForm';

const MainPage = () => {
  const dispatch = useDispatch();
  const { disAppearanceForm, statusOperation, handleClick } = useForms();

  
  const user = useSelector(selectUser());

  const operationsDataLoaded = useSelector(selectOperationsDataLoaded());
  const opertions = useSelector(selectOperations());
  const filteredOperations =
    opertions &&
    Object.values(opertions).filter((operation) => operation.status === statusOperation);

  useEffect(() => {
    if (!operationsDataLoaded) dispatch(loadOperations());
  }, []);

  const handleToEdit = () => {

  };

  return (
    <Container>
      <MasterCount />
      <StatusAll />

      <ContainerScale classes="wrapper-operation flex-grow-1"></ContainerScale>
      <ContainerShow type={'add'}>
        <OperationsForm/>
      </ContainerShow>
      <Button
        color="primary"
        classes="shadow-lg p-2 w-content ms-auto"
        dataType="add"
        onClick={handleClick}
        imgSrc={addIcon}
      />
    </Container>
  );
};

export default MainPage;
