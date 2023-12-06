import React, { useEffect, useState } from 'react';

const HTML = document.querySelector('html')

const RadioSwitch = () => {
  const [bgColor, setBgColor] = useState('light');

  const handleChange = () => {
    setBgColor((state) => (state === 'light' ? 'dark' : 'light'));
  };

  useEffect(()=>{
    HTML.setAttribute('data-bs-theme', bgColor)
  },[bgColor])

  return (
    <div className="form-check form-switch fs-4">
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        <i className={'bi bi-' + (bgColor === 'light' ? 'lightbulb' : 'lightbulb-fill')} />
      </label>
      <input
        className={'form-check-input bg-' + bgColor}
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        onChange={handleChange}
      />
    </div>
  );
};

export default RadioSwitch;
