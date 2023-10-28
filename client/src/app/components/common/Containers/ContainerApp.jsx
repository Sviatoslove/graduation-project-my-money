import React from "react";
import PropTypes from "prop-types";

const ContainerApp = ({ children, classes }) => {
  return <div className={classes}>{children}</div>;
};

ContainerApp.defaultProps = {
  classes:
    "mw-1200 w-100 m-20-auto mh-96vh position-relative shadow-appShadow br-3 pb-20",
};

ContainerApp.propTypes = {
  classContainer: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerApp;
