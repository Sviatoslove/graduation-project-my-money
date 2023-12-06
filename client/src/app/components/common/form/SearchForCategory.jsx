import React from 'react';
import SelectedField from './SelectedField';
import { useTables } from '../../../hooks/useTable';
import { getUniquenessEssence } from '../../../utils/analyticsHelp';

const SearchForCategory = () => {
  const { dataCategory, handleChange, filteredCategories } = useTables();
  return (
    <SelectedField
      name="category"
      type="categories"
      label="Фильтр по категориям"
      value={dataCategory.category}
      options={getUniquenessEssence(filteredCategories, '_id')}
      onChange={handleChange}
      defaultOption={
        !filteredCategories.length ? 'Нет категорий' : 'Не фильтровать'
      }
      disabled={!filteredCategories.length ? true : false}
      selectClasses='shadow-custom text-center'
    />
  );
};

export default SearchForCategory;
