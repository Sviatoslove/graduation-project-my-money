import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import likesIcon from '../../../assets/icons/heart-fill.svg';
import {
  loadCounts,
  selectCounts,
  selectCountsLoadingStatus,
  selectCountsStatus,
  selectErrorCounts,
  selectSuccessNetworkCounts,
} from '../../store/countsSlice';
import {
  Container,
  ContainerCards,
  ContainerScale,
  ContainerShow,
} from '../../components/common/Containers';
import { paginate } from '../../utils';
import Pagination from '../../components/common/pagination';
import getCountLike from '../../utils/getCountLike';
import Translations from '../translationsPage/Translations';
import CountCard from './CountCard';
import Button from '../../components/common/buttons/Button';
import FormForCount from './FormForCount';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import { useSettings } from '../../hooks/useSettings';

const CountsPage = () => {
  const dispatch = useDispatch();
  const { likesPage } = useParams();
  const {
    essenceHandleToEdit,
    currentPage,
    setCurrentPage,
    handlePageChange,
    setError,
    setSettingsToast,
    setSuccessToast,
  } = useSettings();

  const [likes, setLikes] = useState();
  const [likesButton, setLikesButton] = useState();

  const counts = useSelector(selectCounts());

  const countsDataLoaded = useSelector(selectCountsStatus());
  const countsIsLoading = useSelector(selectCountsLoadingStatus());
  const errorCounts = useSelector(selectErrorCounts());
  const successNetworkCounts = useSelector(selectSuccessNetworkCounts());

  const pageSize = 6;

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCounts());
  }, []);

  useEffect(() => {
    const count = getCountLike(counts);
    if (!count && counts !== null) {
      setLikes(false);
      setTimeout(() => setLikesButton(false), 500);
    } else if (count) {
      setLikes(count);
      setLikesButton(count);
    }
  }, [counts]);

  useEffect(() => {
    if (errorCounts) {
      setError(errorCounts);
      setSettingsToast({
        typeForm: 'counts',
      });
    }
    if (successNetworkCounts && successNetworkCounts?.type === 'remove') {
      setSuccessToast(successNetworkCounts.content);
      setSettingsToast({
        iconSize: '56px',
        typeForm: 'counts',
      });
    }
  }, [errorCounts, successNetworkCounts]);

  const handleClick = () => {
    setCurrentPage(1);
  };

  const changePageForEmptyList = () => {
    setCurrentPage((state) => state - 1);
  };

  const arrCounts = counts ? Object.values(counts) : [];
  const count = arrCounts?.length;
    let countsLikes;
    if (likesPage) countsLikes = arrCounts?.filter((count) => count.like);

    const countsCrop = paginate(
      likesPage ? countsLikes : arrCounts,
      currentPage,
      pageSize
    );

    useEffect(() => {
      if (count && countsCrop && !countsCrop?.length) changePageForEmptyList();
    }, [count]);

    if (!countsIsLoading) {
    return (
      <Container classes="shadow-custom br-10 p-3">
        <ContainerShow type={'add'}>
          <FormForCount />
        </ContainerShow>
        {!count && (
          <ContainerScale classes={'my-auto mx-auto'}>
            <h1 className="">Добавьте свой первый счёт</h1>
          </ContainerScale>
        )}

        <ContainerScale classes="brrrr">
          {count ? (
            <Translations onChange={essenceHandleToEdit} counts={counts} />
          ) : null}

          <ContainerCards colsNumber={'3'} gap={'4'}>
            {countsCrop.map((count, idx) => (
              <CountCard
                count={count}
                onChange={essenceHandleToEdit}
                key={count._id + idx}
              />
            ))}
          </ContainerCards>
        </ContainerScale>

        <ContainerScale classes={`mt-auto footer-group d-flex mb-4`}>
          <Pagination
            likesPage={likesPage}
            countsLikes={countsLikes}
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div
            className="btn-group mt-2 w-content ms-auto me-3"
            role="group"
            aria-label="Button group"
          >
            {(likesPage ? true : likesButton) && (
              <Button
                classes={
                  'btn btn-primary shadow-lg p-2 like ' +
                  ((likesPage ? true : likes) ? 'appearance' : '')
                }
                link={likesPage ? '/counts' : '/counts/likesPage'}
                onClick={handleClick}
                imgSrc={
                  likesPage
                    ? 'https://img.icons8.com/cute-clipart/54/circled-chevron-left.png'
                    : likesIcon
                }
              />
            )}
            <Button
              bgColor="primary"
              classes="shadow-lg p-2"
              dataType="add"
              onClick={essenceHandleToEdit}
              imgSrc={addIcon}
            />
          </div>
        </ContainerScale>
      </Container>
    );
  }
  return (
    <LoadingSpinners
      style={{ width: '56px', height: '56px' }}
      classesSpinner=""
      number={6}
    />
  );
};

export default CountsPage;
