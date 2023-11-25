import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, classes, newClasses }) => {
  return (
    <div
      className={
        !newClasses
          ? "w-98 mh-i d-flex mx-auto mt-4 flex-column " +
            classes
          : newClasses
      }
    >
      {children}
    </div>
  );
};

Container.defaultProps={
  classes: 'bg-paper'
}

Container.propTypes = {
  newClasses: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Container;
