import React, { useState } from 'react';
import TextField from '../components/common/form/TextField';
import SelectedField from '../components/common/form/SelectedField';

const CountsAddPage = () => {

  const [data, setData] = useState({
    name: '',
    count: '',
  })
  const [errors, setErrors] = useState({})

  const counts=[]

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = () => {
    console.log('handleSubmit')
  }

  return (
    <div className="container w-50 rounded-3 shadow-lg p-5"  style={{marginTop:'200px'}}>

    <form onSubmit={handleSubmit}>
      <TextField
        label="Название счёта"
        value={data.name}
        name="name"
        onChange={handleChange}
        error={errors.name}
      />
      <SelectedField
        label='Выбери тип счёта'
        options={counts}
        name='count'
        onChange={handleChange}
        value={data.count}
        error={errors.count}
      />
      
      
      {/* {enterError && <p className="text-danger">{enterError}</p>} */}
      <button
        type="submit"
        // disabled={isValid || enterError}
        className="btn btn-primary w-100 mx-auto"
      >
        Создать
      </button>
    </form>
    </div>

  );
};

export default CountsAddPage;
