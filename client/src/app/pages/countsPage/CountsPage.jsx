import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import likesIcon from '../../../assets/icons/heart-fill.svg';
import {
  countRemove,
  countUpdate,
  countsLoad,
  selectCounts,
  selectCountsStatus,
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
import { useForms } from '../../hooks/useForm';

const CountsPage = () => {
  const dispatch = useDispatch();
  const { likesPage } = useParams();
  const { countsHandleToEdit, disAppearanceForm } = useForms();
  const [currentPage, setCurrentPage] = useState(1);

  const [likes, setLikes] = useState();
  const [likesButton, setLikesButton] = useState();

  const counts = useSelector(selectCounts());

  const countsDataLoaded = useSelector(selectCountsStatus());
  const pageSize = 6;

  useEffect(() => {
    if (!countsDataLoaded) dispatch(countsLoad());
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

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (countsDataLoaded) {
    const count = Object.keys(counts).length;
    const arrCounts = Object.values(counts);
    let countsLikes;
    if (likesPage) countsLikes = arrCounts.filter((count) => count.like);

    const countsCrop = paginate(
      likesPage ? countsLikes : arrCounts,
      currentPage,
      pageSize
    );

    return (
      <Container classes="shadow-custom br-10 p-3">
        <ContainerShow type={'add'}>
          <FormForCount
            counts={counts}
            closeForm={disAppearanceForm}
          />
        </ContainerShow>
        {!count && (
          <ContainerScale classes={'my-auto mx-auto'}>
            <h1 className="">
              Добавьте свой первый счёт
            </h1>
          </ContainerScale>
        )}

        <ContainerScale>
          {count ? (
            <Translations onChange={countsHandleToEdit} counts={counts} />
          ) : null}

          <ContainerCards colsNumber={'3'} gap={'4'}>
            {countsCrop.map((count) => (
              <CountCard
                count={count}
                onChange={countsHandleToEdit}
                key={count._id}
              />
            ))}
          </ContainerCards>
        </ContainerScale>

        <ContainerScale
          classes={`mt-auto footer-group d-flex mb-4`}
        >
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
              onClick={countsHandleToEdit}
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
