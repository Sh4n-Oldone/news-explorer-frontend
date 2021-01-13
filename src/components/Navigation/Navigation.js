import React from 'react';
import '../../utils/button-style__reset.css';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import LogOutButton from '../LogOutButton/LogOutButton.js';

export default function Navigation(
  {
    isLoggedIn, 
    currentUserName, 
    isNeedToBeDark, 
    handleLogInButton
  }) {

  const location = useLocation();

  return (
    <nav className='nav'>
      <ul className='nav__wrapper'>

        <li>
          <NavLink 
            className={`button-style__reset nav__link nav__link_no-decor${location.pathname==='/saved-news' 
              ? ' nav__link_not-active' 
              : ''}`} 
            activeClassName={`nav__link_active`}
            to='/'
          >Главная</NavLink>
        </li>

        <li>
          <NavLink 
            className={
              `button-style__reset nav__link nav__link_no-decor
              ${isLoggedIn 
                ? '' 
                : ' nav__link_hidden'
              }
              ${location.pathname==='/saved-news'
                ? ' nav__link_dark-mode' 
                : ''
              }
            `} 
            activeClassName={`nav__link_active${location.pathname==='/saved-news' 
              ? ' nav__link_active_dark-mode' 
              : ''}`} 
            to='/saved-news'
          >Сохранённые статьи</NavLink>
        </li>

        <li>
          <button 
            className={`button-style__reset nav__link_no-decor nav__link_auth${
              location.pathname==='/saved-news' 
              ? ' nav__link_auth_dark-mode'
              : ''
            }`}
            onClick={handleLogInButton} 
          >
            {isLoggedIn 
              ? <LogOutButton name={currentUserName} /> 
              : 'Авторизоваться'
            }
          </button>
        </li>

      </ul>
    </nav>
  );
}
