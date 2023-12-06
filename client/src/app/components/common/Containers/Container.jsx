import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, classes, newClasses }) => {
  return (
    <div
      className={
        !newClasses
          ? "container w-98 d-flex mx-auto mt-3 flex-column " +
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
