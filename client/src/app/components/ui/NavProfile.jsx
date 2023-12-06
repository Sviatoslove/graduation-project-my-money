import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser, selectDataStatus, selectIsLoggedIn, selectUser } from '../../store/usersSlice';
import UserAvatar from '../common/UserAvatar';

const NavProfile = ({ classes }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const dataStatus = useSelector(selectDataStatus());
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(selectUser());

  useEffect(() => {
    if (!dataStatus && isLoggedIn) dispatch(loadUser());
  }, []);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!isLoggedIn) return <div className="ms-3 text-danger">Вы не авторизованы!</div>;
  if (!dataStatus) return 'Loading...';
  return (
    <div className={'dropdown ' + classes} onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center text-light ">
        <div className="me-2">{currentUser.name}</div>
        <UserAvatar image={currentUser.avatar} height="45" />
        <img src="" alt="" className="img-responsive rounded-circle" />
      </div>
      <div
        className={
          'shadow-lg border-none rounded-3 bg-secondary w-100 dropdown-menu p-0' +
          (isOpen ? ' show' : '')
        }
      >
        <Link
          to={`/user/${currentUser._id}`}
          className="dropdown-item rounded-3"
        >
          <i
            className="bi bi-person-square"
            style={{ marginRight: '10px' }}
          ></i>
          Профиль
        </Link>
        <Link to={`/logout`} className="dropdown-item rounded-3">
          <i
            className="bi bi-door-open-fill"
            style={{ marginRight: '10px' }}
          ></i>
          Выйти
        </Link>
      </div>
    </div>
  );
};

NavProfile.propTypes={
  classes: PropTypes.string
}

export default NavProfile;
