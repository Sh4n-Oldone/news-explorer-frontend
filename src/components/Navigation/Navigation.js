import React from 'react';
import '../../utils/button-style__reset.css';
import { useHistory, useLocation } from 'react-router-dom';
import './Navigation.css';
import LogOutButton from '../LogOutButton/LogOutButton.js';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Navigation(
  {
    isLoggedIn, 
    handleLogInButton, 
    onExit 
  }) {

  const location = useLocation();
  const history = useHistory();

  function handleClickNewsPage() {
    history.push('/saved-news');
  }

  function handleClickMainPage() {
    history.push('/');
  }

  return (
    <nav className='nav'>
      <ul className='nav__wrapper'>

        <li>
          <button 
          type='button'
            className={`button-style__reset nav__link nav__link_no-decor${location.pathname==='/saved-news' 
              ? ' nav__link_not-active nav__link_not-active_to-main' 
              : ' nav__link_active'}`} 
            onClick={(event) => {
              event.preventDefault();
              handleClickMainPage();
            }}
          >Главная</button>
        </li>

        <li>
          <button 
            type='button'
            className={
              `button-style__reset nav__link nav__link_no-decor
              ${isLoggedIn 
                ? '' 
                : ' nav__link_hidden'
              }
              ${location.pathname==='/saved-news'
                ? ' nav__link_dark-mode nav__link_active nav__link_active_dark-mode' 
                : ' nav__link_not-active'
              }
            `}
            onClick={(event) => {
              event.preventDefault();
              handleClickNewsPage();
            }}
          >Сохранённые статьи</button>
        </li>

        <li>
          <CurrentUserContext.Consumer>
            {value => 
              <button 
                className={`button-style__reset nav__link_no-decor nav__link_auth${
                  location.pathname==='/saved-news' 
                  ? ' nav__link_auth_dark-mode'
                  : ''
                }`}
                onClick={isLoggedIn ? onExit : handleLogInButton} 
              >
                {isLoggedIn 
                  ? <LogOutButton name={value} /> 
                  : 'Авторизоваться'
                }
              </button>
            }
          </CurrentUserContext.Consumer>
        </li>

      </ul>
    </nav>
  );
}
