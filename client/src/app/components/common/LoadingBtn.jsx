import React from "react";
import PropTypes from "prop-types";

const LoadingBtn = ({ label }) => {
  return (
    <>
      <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
      <span role="status">{label}</span>
    </>
  );
};

LoadingBtn.propTypes = {
  label: PropTypes.string,
};

export default LoadingBtn;
