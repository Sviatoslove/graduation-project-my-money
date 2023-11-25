import React from "react";
import PropTypes from "prop-types";

const ContainerApp = ({ children, classes }) => {
  return <div className={classes}>{children}</div>;
};

ContainerApp.defaultProps = {
  classes:
    "mw-1230 w-100 mx-auto mt-2 mh-90vh position-relative shadow-appShadow br-3",
};

ContainerApp.propTypes = {
  classContainer: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerApp;
