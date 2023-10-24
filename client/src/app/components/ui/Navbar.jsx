import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectIsLoggedIn } from '../../store/usersSlice'
import NavProfile from './NavProfile'
import LOGO from '../../../assets/icons/money_logo.png'
import Menu from './Menu'
import TitleNavbar from './TitleNavbar'
import routes from '../routes/routes'
import { getTitleNavbar } from '../../utils'

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn())
  const location = useLocation()
  const menu = routes(isLoggedIn, location)

  const [show, setShow] = useState('hiding')

  const handleShowMenu = (e) => {
    e.preventDefault()
    show === 'hiding' ? setShow('show') : setShow('hiding')
  }

  return (
    <>
      <nav
        className='navbar navbar-dark bg-primary position-absolut shadow-lg'
        style={{
          height: '70px',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px'
        }}
      >
        <div className='container-fluid ps-4 pe-4'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'
            onClick={handleShowMenu}
          >
            <img src={LOGO} style={{ height: '45px' }} alt='Logo' />
            <span className='navbar-toggler-icon'></span>
          </button>
          <TitleNavbar name={getTitleNavbar(menu, location)} />
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <p className='navbar-brand text-light text-bold m-0 fw-bold'>
              My money application
            </p>
          )}
          <div
            className={'offcanvas offcanvas-start ' + show + ' text-bg-dark'}
            tabIndex='0'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            {show === 'show' && <Menu onShow={handleShowMenu} menu={menu} />}
          </div>
          {show === 'show' && (
            <div
              onClick={handleShowMenu}
              className='offcanvas-backdrop fade show'
            ></div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
