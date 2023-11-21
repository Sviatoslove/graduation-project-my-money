import React from 'react';
import ChartBar from '../components/ui/analytics/ChartBar';
import { Container } from '../components/common/Containers';
import { TextField } from '../components/common/form';

const ChartsPage = () => {
  return (
    <Container classes="shadow-custom br-10 p-3">
      <ChartBar />
    </Container>
  );
};

export default ChartsPage;
