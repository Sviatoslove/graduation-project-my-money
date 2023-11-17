import React, { useEffect, useState } from 'react';
import Container from '../../components/common/Containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTranslations,
  selectErrorTranslations,
  selectSuccessNetworkTranslations,
  selectTranslations,
  selectTranslationsDataLoaded,
  selectTranslationsLoadedStatus,
  translationRemove,
} from '../../store/translationsSlice';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import { displayDate, paginate } from '../../utils';
import {
  loadCounts,
  loadCountsData,
  selectCounts,
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
import { useForms } from '../../hooks/useForms';
import _ from 'lodash';

const HistoryTranslations = () => {
  const dispatch = useDispatch();
  const { currentPage, handlePageChange, sortBy } = useTables();
  const { setSettingsToast, setError, setSuccessToast } = useForms();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsLoaded = useSelector(selectCountsStatus());
  const countsData = useSelector(selectCountsData());
  const translationsDataLoaded = useSelector(selectTranslationsDataLoaded());
  const translations = useSelector(selectTranslations());
  const pageSize = 12;
  const errorTranslations = useSelector(selectErrorTranslations());
  const successNetworkTranslations = useSelector(
    selectSuccessNetworkTranslations()
  );

  const counts = {
    0: {
      name: 'Пополнение',
      type: '652e4f70498ed451c3f23b9f',
      icon: 'https://img.icons8.com/clouds/100/cash-in-hand.png',
    },
    ...useSelector(selectCounts()),
  };

  useEffect(() => {
    if (!translationsDataLoaded) dispatch(loadTranslations());
    if (!countsDataLoaded) dispatch(loadCountsData());
    if (!countsLoaded) dispatch(loadCounts());
  }, []);

  useEffect(() => {
    if (errorTranslations) {
      setError(errorTranslations);
      setSettingsToast({
        typeForm: 'translations',
      });
    }
    if (successNetworkTranslations) {
      setSuccessToast(successNetworkTranslations);
      setSettingsToast({
        iconSize: '56px',
        timeOut: true,
        typeForm: 'translations',
      });
    }
  }, [successNetworkTranslations, errorTranslations]);

  const handleRemove = (e) => {
    const { target } = e;
    const translId = target.closest('button').id;
    dispatch(translationRemove(translId));
  };

  if (translationsDataLoaded && countsData) {
    const count = Object?.values(translations)?.length;

    const columns = {
      number: {
        name: 'Номер',
        component: (translation, idx) => idx + 1,
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
          return translation.fromCount ? (
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
          return translation.toCount ? (
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
          return translation.fromCount ? (
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
          return translation.toCount ? (
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
            bgColor="secondary"
            iconSize={'36px'}
            imgSrc="https://img.icons8.com/arcade/32/delete-sign.png"
            onClick={handleRemove}
            id={translation._id}
          />
        ),
      },
    };

    const sortedTranslations = _.orderBy(
      Object.values(translations),
      [sortBy.path],
      [sortBy.order]
    );

    const translationsCrop = paginate(
      sortedTranslations,
      currentPage,
      pageSize
    );

    return (
      <Container classes="br-10 shadow-custom">
        <Container newClasses={'mt-8'}>
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
  }
  return (
    <LoadingSpinners number={3} style={{ width: '56px', height: '56px' }} />
  );
};

export default HistoryTranslations;
