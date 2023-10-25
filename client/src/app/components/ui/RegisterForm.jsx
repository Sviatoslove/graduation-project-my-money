import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextField from '../common/form/TextField'
import RadioField from '../common/form/RadioField'
import CheckboxField from '../common/form/CheckboxField'
import { selectAuthError, selectUser, signUp } from '../../store/usersSlice'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    sex: 'male',
    license: false
  })
  const [errors, setErrors] = useState({})
  const errorRegister = useSelector(selectAuthError())
  const user = useSelector(selectUser())

  // useEffect(() => {
  //   setErrors(errorRegister)
  // }, [errorRegister]);

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
    // setErrors(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // const isVal = validate()
    // if (isVal) return
    dispatch(signUp(data))
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Электронная почта'
        value={data.email}
        name='email'
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Имя'
        value={data.name}
        name='name'
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label='Пароль'
        value={data.password}
        name='password'
        type='password'
        onChange={handleChange}
        error={errors.password}
      />
      <RadioField
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]}
        name='sex'
        value={data.sex}
        onChange={handleChange}
      />
      <CheckboxField
        name='license'
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Согласен с <a href=''>лицензионным соглашением</a>
      </CheckboxField>
      {/* {errorRegister && <p className='text-danger'>{errorRegister}</p>} */}
      <button
        type='submit'
        // disabled={isValid}
        className='btn btn-primary w-100 mx-auto'
      >
        Войти
      </button>
    </form>
  )
}

export default RegisterForm
