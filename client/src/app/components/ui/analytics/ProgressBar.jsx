import React from 'react';
import ProgressCell from '../../common/ProgressCell';
import useAnalytics from '../../../hooks/useAnalytics';

const ProgressBar = () => {
  const { filteredCategories } = useAnalytics();
  return (
    <div className={'progress-stacked mb-3'} style={{ height: '50px' }}>
      {filteredCategories && filteredCategories.length !== 0 ? (
        filteredCategories.map(({ name, bgColor: color, icon, iconColor, _id:key, value }) => {
          const props = { name, color, icon, iconColor, key, value }
          return (
            <ProgressCell
              {...props}
            />
          );
        })
      ) : (
        <ProgressCell />
      )}
    </div>
  );
};

export default ProgressBar;
