import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import NavProfile from "./NavProfile";

const Menu = ({ onShow, menu }) => {
  return (
    <>
      <div className="offcanvas-header" key={"menu"}>
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
          Меню
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={onShow}
        ></button>
      </div>
        <NavProfile classes='menu-profile'/>
      <div className="offcanvas-body">
        <ul
          className="navbar-nav justify-content-end flex-grow-1 pe-3"
          onClick={onShow}
        >
          {menu.map((item, idx) => {
            if (item.display) return <MenuItem {...item} key={idx} />;
          })}
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
