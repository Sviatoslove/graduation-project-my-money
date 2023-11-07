import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BackBtn = ({ classes, zIndex }) => {
  const navigate = useNavigate();
  return (
    <Button
      outline={true}
      classes={classes}
      bgColor={"warning"}
      imgSrc={"https://img.icons8.com/arcade/32/circled-left-2.png"}
      onClick={() => navigate(-1)}
      zIndex={zIndex}
    />
  );
};

BackBtn.propTypes = {
  classes: PropTypes.string,
  zIndex: PropTypes.number,
};

export default BackBtn;
