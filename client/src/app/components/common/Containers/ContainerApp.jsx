import React from "react";
import PropTypes from "prop-types";

const ContainerApp = ({ children, classes }) => {
  return <div className={classes}>{children}</div>;
};

ContainerApp.defaultProps = {
  classes:
    "container mx-auto mt-2 mh-98vh position-relative shadow-appShadow br-3 px-0 pt-0 pb-3 bg-app d-flex flex-column",
};

ContainerApp.propTypes = {
  classContainer: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerApp;
