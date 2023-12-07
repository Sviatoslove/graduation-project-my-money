import React from 'react';
import PropTypes from 'prop-types';

const ProgressCell = ({ value, name, color }) => {
  return (
    <div
      className="progress progress-cell-percentage"
      role="progressbar"
      aria-label={name}
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ width: value + '%', height: '50px' }}
    >
      <div
        className={`progress-bar bg-${color} progress-bar-striped progress-bar-animated fs-6 overflow-visible position-relative`}
      >
        {!name ? (
          <strong>У вас ещё не было расходов/доходов в этом месяце</strong>
        ) : (
            <strong className={'w-content mx-auto' + (color === 'light' ? ' text-dark' : '')}>{value>=2 ? ((value.includes('.') ? value.split('.')[0] : value) + '%') : ''}</strong>
        )}
      </div>
    </div>
  );
};

ProgressCell.defaultProps = {
  value: '100',
  color: 'secondary',
  name: '',
};

ProgressCell.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string
};

export default ProgressCell;
