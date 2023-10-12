import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// navbar-expand-lg


const Navbar = () => {
  const [show, setShow] = useState(false)
  const [showDrop, setShowDrop] = useState(false)

  const handleShowMenu = (e) => {
    e.preventDefault()
    const {target} = e
    if(target.dataset.bsToggle === 'dropdown') showDrop ? setShowDrop(false) : setShowDrop(true)
    else show ? setShow(false) : setShow(true)
  }

  return (
    <>
      <nav className="navbar bg-primary fixed-top">
        <div className="container-fluid" data-bs-theme="light">
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={(e)=>handleShowMenu(e)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand text-light" href="#">
            My money application
          </a>
          <div
            className={"offcanvas offcanvas-start"+(show ? ' show':' hiding')}
            tabIndex="0"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={(e)=>handleShowMenu(e)}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" onClick={(e)=>handleShowMenu(e)}>
              <li className="nav-item">
                  <NavLink to="" className="nav-link">
                    Main
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e)=>handleShowMenu(e)}
                  >
                    Dropdown
                  </a>
                  <ul className={"dropdown-menu" + (showDrop ? ' show':'')}>
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
