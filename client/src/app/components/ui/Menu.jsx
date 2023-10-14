import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({isLoggedIn, onShow}) => {
  return ( 
    <>
       <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Меню
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={(e) => onShow(e)}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul
                className="navbar-nav justify-content-end flex-grow-1 pe-3"
                onClick={(e) => onShow(e)}
              >
                <li className="nav-item">
                  <NavLink to="" className="nav-link">
                    <i style={{marginRight:'5px'}} className="bi bi-coin"></i>
                    Главная
                  </NavLink>
                </li>
                {!isLoggedIn && (
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                    <i style={{marginRight:'5px'}} className="bi bi-door-open"></i>
                      Войти
                    </NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/counts" className="nav-link">
                      <i style={{marginRight:'5px'}} className="bi bi-piggy-bank-fill"></i>
                      Счета
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                      <i style={{marginRight:'5px'}} className="bi bi-graph-up"></i>
                        Графики
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                      <i style={{marginRight:'5px'}} className="bi bi-stack"></i>
                        Категории
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                      <i style={{marginRight:'5px'}} className="bi bi-currency-exchange"></i>
                        Регулярные платежи
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                      <i style={{marginRight:'5px'}} className="bi bi-currency-euro"></i>
                        Валюта
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                      <i style={{marginRight:'5px'}} className="bi bi-clock-history"></i>
                        История операций
                      </NavLink>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Ещё пункты...
                      </NavLink>
                    </li> */}
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
                  </>
                )}
              </ul>
            </div>
    </>
   );
}

Menu.propTypes={
  isLoggedIn: PropTypes.bool,
  onShow: PropTypes.func
}
 
export default Menu;