import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AvatarsField = ({ label, name, type, options }) => {
  const [index, setIndex] = useState(0);
  const [showClassesIncBt, setShowClassesIncBt] = useState('');
  const [showClassesDecBt, setShowClassesDecBt] = useState('-fill');

  const drawingAvatars = (n) => {
    return options[n].map((item) => {
      return <input
        type={type}
        id={name}
        name={name}
        src={item}
        key={item}
        className='avatar'
        style={{ height: '52px', width:'52px', flexGrow:1}}
      />
  });
  };

  const handleIncrement = () => {
    if (!index) setShowClassesDecBt('');
    if (index === 8) setShowClassesIncBt('-fill')
    if (index < 9) setIndex((prevState) => ++prevState);
  };

  const handleDecrement = () => {
    if (index === 9) setShowClassesIncBt('');
    if (index === 1) setShowClassesDecBt('-fill')
    if (index > 0) setIndex((prevState) => --prevState);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mt-2">
        {drawingAvatars(index)}
      </div>
      <div className='text-center mt-2'>
      <button
          className="lh-1 p-0 btn btn-outline-secondary w-50"
          type="button"
          onClick={handleDecrement}
          disabled={showClassesDecBt}
        >
          <i className={'fs-3 bi bi-skip-backward' + showClassesDecBt}></i>
        </button>
        <button
          className="lh-1 p-0 btn btn-outline-secondary w-50"
          type="button"
          onClick={handleIncrement}
          disabled={showClassesIncBt}
        >
          <i className={'fs-3 bi bi-skip-forward' + showClassesIncBt}></i>
        </button>
        </div>
    </div>
  );
};

AvatarsField.defaultProps = {
  type: 'image',
};

AvatarsField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
};

export default AvatarsField;
