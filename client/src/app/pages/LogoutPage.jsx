import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/usersSlice'
import { useNavigate } from 'react-router-dom'
import { countsDestroyed } from '../store/countsSlice'

const LogoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logOut())
    dispatch(countsDestroyed())
    navigate('/')
  }, [])

  return <h2>Loading...</h2>
}

export default LogoutPage
