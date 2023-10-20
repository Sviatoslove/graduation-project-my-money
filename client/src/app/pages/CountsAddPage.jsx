import React, { useEffect, useState } from 'react';
import TextField from '../components/common/form/TextField';
import SelectedField from '../components/common/form/SelectedField';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountsData,selectCountsData, selectCountsDataStatus} from '../store/countsSlice';
import AvatarsField from '../components/common/form/AvatarsField';

const CountsAddPage = () => {
  const dispatch = useDispatch()
  const countsDataLoaded = useSelector(selectCountsDataStatus())
  const countsData= useSelector(selectCountsData())

  const valuta = [
    {
      "name": "EUR"
    },
    {
      "name": "USD"
    },
    { 
      "name": "RUB"
    }
  ]
  
  const [data, setData] = useState({
    name: '',
    count: '',
  })
  const [errors, setErrors] = useState({})


  useEffect(()=> {
    if(!countsDataLoaded) dispatch(loadCountsData())
  },[])

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = () => {
    console.log('handleSubmit')
  }

  return (<>
    {countsDataLoaded ? <div className="container w-50 rounded-3 shadow-lg p-5"  style={{marginTop:'200px'}}>

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
        options={countsData}
        name='count'
        onChange={handleChange}
        value={data.count}
        error={errors.count}
      />
         <SelectedField
        label='Выбери валюту счёта'
        options={valuta}
        name='count'
        onChange={handleChange}
        value={data.valuta}
        error={errors.valuta}
      />
      <AvatarsField
          label="Выбери аватарку"
          name="avatar"
          onChange={handleChange}
          options={avatars}
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
    </div> : 'Loading'}
    
    </>
  );
};

export default CountsAddPage;
