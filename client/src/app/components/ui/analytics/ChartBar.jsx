import React from 'react';
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Container } from '../../common/Containers';
import { TextField } from '../../common/form';
import { useForms } from '../../../hooks/useForms';
import { getArray } from '../../../utils/formatData';
import { useTables } from '../../../hooks/useTable';
import _ from 'lodash';
import LoadingSpinners from '../../common/LoadingSpinners';
import { COLORS } from '../../../utils/constants';

const ChartBar = () => {
  const { filteredOperations, categories } = useTables();
  console.log('filteredOperations:', filteredOperations)
  const initialState = {
    month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  };
  const { register, data } = useForms({
    defaultState: initialState,
    errors: {},
  });

  const monthLength = (dataString) => {
    const [year, month] = dataString.split('-');
    return new Date(year, month, 0).getDate();
  };

  const filterDate = data.defaultState.month;
  const monthDaysArr = monthLength(filterDate);

  const operationsFilteredForMonth =
    filteredOperations &&
    Object.values(filteredOperations).filter(
      ({ date }) =>
        date.split('-').slice(0, 2).join('-') === data.defaultState.month
    );

  const categoriesFilteredMonth = _.uniqWith(
    operationsFilteredForMonth?.map(({ categoryId }) => categoryId),
    (first, second) => first === second
  );

  const operationsSliceForDays =
    operationsFilteredForMonth &&
    getArray(monthDaysArr).reduce((acc, numDay) => {
      let day,
        findDay,
        operationThisDay = [];
      operationsFilteredForMonth.forEach((operation, idx) => {
        day = String(numDay < 10 ? '0' + numDay : numDay);
        findDay = operation.date.split('T')[0].slice(-2);
        if (day === findDay) {
          operationThisDay.push(operation);
        }
      });
      if (operationThisDay.length) acc = { ...acc, [day]: operationThisDay };
      return acc;
    }, {});

  if (operationsSliceForDays && categories) {
    const categoriesThisDay = categoriesFilteredMonth.reduce(
      (acc, categoryId) => {
        let balance;
        const balanceCategory = Object.entries(operationsSliceForDays).reduce(
          (acc, [key, item]) => {
            balance = item.reduce((acc, operation) => {
              if (operation.categoryId === categoryId) {
                if (operation.status === 'decrement')
                  acc = (acc + operation.balance);
                else acc = -(acc+ operation.balance);
              }
              return acc;
            }, 0);
            if (balance) {
              acc = [
                ...acc,
                {
                  ['nameCategory']: categories[categoryId].name,
                  balance,
                  ['color']: categories[categoryId].bgColor,
                  numDay: key,
                },
              ];
            }
            return acc;
          },
          []
        );
        return (acc = [...acc, ...balanceCategory]);
      },
      []
    );

    console.log('categoriesThisDay:', categoriesThisDay);

    const dataChart = getArray(monthDaysArr).reduce((acc, num) => {
      const day = String(num < 10 ? '0' + num : num);
      const item = categoriesThisDay.reduce((acc, item, idx) => {
        let arr = [];
        if (item.numDay === day) {
          const cell = { [item.nameCategory]: item.balance };
          arr.push(cell);
        }
        let obj;
        if (arr.length) {
          obj = arr.reduce((acc, item) => (acc = { ...acc, ...item }), {});
        }
        return (acc = { ...acc, ...obj });
      }, {});
      return (acc = [
        ...acc,
        {
          date: day,
          ...item,
        },
      ]);
    }, []);


    return (
      <Container newClasses="mt-8 mx-auto">
        <TextField
          label="Фильтрация по месяцу"
          type={'month'}
          style={{ width: '300px' }}
          {...register('month')}
        />

        <BarChart
          width={1180}
          height={900}
          data={dataChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="date" height={30} stroke="#8884d8" />
          {categoriesThisDay.map((item, idx) => (
            <Bar
              width={'10px'}
              key={item.numDay + idx}
              dataKey={item.nameCategory}
              fill={COLORS[item.color]}
            />
          ))}
        </BarChart>
      </Container>
    );
  }
  return <LoadingSpinners number={3} />;
};

export default ChartBar;
