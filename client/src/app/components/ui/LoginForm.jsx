import React, { useState } from 'react'
import TextField from '../common/form/TextField'
import CheckboxField from '../common/form/CheckboxField'
import { useDispatch } from 'react-redux'
import { logIn } from '../../store/usersSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))

    setEnterError(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // const isVal = validate()
    // if (isVal) return

    const path = {
      navigate,
      redirect: location.state ? location.state.from.pathname : '/'
    }
    dispatch(logIn({ payload: data, path }))
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
        label='Пароль'
        value={data.password}
        name='password'
        type='password'
        onChange={handleChange}
        error={errors.password}
      />
      <CheckboxField
        name='stayOn'
        value={data.stayOn}
        onChange={handleChange}
        error={errors.stayOn}
      >
        Оставаться в системе
      </CheckboxField>
      {enterError && <p className='text-danger'>{enterError}</p>}
      <button
        type='submit'
        // disabled={isValid || enterError}
        className='btn btn-primary w-100 mx-auto'
      >
        Войти
      </button>
    </form>
  )
}

export default LoginForm
