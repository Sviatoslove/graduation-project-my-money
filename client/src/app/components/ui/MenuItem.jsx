import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ name, path, icon }) => {
  return (
    <>
      <li className="nav-item">
        <NavLink to={path} className="nav-link">
          <i style={{ marginRight: "5px" }} className={icon}></i>
          {name}
        </NavLink>
      </li>
    </>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  icon: PropTypes.string,
};

export default MenuItem;
