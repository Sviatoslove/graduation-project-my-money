import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, selectDataStatus, selectUser } from '../../store/user'
import UserAvatar from '../common/UserAvatar'

const NavProfile = () => {
  const dispatch = useDispatch()
  const dataStatus = useSelector(selectDataStatus())
  const [isOpen, setOpen] = useState(false)
  const currentUser = useSelector(selectUser())

  useEffect(() => {
    if (!dataStatus) dispatch(loadUser())
  }, [])
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }
  if (!dataStatus) return 'Loading...'
  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-items-center'>
        <div className='me-2'>{currentUser.name}</div>
        <UserAvatar image={currentUser.image} height='45' />
        <img src='' alt='' className='img-responsive rounded-circle' />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser._id}`} className='dropdown-item'>
          Profile
        </Link>
        <Link to={`/logout`} className='dropdown-item'>
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
