import React from "react";
import PropTypes from "prop-types";

const LoadingSpinners = ({
  number,
  text,
  classesDiv,
  classesSpinner,
  style,
}) => {
  function range(count) {
    return Array.from({ length: count }, (v, i) => i + 1);
  }

  function getRandomColorRgba() {
    const red = randomNum(0, 255);
    const green = randomNum(0, 255);
    const blue = randomNum(0, 255);
    const alpha = randomNum(5, 10) / 10;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  function randomNum(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  const spinners = range(number).reduce(
    (acc, item) =>
      (acc = {
        ...acc,
        [item]: {
          color: getRandomColorRgba(),
        },
      }),
    {},
  );
  return (
    <div className={`spinners-wrapper ${classesDiv}`}>
      {text && (
        <strong className="" style={{ ...style }} role="status">
          {text}
        </strong>
      )}
      {Object.values(spinners).map((spinner, idx) => (
        <div
          className={`spinner-grow ${classesSpinner}`}
          role="status"
          style={{ ...style, backgroundColor: spinner.color }}
          key={idx}
        ></div>
      ))}
    </div>
  );
};

LoadingSpinners.defaultProps = {
  style: {},
  classesDiv: "position-absolute top-50 start-50 translate-middle",
};

LoadingSpinners.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
  classesDiv: PropTypes.string,
  classesSpinner: PropTypes.string,
  style: PropTypes.object,
};

export default LoadingSpinners;
