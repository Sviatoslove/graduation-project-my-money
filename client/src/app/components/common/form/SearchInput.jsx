import React, { useRef, useState } from 'react';
import { Button } from '../buttons';
import { useTables } from '../../../hooks/useTable';

const SearchInput = ({ ...rest }) => {
  const [show, setShow] = useState('hide');
  const {setSearchQuery} = useTables()

  const clearInput = (el) => {
    setTimeout(() => {
      el.value = '';
      el.placeholder = '';
      setSearchQuery('')
    }, 400);
  };

  const handleClick = (e) => {
    const input = e.target.closest('button').previousElementSibling;
    setShow((state) => (state === 'show' ? 'hide' : 'show'));
    show === 'show'
      ? clearInput(input)
      : (input.placeholder = 'Поиск...');
  };
  return (
    <div className="input-group input-group-lg w-300px mb-1 align-items-center position-relative">
      <input
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
