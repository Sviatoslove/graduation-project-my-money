import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      outline={true}
      classes={'w-content shadow-custom position-absolute top-105px start-25px'}
      bgColor={"warning"}
      imgSrc={"https://img.icons8.com/arcade/32/circled-left-2.png"}
      onClick={() => navigate(-1)}
      zIndex={2}
    />
  );
};

export default BackBtn;
