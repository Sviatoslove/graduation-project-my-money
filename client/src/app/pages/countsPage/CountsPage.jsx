import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import likesIcon from '../../../assets/icons/heart-fill.svg';
import { selectCountsLoadingStatus } from '../../store/countsSlice';
import {
  Container,
  ContainerCards,
  ContainerScale,
} from '../../components/common/Containers';
import { paginate } from '../../utils';
import Pagination from '../../components/common/pagination';
import getCountLike from '../../utils/getCountLike';
import Translations from '../translationsPage/Translations';
import CountCard from './CountCard';
import Button from '../../components/common/buttons/Button';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import { useSettings } from '../../hooks/useSettings';
import { useTables } from '../../hooks/useTable';
import EmptyList from '../../components/common/EmptyList';

const CountsPage = () => {
  const { likesPage } = useParams();
  const { essenceHandleToEdit, currentPage, setCurrentPage, handlePageChange } =
    useSettings();

  const { counts } = useTables();

  const [likes, setLikes] = useState();
  const [likesButton, setLikesButton] = useState();

  const countsIsLoading = useSelector(selectCountsLoadingStatus());

  const pageSize = 3;

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

  if (countsIsLoading) {
    return (
      <LoadingSpinners
        style={{ width: '56px', height: '56px' }}
        classesSpinner=""
        number={6}
      />
    );
  }
  return (
    <>
      {count ? (
        <Container classes="shadow-custom br-10 p-3 bg-paper mh-87vh">
          <ContainerScale>
            <Translations onChange={essenceHandleToEdit} counts={counts} />
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

          <ContainerScale classes={`footer-group d-flex mt-auto`}>
            <Pagination
              likesPage={likesPage}
              countsLikes={countsLikes}
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />

            <div
              className="btn-group mt-2 w-content ms-auto"
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
                dataType='counts'
                onClick={essenceHandleToEdit}
                imgSrc={addIcon}
              />
            </div>
          </ContainerScale>
        </Container>
      ) : (
        <EmptyList
          title="свой первый счёт"
          dataType='counts'
          imgSrc='https://img.icons8.com/clouds/200/wallet.png'
          onClick={essenceHandleToEdit}
        />
      )}
    </>
  );
};

export default CountsPage;
