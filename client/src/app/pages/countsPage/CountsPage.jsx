import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import likesIcon from '../../../assets/icons/heart-fill.svg'
import {
  countRemove,
  countUpdate,
  countsLoad,
  selectCounts,
  selectCountsStatus,
} from '../../store/countsSlice';
import { paginate } from '../../utils';
import Pagination from '../../components/common/pagination';
import getCountLike from '../../utils/getCountLike';
import Translations from './Translations';
import CountCard from './CountCard';
import Button from '../../components/common/Button';
import FormForCount from './FormForCount';

const CountsPage = () => {
  const dispatch = useDispatch();
  const { likesPage } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [typeForm, setTypeForm] = useState('');
  const [currentCount, setCurrentCount] = useState('');

  const [down, setDown] = useState(false);
  const [scale, setScale] = useState(false);
  const [countAdd, setCountAdd] = useState(false);
  const [likes, setLikes] = useState();
  const [likesButton, setLikesButton] = useState();

  const counts = useSelector(selectCounts());

  const countsDataLoaded = useSelector(selectCountsStatus());
  const pageSize = 8;

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

  const appearanceCountsForm = () => {
    setScale(true);
    setCountAdd(true);
    setDown(false);
  };

  const disAppearanceCountsForm = () => {
    setScale(false);
    setDown(true);
    setTimeout(() => setCountAdd(false), 500);
  };

  const handleToEdit = ({ target }) => {
    const btnType = target.closest('button').dataset.type;
    const countId = target.closest('button').id;
    const currentCount = counts[countId]
    switch (btnType) {
      case 'add':
        setCurrentCount('')
        setTypeForm(btnType);
        appearanceCountsForm();
        break;
      case 'edit':
        setCurrentCount(currentCount)
        setTypeForm(btnType);
        appearanceCountsForm();
        break;
      case 'like':
        const editedCount = { ...currentCount, like: !currentCount.like };
        dispatch(countUpdate(editedCount));
        break;
      case 'remove':
        dispatch(countRemove({ countId }));
        break;
        case 'translations':
          setTypeForm(btnType);
          appearanceCountsForm();

        break;
    }
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
    const transform = scale ? 'scale(0)' : '';

    return (
      <div className="counts-page mx-auto mt-4 d-flex flex-column">
        {countAdd && (
          <div className={'wrapper-counts-form ' + (down ? 'down' : '')}>
            <FormForCount
              type={typeForm}
              currentCount={currentCount}
              closeForm={disAppearanceCountsForm}
            />
          </div>
        )}
        {!count && (
          <h1 className="position-absolute top-50 start-50 translate-middle">
            Добавьте свой первый счёт
          </h1>
        )}

        <div
          className="counts-list flex-grow-1"
          style={{ transform: transform }}
        >
          {count ? <Translations onChange={handleToEdit} /> : null}

          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
            {countsCrop.map((count) => (
              <CountCard
                count={count}
                onChange={handleToEdit}
                key={count._id}
              />
            ))}
          </div>
        </div>
        {!scale &&
        <div
          className={
            'mt-auto footer-group d-flex mb-4' + ((count > pageSize) ? ' justify-content-between ' : ' justify-content-end ') + (!count || (countsLikes && countsLikes.length < pageSize)
              ? 'position-absolute bottom-0 end-0 translate-middle'
              : '')
          }
        >
          <Pagination
            countsLikes={countsLikes}
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div
            className="btn-group me-5 mt-2"
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
              color="primary"
              classes="shadow-lg p-2"
              dataType="add"
              onClick={handleToEdit}
              imgSrc={addIcon}
            />
          </div>
        </div>}
      </div>
    );
  }
  return 'Loading...';
};

export default CountsPage;
