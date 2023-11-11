import React from 'react';
import { useTables } from '../../hooks/useTable';
import ProgressCell from '../common/ProgressCell';
import _ from 'lodash';

const ProgressBar = () => {
  const { categories, operationCrop } = useTables();
  console.log('categories:', categories)
  const categoriesIds = operationCrop.map(operation=> operation.categoryId)
  const currentCategoriesIds = _.uniqWith(
    categoriesIds,
    (first, second) => first === second
    )
  function getProgressBarValue(arr, essence, id) {
    if (arr.length) {
      const getTotalBalance = (array) =>
        array.reduce((acc, item) => (acc = acc + item.balance), 0);

      const totalValue = getTotalBalance(arr);
      const filteredEssence = arr.filter((item) => item[essence] === id);
      const rateValue = getTotalBalance(filteredEssence);
      return ((rateValue * 100) / totalValue).toFixed()
    }
  }

  return (
    <div className="progress-stacked mb-3" style={{ height: '50px' }}>
      {categories ? (
        currentCategoriesIds.map((id) => (
          <ProgressCell
            key={id}
            value={getProgressBarValue(
              operationCrop,
              'categoryId',
              id
            )}
            name={categories[id].name}
            color={categories[id].bgColor}
            icon={categories[id].icon}
            iconColor={categories[id].iconColor}
          />
        ))
      ) : (
        <ProgressCell />
      )}
    </div>
  );
};

export default ProgressBar;
