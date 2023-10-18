import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const Menu = ({ onShow, menu }) => {
  return (
    <>
      <div className="offcanvas-header" key={'menu'}>
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
          Меню
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={(e) => onShow(e)}
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul
          className="navbar-nav justify-content-end flex-grow-1 pe-3"
          onClick={(e) => onShow(e)}
        >
          {menu.map((item, idx) => {
            if (item.display)
              return <MenuItem {...item} key={idx} />;
          })}
          {menu[2].display && (
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
        </ul>
      </div>
    </>
  );
};

Menu.propTypes = {
  isLoggedIn: PropTypes.bool,
  onShow: PropTypes.func,
};

export default Menu;
