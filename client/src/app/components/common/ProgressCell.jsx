import React from 'react';
import PropTypes from 'prop-types';

const ProgressCell = ({ value, name, color, icon, iconColor, iconSize }) => {
  return (
    <div
      className="progress"
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
          <div className={'d-flex align-items-center w-content mx-auto progress-cell-percentage-wrap'}>
            <i
              className={`${icon} text-${iconColor} position-absolute top-50 start-50 translate-middle`}
              style={{ fontSize: iconSize, zIndex: 5 }}
            />
            <div className="progress-cell-wall"></div>
            <strong className="progress-cell-percentage position-absolute top-50 start-50 translate-middle">{value + '%'}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

ProgressCell.defaultProps = {
  value: '100',
  color: 'secondary',
  name: '',
  iconSize: '28px',
};

ProgressCell.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
};

export default ProgressCell;
