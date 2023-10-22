import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import addIcon from '../../assets/icons/patch-plus-fill.svg';
import {
  countRemove,
  countUpdate,
  countsLoad,
  selectCounts,
  selectCountsStatus,
} from '../store/countsSlice';
import { paginate } from '../utils/paginate';
import Pagination from '../components/common/pagination';
import displayDate from '../utils/displayDate';
import CountsAddPage from './CountsAddPage';

const CountsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCount, setCurrentCount] = useState('');
  const [animation, setAnimation] = useState({
    down: false,
    scale: false,
    countAdd: false,
  });

  const counts = useSelector(selectCounts());

  const countsDataLoaded = useSelector(selectCountsStatus());
  const pageSize = 8;

  useEffect(() => {
    if (!countsDataLoaded) dispatch(countsLoad());
  });

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleToEdit = ({ target }) => {
    const btnType = target.closest('button').dataset.type;
    const countId = target.closest('button').id;
    const currentCount = counts.find((count) => count._id === countId);
    switch (btnType) {
      case 'edit':
        setAnimation({ down: false, scale: true });
        setCurrentCount(currentCount);
        setAnimation({ down: false, scale: true, countAdd: true });
        break;
      case 'like':
        const editedCount = { ...currentCount, like: !currentCount.like };
        dispatch(countUpdate(editedCount));
        break;
      case 'remove':
        dispatch(countRemove({countId}))
        break;
    }
  };

  const handleToAdd = (e) => {
    e.preventDefault();
    setAnimation({ down: true, scale: false, countAdd: true  });
    setTimeout(
      () => setAnimation({ down: true, scale: false, countAdd: false }),
      2000
    );
  };

  if (countsDataLoaded) {
    const count = counts.length;

    const countsCrop = paginate(counts, currentPage, pageSize);
    const transform = animation.scale ? 'scale(0.1)' : '';

    return (
      <div className="counts-page">
        {!counts.length ? (
          <h1 className="position-absolute top-50 start-50 translate-middle">
            Добавьте свой превый счёт
          </h1>
        ) : (
          <div>
            {animation.countAdd && (
              <div
                className={
                  'wrapper-counts-add-page ' + (animation.down ? 'down' : '')
                }
              >
                <CountsAddPage
                  currentCount={currentCount}
                  onChange={handleToAdd}
                  onChangeAnimation={setAnimation}
                  type="edit"
                />
              </div>
            )}

            <div
              className="row row-cols-1 row-cols-md-3 g-4 mt-2 justify-content-center counts-list"
              style={{ transform: transform }}
            >
              {countsCrop.map((count) => (
                <div className="col position-relative" key={count._id}>
                  <div className="card d-flex p-3 border-0 item-count">
                    <div className="text-center">
                      <img
                        src={count.icon}
                        className="card-img-top"
                        alt="icon"
                        style={{ width: '100px' }}
                      />
                      <h5 className="card-title">{count.name}</h5>
                      <hr />
                    </div>
                    <div className="card-body p-0 text-center">
                      <p className="card-text">Тип счёта: {count.type}</p>
                      <p className="card-text">Описание: {count.content}</p>
                      <p className="card-text">
                        Создан: {displayDate(count.createdAt)}
                      </p>
                      <p className="card-text">
                        Обновлён: {displayDate(count.updatedAt)}
                      </p>
                      <p className="card-text">
                        Баланс: {count.balance}{' '}
                        <img
                          src={count.currency}
                          alt="img"
                          style={{ width: '32px' }}
                        />
                      </p>
                    </div>
                    <div
                      className="btn-group btn-group-vertical position-absolute top-0 end-0"
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <button
                        data-type="edit"
                        className=" btn btn-light btn-sm btn-edit-count"
                        onClick={handleToEdit}
                        style={{ zIndex: 1 }}
                        id={count._id}
                      >
                        <i
                          className="bi bi-gear"
                          style={{ fontSize: '32px' }}
                        ></i>
                      </button>
                      <button
                        data-type="like"
                        className="btn btn-light btn-sm btn-edit-count"
                        onClick={handleToEdit}
                        style={{ zIndex: 1 }}
                        id={count._id}
                      >
                        <i
                          className={
                            'bi bi-heart' + (count.like ? '-fill' : '')
                          }
                          style={{ fontSize: '32px' }}
                        ></i>
                      </button>
                      <button
                        data-type="remove"
                        className="btn btn-light btn-sm btn-edit-count"
                        onClick={handleToEdit}
                        style={{ zIndex: 1 }}
                        id={count._id}
                      >
                        <i
                          className="bi bi-trash"
                          style={{ fontSize: '32px' }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          type="button"
          className="btn btn-primary position-absolute translate-middle shadow-lg p-2"
          style={{ right: '5%', bottom: '5%' }}
          to="/counts/add"
        >
          <img
            src={addIcon}
            alt="AddCount"
            className="text-success"
            aria-hidden="true"
          />
        </Link>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
  return 'Loading...';
};

export default CountsPage;
