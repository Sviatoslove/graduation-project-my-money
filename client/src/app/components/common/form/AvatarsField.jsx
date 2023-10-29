import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const AvatarsField = ({ label, name, currentElement, options, onChange }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(null);
  const prevRef = useRef(active);
  const [showClassesIncBt, setShowClassesIncBt] = useState("");
  const [showClassesDecBt, setShowClassesDecBt] = useState("-fill");

  useEffect(() => {
    prevRef.current = active;
    toggleActive();
  });

  const prevActive = prevRef.current;

  const handleClick = ({ target }) => {
    setActive(target.closest('button'));
    onChange({
      target: {
        name: target.closest('button').name,
        value: target.closest('button').dataset.type,
      },
    });
  };

  const toggleActive = () => {
    if (prevActive !== active) {
      prevActive?.classList.remove("active");
    }
    active?.classList.add("active");
  };

  const drawingAvatars = (n) => {
    if(typeof options[n][n] === 'object') {
      return options[n].map((item) => {
        return (
          <Button
            name={name}
            outline={item.color ? false : true}
            color={item.color}
            id={item._id}
            icon={item.name}
            dataType={item.color ? item.color : item.name}
            key={item._id}
            onClick={handleClick}
            classes="avatar border-0 m-1 br-5"
            iconFontSize="52px"
          />
        );
      });
    }
    return options[n].map((item) => {
      return (
        <Button
          name={name}
          outline={true}
          imgFontSize={'52px'}
          id={name}
          dataType={item}
          imgSrc={item}
          key={item}
          onClick={handleClick}
          classes="avatar border-0 bg-transparent br-10"
          zIndex={0}
        />
      );
    });
  };

  const handleIncrement = () => {
    if (!index) setShowClassesDecBt("");
    if (index === options.length-2) setShowClassesIncBt("-fill");
    if (index < options.length-1) setIndex((prevState) => ++prevState);
  };

  const handleDecrement = () => {
    if (index === options.length-1) setShowClassesIncBt("");
    if (index === 1) setShowClassesDecBt("-fill");
    if (index > 0) setIndex((prevState) => --prevState);
  };

  return (
    <div className="mb-1">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mt-2 justify-content-center">{drawingAvatars(index)}</div>
      {options.length > 1 && (
        <div className="text-center mt-2">
          <button
            className="lh-1 p-0 btn btn-outline-secondary w-50"
            type="button"
            onClick={handleDecrement}
            disabled={showClassesDecBt}
          >
            <i className={"fs-3 bi bi-skip-backward" + showClassesDecBt}></i>
          </button>
          <button
            className="lh-1 p-0 btn btn-outline-secondary w-50"
            type="button"
            onClick={handleIncrement}
            disabled={showClassesIncBt}
          >
            <i className={"fs-3 bi bi-skip-forward" + showClassesIncBt}></i>
          </button>
        </div>
      )}
    </div>
  );
};

AvatarsField.defaultProps = {
  type: "image",
};

AvatarsField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  currentElement: PropTypes.string,
};

export default AvatarsField;
