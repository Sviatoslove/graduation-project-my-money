import { getUniquenessEssence } from '../utils/analyticsHelp';
import { useTables } from './useTable';

const useAnalytics = () => {
  const { categories, filteredOperations } = useTables();

  const getTotalBalance = (array) =>
    array.reduce((acc, item) => (acc = acc + item.balance), 0);

  const filteredEssence = (arr, essence, id) =>
    arr.filter((item) => item[essence] === id);

  const categoriesIds = filteredOperations?.map(
    (operation) => operation.categoryId
  );
  const currentCategoriesIds = getUniquenessEssence(categoriesIds);

  const filteredCategories =
    categories &&
    currentCategoriesIds?.reduce(
      (acc, id) =>
        (acc = [
          ...acc,
          {
            ...categories[id],
            value: getProgressBarValue(filteredOperations, 'categoryId', id),
            balance: getTotalBalance(
              filteredEssence(filteredOperations, 'categoryId', id)
            ),
          },
        ]),
      []
    );

  function getProgressBarValue(arr, essence, id) {
    if (arr.length) {
      const totalValue = getTotalBalance(arr);
      const filterEssence = filteredEssence(arr, essence, id);
      const rateValue = getTotalBalance(filterEssence);
      return ((rateValue * 100) / totalValue).toFixed(2);
    }
  }

  return { currentCategoriesIds, filteredCategories };
};

export default useAnalytics;
