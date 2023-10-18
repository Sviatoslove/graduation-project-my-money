import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../components/common/Container'
import { RadioField, SelectedField, TextField } from '../components/common/form'

const UserPageEdit = ({user}) => {
console.log('user:', user)

  const [data, setData] = useState(user)
  const [errors, setErrors] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    // const isValid = validate()
    // if (!isValid) return
    // dispatch(
    //   updateUser({
    //     ...data,
    //     qualities: data.qualities.map((q) => q.value)
    //   })
    // )
  }



  const handleChange = ({target}) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }


  return (
    <>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Имя'
              value={data.name}
              name='name'
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label='Электронная почта'
              value={data.email}
              name='email'
              type='email'
              onChange={handleChange}
              error={errors.email}
            />
            <SelectedField
              label='Выбери аватарку:'
              options={data.images}
              name='avatars'
              onChange={handleChange}
              value={data.image}
            />
            <RadioField
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' }
              ]}
              name='sex'
              value={data.sex}
              onChange={handleChange}
            />
          <button
              type='submit'
              className='btn btn-primary w-100 mx-auto mb-3'
              // disabled={isValid}
            >
              Обновить
            </button>
            {/* <BackHistoryButton /> */}
          </form>
    </>
  )
}

UserPageEdit.propTypes = {
  user: PropTypes.object
}

export default UserPageEdit

