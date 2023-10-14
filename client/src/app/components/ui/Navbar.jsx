import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../store/user';
import NavProfile from './NavProfile';
import LOGO from '../../img/money.png';
import Menu from './Menu';

// navbar-expand-lg

const Navbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState('hiding');

  const isLoggedIn = useSelector(selectIsLoggedIn());

  const handleShowMenu = (e) => {
    e.preventDefault();
    show === 'hiding' ? setShow('show') : setShow('hiding');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={(e) => handleShowMenu(e)}
          >
            <img src={LOGO} style={{ height: '45px' }} />
            <span className="navbar-toggler-icon"></span>
          </button>
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <a className="navbar-brand text-light" href="#">
              My money application
            </a>
          )}
          <div
            className={'offcanvas offcanvas-start ' + show + ' text-bg-dark'}
            tabIndex="0"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <Menu isLoggedIn={isLoggedIn} onShow={handleShowMenu}/>
          </div>
          {show === 'show' && (
            <div
              onClick={(e) => handleShowMenu(e)}
              className="offcanvas-backdrop fade show"
            ></div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
