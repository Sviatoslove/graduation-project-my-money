import React, { useEffect, useState } from 'react';
import { selectUser } from '../store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../components/common/UserAvatar';
import displayDate from '../utils/displayDate';
import UserPageEdit from './UserPageEdit';
import {
  loadCounts,
  loadCountsData,
  selectCounts,
  selectCountsData,
  selectCountsDataStatus,
  selectCountsLoadingStatus,
  selectCountsStatus,
} from '../store/countsSlice';
import Badge from '../components/common/Badge';
import { Link } from 'react-router-dom';
import { useTables } from '../hooks/useTable';
import {
  selectCategoriesIconsDataloaded,
  loadСategoriesIcons,
} from '../store/categoriesSlice';
import { dataEditForUserPage } from '../utils/dataEditForUserPage';

const UserPage = () => {
  const dispatch = useDispatch();
  const { operations, categories } = useTables();
  const [show, setShow] = useState('');
  const user = useSelector(selectUser());
  const countsLoaded = useSelector(selectCountsStatus());
  const counts = useSelector(selectCounts());
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());
  const categoriesIconsDataLoaded = useSelector(
    selectCategoriesIconsDataloaded()
  );
  const isLoading = useSelector(selectCountsLoadingStatus())

  useEffect(() => {
    if (!countsLoaded) dispatch(loadCounts());
    if (!countsDataLoaded) dispatch(loadCountsData());
    if (!categoriesIconsDataLoaded) dispatch(loadСategoriesIcons());
  }, []);

  const handleToEdit = () => {
    show ? setShow('') : setShow('show');
  };

  return (
    <div
      className="mx-auto"
      style={{
        width: '95%',
      }}
    >
      <div
        className="card p-2 border-0 shadow-lg mx-auto"
        style={{
          marginTop: '25px',
          maxHeight: '450px',
          height: '450px',
          zIndex: 1,
        }}
      >
        <div className="card-body d-flex">
          <div
            className="card-avatar position-relative"
            style={{ width: 'fit-content' }}
          >
            <UserAvatar image={user.avatar} height="300" />
            <h4 className="text-center mt-5">{user.name}</h4>
          </div>
          {!isLoading && countsDataLoaded ? (
            <div className="flex-grow-1 ff-roboto">
              <ul className="list-group list-group-flush list-group-userPage fs-5">
                <li className="list-group-item w-100 justify-content-center d-flex fs-4">
                  Вы зарегистрировались {displayDate(user.createdAt)}
                </li>
                <Link
                  className="list-group-item w-100 d-flex align-items-center justify-content-center"
                  to={'/counts'}
                >
                  <div className="me-auto w-content ws-nw">
                    <div className="mb-4">Счета:</div>
                    <div className="">
                      Всего:{' '}
                      {counts
                        ? Object.values(counts).length
                        : 'Пока ничего нет'}
                    </div>
                  </div>
                  <div className="d-flex flex-wrap ms-2 justify-content-center">
                    {counts ? (
                      dataEditForUserPage(counts, 8)?.map((array, idx) => {
                        if (idx < 2) {
                          return (
                            <div className="d-flex" key={idx}>
                              {array.map((count) => (
                                <Badge
                                  key={count._id}
                                  imgSrc={count.icon}
                                  iconSize={'41px'}
                                  color={countsData[count.type].color}
                                  imgClasses={'m-0'}
                                  classes={'br-50 text-center me-2 mb-1'}
                                />
                              ))}
                            </div>
                          );
                        }
                      })
                    ) : (
                      <p>Счета отсутствуют, создайте их</p>
                    )}
                  </div>
                </Link>
                <Link
                  className="list-group-item w-100 d-flex align-items-center"
                  to={categories ? '/categories' : '/counts'}
                >
                  <div className="me-auto w-content ws-nw">
                    <div className="mb-4">Категории:</div>
                    <div className="">
                      Всего:{' '}
                      {categories
                        ? Object.values(categories).length
                        : 'Пока ничего нет'}
                    </div>
                  </div>
                  <div className="d-flex flex-wrap ms-2 justify-content-center">
                    {categories ? (
                      dataEditForUserPage(categories, 8)?.map((array, idx) => {
                        if (idx < 2) {
                          return (
                            <div className="d-flex" key={idx + 2}>
                              {array.map((category) => (
                                <Badge
                                  key={category._id}
                                  icon={category.icon}
                                  iconSize="fs-1 "
                                  color={category.bgColor}
                                  iconColor={category.iconColor}
                                  classes="br-50 text-center me-2 mb-1"
                                />
                              ))}
                            </div>
                          );
                        }
                      })
                    ) : (
                      <p>Категории отсутствуют, создайте их</p>
                    )}
                  </div>
                </Link>
                <Link
                  className="list-group-item w-100 d-flex justify-content-center"
                  to="/"
                >
                  Всего операций:
                  {operations
                    ? Object.values(operations).length
                    : 'Пока ничего нет'}
                </Link>
                <li className="list-group-item w-100 d-flex justify-content-center">
                  Email: {user.email}
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex-grow-1 mt-1">
              <ul className="list-group list-group-flush placeholder-glow">
                <li className="list-group-item mb-1 h-50px w-96 placeholder bg-placeholders br-10"></li>
                <li className="list-group-item mb-1 h-120px w-100 placeholder bg-placeholders br-10"></li>
                <li className="list-group-item mb-1 h-120px w-100 placeholder bg-placeholders br-10"></li>
                <li className="list-group-item mb-1 h-50px w-100 placeholder bg-placeholders br-10"></li>
                <li className="list-group-item mb-1 h-50px w-100 placeholder bg-placeholders br-10"></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={'mx-auto rounded-3 border-0 user-edit ' + show}>
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={handleToEdit}
          style={{ zIndex: 1 }}
        >
          <i
            className={show ? 'bi bi-x-circle' : 'bi bi-gear'}
            style={{ fontSize: '32px' }}
          ></i>
        </button>
        {/* {add && } */}
        <UserPageEdit user={user} onShow={setShow} />
      </div>
    </div>
  );
};

export default UserPage;
