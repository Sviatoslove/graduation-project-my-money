import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, classes, newClasses }) => {
  return (
    <div
      className={
        !newClasses
          ? "container position-relative w-98 mh-86vh d-flex mx-auto mt-4 d-flex flex-column " +
            classes
          : newClasses
      }
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  newClasses: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Container;
