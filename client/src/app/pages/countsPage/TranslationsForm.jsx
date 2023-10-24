import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { SelectedField, TextField } from '../../components/common/form';
import Button from '../../components/common/Button';
import { selectCounts } from '../../store/countsSlice';

const TranslationsForm = ({closeForm}) => {
  const counts = useSelector(selectCounts())
  const classForm = useRef()
  const countsData =[]
  console.log('counts:', counts)
  const [data, setData] = useState({
    fromCount: '',
    toCount: '',
    content: '',
    date: '',
    totalBalance: 'true',
  });

  const handleSubmit = (e)=>{
    e.preventDefault()
    closeForm()
  }
  
  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  return (
    <div
      ref={classForm}
      className='container rounded-3 shadow-lg p-5 counts-add-page'
    >
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Создайте перевод</h3>
        <SelectedField
        type='translations'
          name="fromCount"
          label="Название счёта с которого хотите перевести"
          options={counts}
          value={data.fromCount}
          valueTwo={data.toCount}
          onChange={handleChange}
          // error={errors.fromCount}
        />
        <SelectedField
        type='translations'
          name="toCount"
          label="Название счёта на который хотите перевести"
          options={counts}
          value={data.toCount}
          valueTwo={data.fromCount}
          onChange={handleChange}
          // error={errors.toCount}
        />
        <TextField
          label="Комментарий"
          value={data.content}
          name="content"
          onChange={handleChange}
          // error={errors.content}
        />
        <TextField
        type='date'
          label="Дата"
          value={data.date}
          name="date"
          onChange={handleChange}
          // error={errors.date}
        />


        {/* {enterError && <p className="text-danger">{enterError}</p>} */}
        <Button
          dataType='create'
          type="submit"
          classes="w-100 mx-auto"
          // disabled={isValid || enterError}
        >
       Создать
        </Button>
        <Button
          classes="w-100 mx-auto mt-2"
          color="warning"
          onClick={closeForm}
        >
          Назад
        </Button>
      </form>
    </div>
  );
};

TranslationsForm.propTypes={
  closeForm:PropTypes.func
}

export default TranslationsForm;
