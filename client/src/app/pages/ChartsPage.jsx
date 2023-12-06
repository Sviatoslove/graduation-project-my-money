import React from 'react';
import ChartBar from '../components/ui/analytics/ChartBar';
import { Container } from '../components/common/Containers';
import { useTables } from '../hooks/useTable';
import EmptyList from '../components/common/EmptyList';
import { useSettings } from '../hooks/useSettings';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import { Button } from '../components/common/buttons';

const ChartsPage = () => {
  const { operations } = useTables();
  const { essenceHandleToEdit } = useSettings();

  return (
    <>
      {operations ? (
        <Container classes="shadow-custom mh-88vh br-10 p-3 bg-paper">
          <ChartBar />
          <Button
            bgColor="primary"
            classes="shadow-lg p-2 ms-auto"
            imgSrc={addIcon}
            dataType="operations"
            onClick={essenceHandleToEdit}
          />
        </Container>
      ) : (
        <EmptyList
          title="свою первую операцию"
          imgSrc="https://img.icons8.com/clouds/200/pass-money.png"
          dataType="operations"
          onClick={essenceHandleToEdit}
        />
      )}
    </>
  );
};

export default ChartsPage;
