import React, { useRef, useState } from 'react';
import { Button } from '../buttons';
import { useTables } from '../../../hooks/useTable';

const SearchInput = ({ ...rest }) => {
  const [show, setShow] = useState('hide');
  const { setSearchQuery } = useTables();

  const clearInput = (el) => {
    setTimeout(() => {
      el.value = '';
      el.placeholder = '';
      setSearchQuery('');
    }, 400);
  };

  const handleClick = (e) => {
    const input = e.target.closest('button').previousElementSibling;
    setShow((state) => (state === 'show' ? 'hide' : 'show'));
    if (show === 'show') {
      clearInput(input);
    } else {
      input.focus();
      input.placeholder = 'Поиск...';
    }
  };
  return (
    <div className="input-group input-group-lg w-300px mb-4 align-items-center position-relative">
      <label className={
          'search-label-custom position-absolute start-50 bottom-100 translate-middle w-maxc ' +
          show
        } htmlFor="searchQuery"><strong>Введите дату / текст примечания</strong></label>
      <input
        id="searchQuery"
        type="text"
        className={
          'form-control search-input-custom border-0 position-absolute end-0 br-50 ' +
          show
        }
        {...rest}
      ></input>
      <Button
        classes={'br-50 ms-auto'}
        outline={true}
        iconSize={'36px'}
        imgSrc={'https://img.icons8.com/doodle/48/evidence.png'}
        onClick={handleClick}
        zIndex={5}
      />
    </div>
  );
};

export default SearchInput;
