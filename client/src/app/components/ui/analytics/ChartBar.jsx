import React, { useEffect, useState } from 'react';
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
import LoadingSpinners from '../../common/LoadingSpinners';
import { COLORS } from '../../../utils/constants';
import {
  getDaysOfWeek,
  getMonthOfWeek,
  getNameMonth,
  getUniquenessEssence,
} from '../../../utils/analyticsHelp';
import { useSelector } from 'react-redux';
import { selectOperationsLoading } from '../../../store/operationsSlice';
import localStorageService from '../../../services/localStorage.service';
import { useResize } from '../../../hooks/useResize';

const ChartBar = () => {
  const { operations, categories } = useTables();
  const { width, isScreenSm, isScreenMd, isScreenLg, isScreenXl, isScreenXxl } =
    useResize();
  const getWidthBarChart = () => {
    if (!isScreenSm) return 450;
    if (!isScreenMd) return 500;
    if (!isScreenLg) return 670;
    if (!isScreenXl) return 870;
    if (!isScreenXxl) return 1000;
    return 1200;
  };

  getWidthBarChart();
  const initialState = {
    month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    week: '',
    year: '2023',
  };
  const [filteredQuery, setFilteredQuery] = useState({});
  const [placeholderMonth, setPlaceholderMonth] = useState('');
  const [placeholderWeek, setPlaceholderWeek] = useState('Выберите неделю');
  const operationsIsLoading = useSelector(selectOperationsLoading());

  const { register, data } = useForms({
    defaultState: initialState,
    errors: {},
  });

  useEffect(() => {
    const { week, year, month } = data.defaultState;
    const yearOfWeek = week.split('-')[0];
    const monthOfWeek = week && getMonthOfWeek(week);
    setPlaceholderWeek(getDaysOfWeek(week));
    if (!week) {
      setFilteredQuery({
        ...initialState,
        month: initialState.month.split('-')[1],
      });
      return;
    }
    setFilteredQuery({
      month: monthOfWeek !== month ? monthOfWeek : month,
      week,
      year: yearOfWeek !== year ? yearOfWeek : year,
    });
    if (monthOfWeek !== month) setPlaceholderMonth(getNameMonth(monthOfWeek));
    if (yearOfWeek !== year) data.defaultState.year = yearOfWeek;
  }, [data.defaultState.week]);

  useEffect(() => {
    let month;
    const { month: monthDef, year } = data.defaultState;
    if (data.defaultState.month.includes('-')) month = monthDef.split('-')[1];
    else month = monthDef;
    setFilteredQuery((state) => ({
      ...state,
      month,
      year: monthDef
        ? monthDef.split('-')[0] !== year
          ? monthDef.split('-')[0]
          : year
        : year,
    }));
    setPlaceholderMonth(getNameMonth(month));
  }, [data.defaultState.month]);

  useEffect(() => {
    setFilteredQuery((state) => ({
      ...state,
      year: data.defaultState.year,
    }));
  }, [data.defaultState.year]);

  const getMonthLength = (dataString) => {
    const [year, month] = dataString.split('-');
    return new Date(year, month, 0).getDate();
  };

  const filterDate =
    !filteredQuery.week && !filteredQuery.month
      ? filteredQuery.year
      : filteredQuery.year + '-' + filteredQuery.month;
  const monthLengthArr =
    !filteredQuery.week && !filteredQuery.month
      ? getArray(12)
      : filteredQuery.week
      ? getArray(
          7,
          getDaysOfWeek(filteredQuery.week).split(' ')[1],
          getMonthLength(filterDate)
        )
      : getArray(getMonthLength(filterDate));

  const operationsFilteredForMonth =
    operations &&
    Object.values(operations)
      .filter(({ countId }) => countId === localStorageService.getMasterCount())
      .filter(({ date }) => {
        const yyyyMM = date.split('-').slice(0, 2).join('-');
        const yyyy = date.split('-')[0];
        if (filteredQuery.week) {
          const flteredDateWith = getDaysOfWeek(filteredQuery.week).split(
            ' '
          )[1];
          const flteredDateBefore = getDaysOfWeek(filteredQuery.week).split(
            ' '
          )[3];
          const dateOperation = date.split('T')[0];
          const dayOperation = dateOperation.split('-')[2];
          if (
            dayOperation <= flteredDateBefore &&
            dayOperation >= flteredDateWith
          )
            return yyyyMM === filterDate;
        } else if (!filteredQuery.week && !filteredQuery.month) {
          return yyyy === filterDate;
        }
        return yyyyMM === filterDate;
      });

  const categoriesIdsFilteredMonth = getUniquenessEssence(
    operationsFilteredForMonth?.map(({ categoryId }) => categoryId)
  );

  const operationsSliceForDays =
    operationsFilteredForMonth &&
    monthLengthArr.reduce((acc, numDay) => {
      let day,
        findDay,
        operationThisDay = [];
      operationsFilteredForMonth.forEach((operation, idx) => {
        day = String(numDay < 10 ? '0' + numDay : numDay);
        if (monthLengthArr.length === 12)
          findDay = operation.date.split('T')[0].split('-')[1];
        else findDay = operation.date.split('T')[0].slice(-2);
        if (day === findDay) {
          operationThisDay.push(operation);
        }
      });
      if (operationThisDay.length) acc = { ...acc, [day]: operationThisDay };
      return acc;
    }, {});

  const categoriesThisDay =
    categories &&
    categoriesIdsFilteredMonth.reduce((acc, categoryId) => {
      let balance;
      const balanceCategory = Object.entries(operationsSliceForDays).reduce(
        (acc, [key, item]) => {
          balance = item.reduce((acc, operation) => {
            if (operation.categoryId === categoryId) {
              if (operation.status === 'increment') acc += operation.balance;
              else acc -= operation.balance;
            }
            return acc;
          }, 0);
          if (balance) {
            acc = [
              ...acc,
              {
                ['nameCategory']: categories[categoryId].name,
                ['color']: categories[categoryId].bgColor,
                numDay: key,
                balance,
              },
            ];
          }
          return acc;
        },
        []
      );
      return (acc = [...acc, ...balanceCategory]);
    }, []);

  const dataChart =
    categories &&
    monthLengthArr.reduce((acc, num) => {
      const day = String(num < 10 ? '0' + num : num);
      const item = categoriesThisDay.reduce((acc, item, idx) => {
        let dayDataChartArr = [];
        if (item.numDay === day) {
          const cell = { [item.nameCategory]: item.balance };
          dayDataChartArr.push(cell);
        }
        let dayDataChartObj;
        if (dayDataChartArr.length) {
          dayDataChartObj = dayDataChartArr.reduce(
            (acc, item) => (acc = { ...acc, ...item }),
            {}
          );
        }
        return (acc = { ...acc, ...dayDataChartObj });
      }, {});
      return (acc = [
        ...acc,
        {
          date: day,
          ...item,
        },
      ]);
    }, []);

  const uniquenessCategories = getUniquenessEssence(
    categoriesThisDay,
    'nameCategory'
  );

  if (operationsIsLoading) return <LoadingSpinners number={3} />;

  return (
    <>
      <Container newClasses="chartBarContainer mt-8 mx-auto">
        <>
          <div className="d-flex justify-content-evenly chartBarForm">
            <TextField
              label="Фильтрация по неделе"
              type={'week'}
              style={{ width: isScreenXl ? '300px' : width - 900 + 0.8 + 'px' }}
              {...register('week')}
              placeholder={placeholderWeek}
              classes={'chartBar'}
            />

            <TextField
              label="Фильтрация по месяцу"
              type={'month'}
              style={{ width: isScreenXl ? '300px' : width - 900 + 0.8 + 'px' }}
              {...register('month')}
              placeholder={placeholderMonth}
              classes={'chartBar'}
            />

            <TextField
              label="Фильтрация по году"
              type={'number'}
              style={{ width: isScreenXl ? '300px' : width - 900 + 0.8 + 'px' }}
              {...register('year')}
            />
          </div>
          <BarChart
            width={getWidthBarChart()}
            height={600}
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
            <Brush dataKey="date" height={30} stroke="#5554d8" />
            {uniquenessCategories.map((item, idx) => (
              <Bar
                width={'10px'}
                key={item.numDay + idx}
                dataKey={item.nameCategory}
                fill={COLORS[item.color]}
                radius={[10, 10, 0, 0]}
                isAnimationActive={true}
                background
              />
            ))}
          </BarChart>
        </>
      </Container>
    </>
  );
};

export default ChartBar;
