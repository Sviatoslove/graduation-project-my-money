import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '../Containers';

const HTML = document.querySelector('html');

const RadioSwitch = ({ classes }) => {
  const [bgColor, setBgColor] = useState('light');

  const handleChange = () => {
    setBgColor((state) => (state === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    HTML.setAttribute('data-bs-theme', bgColor);
  }, [bgColor]);

  return (
    <Container newClasses="d-flex align-items-center">
      <i
        className={
          'fs-3 me-1 bi bi-' + (bgColor === 'light' ? 'lightbulb' : 'lightbulb-fill')
        }
      />
      <div className={'form-check form-switch fs-4 m-0 ' + classes}>
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked" />
        <input
          className={'form-check-input bg-' + bgColor}
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          onChange={handleChange}
        />
      </div>
    </Container>
  );
};

RadioSwitch.propTypes = {
  classes: PropTypes.string,
};

export default RadioSwitch;
