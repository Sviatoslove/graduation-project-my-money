import React, { useEffect, useState } from 'react';
import Container from '../../components/common/Containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTranslations,
  selectTranslations,
  selectTranslationsDataLoaded,
  selectTranslationsLoadedStatus,
} from '../../store/translationsSlice';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import { displayDate, paginate } from '../../utils';
import {
  loadCounts,
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
  selectCountsStatus,
} from '../../store/countsSlice';
import Badge from '../../components/common/Badge';
import currency from '../../mock/currency';
import { Button } from '../../components/common/buttons';
import Table from '../../components/common/table/Table';
import { useTables } from '../../hooks/useTable';
import Pagination from '../../components/common/pagination';
import { useSettings } from '../../hooks/useSettings';
import _ from 'lodash';
import EmptyList from '../../components/common/EmptyList';
import { useNavigate } from 'react-router-dom';

const HistoryTranslations = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    handlePageChange,
    sortBy,
    counts: countsObjects,
  } = useTables();
  const navigate=useNavigate()
  const { essenceHandleToEdit } = useSettings();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsLoaded = useSelector(selectCountsStatus());
  const countsData = useSelector(selectCountsData());
  const translationsDataLoaded = useSelector(selectTranslationsDataLoaded());
  const translations = useSelector(selectTranslations());
  const translationsIsLoading = useSelector(selectTranslationsLoadedStatus());
  const pageSize = 12;

  const counts = {
    0: {
      name: 'Пополнение',
      type: '652e4f70498ed451c3f23b9f',
      icon: 'https://img.icons8.com/clouds/100/cash-in-hand.png',
    },
    ...countsObjects,
  };

  useEffect(() => {
    if (!translationsDataLoaded) dispatch(loadTranslations());
    if (!countsDataLoaded) dispatch(loadCountsData());
    if (!countsLoaded) dispatch(loadCounts());
  }, []);

  useEffect(()=> {
    if(translations && !translations) {
      navigate('/counts')
    }

    console.log('translations:', translations)
  },[translations])

  if (translationsDataLoaded && countsData) {
    const count = Object?.values(translations)?.length;

    const columns = {
      number: {
        name: 'Номер',
        component: (translation, idx) => (
          <img
            src={`https://img.icons8.com/arcade/56/${idx + 1}.png`}
            alt={idx + 1}
          />
        ),
      },
      date: {
        path: 'date',
        name: 'Дата',
        component: (translation) => displayDate(translation.createdAt),
      },
      countFrom: {
        name: 'Перевод с...',
        component: (translation) => {
          const countFrom = counts[translation?.fromCount];
          return countFrom ? (
            <Badge
              classes={'fs-6 h-i'}
              text={countFrom?.name}
              imgSrc={countFrom?.icon}
              {...countsData[countFrom?.type]}
              iconSize="36px"
            />
          ) : (
            'счёт не найден/был удалён'
          );
        },
      },
      arrow: {
        name: '',
        component: () => (
          <img
            src="https://img.icons8.com/arcade/32/arrow.png"
            alt="img"
            style={{ height: '32px' }}
          />
        ),
      },
      countTo: {
        name: 'Перевод на...',
        component: (translation) => {
          const countTo = counts[translation?.toCount];
          return countTo ? (
            <Badge
              classes={'fs-6 h-i'}
              text={countTo?.name}
              imgSrc={countTo?.icon}
              {...countsData[countTo?.type]}
              iconSize="36px"
            />
          ) : (
            'счёт не найден/был удалён'
          );
        },
      },
      balanceFrom: {
        name: 'Баланс с...',
        component: (translation) => {
          const countFrom = counts[translation?.fromCount];
          const countTo = counts[translation?.toCount];
          return countFrom && countTo ? (
            <Badge
              classes={'fs-6 h-i'}
              balance={translation.balanceFrom}
              imgSrc={
                translation.fromCount === '0'
                  ? currency[countTo?.currency]?.icon
                  : currency[countFrom?.currency]?.icon
              }
              iconSize={'36px'}
              {...countsData[countFrom?.type]}
            />
          ) : (
            'счёт не найден/был удалён'
          );
        },
      },
      arrowNext: {
        name: '',
        component: () => (
          <img
            src="https://img.icons8.com/arcade/32/arrow.png"
            alt="img"
            style={{ height: '32px' }}
          />
        ),
      },
      balanceTo: {
        name: 'Баланс на...',
        component: (translation) => {
          const countTo = counts[translation.toCount];
          return countTo ? (
            <Badge
              classes={'fs-6 h-i'}
              balance={translation.balanceTo}
              imgSrc={currency[countTo?.currency]?.icon}
              iconSize={'36px'}
              {...countsData[countTo?.type]}
            />
          ) : (
            'счёт не найден/был удалён'
          );
        },
      },
      delete: {
        name: '',
        component: (translation) => (
          <Button
            outline={true}
            dataType={'remove'}
            bgColor="secondary"
            iconSize={'36px'}
            imgSrc="https://img.icons8.com/arcade/36/delete-sign.png"
            onClick={(e) => essenceHandleToEdit(e, translation)}
            id={translation._id}
          />
        ),
      },
    };

    const sortedTranslations = _.orderBy(
      Object.values(translations),
      ['createdAt'],
      [sortBy.order]
    );

    const translationsCrop = paginate(
      sortedTranslations,
      currentPage,
      pageSize
    );

    if (translationsIsLoading)
      return (
        <LoadingSpinners number={3} style={{ width: '56px', height: '56px' }} />
      );

    return (
      <Container classes="br-10 shadow-custom p-3">
        <Container newClasses={'mt-10 w-98 mx-auto'}>
          <Table columns={columns} data={translationsCrop} c />
        </Container>
        <Container newClasses={'mx-auto mt-auto mb-3'}>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Container>
      </Container>
    );
  } else
    return (
      <Container classes="br-10 shadow-custom p-3">
        <EmptyList
          title="свой первый перевод"
          dataType="translationsAdd"
          onClick={essenceHandleToEdit}
        />
      </Container>
    );
};

export default HistoryTranslations;
