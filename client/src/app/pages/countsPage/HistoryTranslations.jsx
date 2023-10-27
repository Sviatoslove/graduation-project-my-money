import React, { useEffect, useState } from 'react';
import Container from '../../components/common/Containers/Container';
import MasterCount from '../../components/common/MasterCount';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTranslations,
  selectTranslations,
  selectTranslationsDataLoaded,
  selectTranslationsLoadedStatus,
} from '../../store/translationsSlice';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import { displayDate } from '../../utils';
import {
  countsLoad,
  loadCountsData,
  selectCounts,
  selectCountsData,
  selectCountsDataStatus,
  selectCountsStatus,
} from '../../store/countsSlice';
import Badge from '../../components/common/Badge';
import localStorageService from '../../services/localStorage.service';
import currency from '../../mock/currency';
import Button from '../../components/common/Button';

const HistoryTranslations = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());
  const isLoading = useSelector(selectTranslationsLoadedStatus());
  const translationsDataLoaded = useSelector(selectTranslationsDataLoaded());
  const translations = useSelector(selectTranslations());
  const countsLoaded = useSelector(selectCountsStatus());

  const counts = {
    0: {
      name: 'Пополнение',
      type: '652e4f70498ed451c3f23b9f',
    },
    ...useSelector(selectCounts()),
  };
  // console.log('translations:', translations);

  useEffect(() => {
    if (!translationsDataLoaded) dispatch(loadTranslations());
    if (!countsDataLoaded) dispatch(loadCountsData());
    if (!countsLoaded) dispatch(countsLoad());
  }, []);

  const handleClick = () => {
    console.log('handleClick:');
  };

  return (
    <Container>
      <MasterCount />
      {!isLoading && counts && countsData ? (
        <>
          <div className="d-flex "></div>

          <ul className="d-flex list-group list-group-flush ">
            {Object.values(translations).map((transl, idx) => {
              const countFrom = counts[transl.fromCount];
              const countTo = counts[transl.toCount];
              return (
                <li
                  className="list-group-item w-100 d-flex justify-content-between align-items-center"
                  key={idx}
                >
                  <div className="oper-data d-flex w-100 flex-fill justify-content-evenly align-items-center">
                    <p className="ff-BS fs-5">{idx + 1}</p>
                    <p className="ff-BS">Осуществлён:</p>
                    <p className="ff-BS">{displayDate(transl.createdAt)}</p>
                  </div>

                  <div className="oper-counts d-flex w-100 flex-fill justify-content-between px-1 align-items-center">
                    <Badge
                      classes={'fs-5'}
                      text={countFrom?.name}
                      {...countsData[countFrom?.type]}
                    />

                    <img
                      src="https://img.icons8.com/arcade/32/arrow.png"
                      alt="img"
                      style={{height:'32px'}}
                    />
                    <Badge
                      classes={'fs-5'}
                      text={countTo?.name}
                      {...countsData[countTo?.type]}
                    />
                  </div>

                  <div className="oper-balance w-100 d-flex flex-fill justify-content-between px-1 align-items-center">
                    <Badge
                      classes={'fs-6'}
                      balance={transl.balanceFrom}
                      imgSrc={
                        transl.fromCount === '0'
                          ? currency[countTo?.currency]?.icon
                          : currency[countFrom?.currency]?.icon
                      }
                      iconSize={'32px'}
                      {...countsData[countFrom?.type]}
                    />
                    <img
                      src="https://img.icons8.com/arcade/32/arrow.png"
                      alt="img"
                      style={{height:'32px'}}
                    />

                    <Badge
                      classes={'fs-6'}
                      balance={transl.balanceTo}
                      imgSrc={currency[countTo?.currency]?.icon}
                      iconSize={'32px'}
                      {...countsData[countTo?.type]}
                    />
                  </div>

                  <Button
                    outline={true}
                    color="secondary"
                    imgSrc="https://img.icons8.com/arcade/32/delete-sign.png"
                    onClick={handleClick}
                  />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <LoadingSpinners />
      )}
    </Container>
  );
};

export default HistoryTranslations;
