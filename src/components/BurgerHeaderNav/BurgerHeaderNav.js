import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../utils/button-style__reset.css';
import './BurgerHeaderNav.css';
import LogOutButton from '../LogOutButton/LogOutButton.js';
import CurrentUserContext from '../../context/CurrentUserContext'

export default function BurgerHeaderNav(
  {
    isLoggedIn, 
    handleLogInButton, 
    changeHeaderToDark, 
    changeHeaderToWhite, 
    onExit 
  }) {
  
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }
  function handleCloseMenu() {
    setIsMenuOpen(false);
  }
  

  return (
    <nav className='burger'>
      <button 
        className={`button-style__reset burger__open-button${
          location.pathname==='/saved-news' 
          ? ' burger__open-button_dark'
          : ''
        }`}
        onClick={() => {
          handleOpenMenu();
          changeHeaderToDark();
        }}
      />

      <div className={
        `burger__wrapper${
          isMenuOpen
          ? ' burger__wrapper_open'
          : ''
        }`
      }>
        <button 
          className='button-style__reset burger__close-button'
          onClick={() => {
            handleCloseMenu();
            changeHeaderToWhite();
          }}
        />
        <ul className='burger__nav'>
          <li className='butger__nav_item'>
            <NavLink 
              className='burger__nav_link'
              to='/'
            >Главное</NavLink>
          </li>
          <li className='butger__nav_item'>
            <NavLink 
              className='burger__nav_link'
              to='/saved-news'
            >Сохранённые статьи</NavLink>
          </li>
        </ul>

        <CurrentUserContext.Consumer>
          {value =>
            <button 
              className='button-style__reset burger__auth_button'
              onClick={isLoggedIn ? onExit : handleLogInButton}
            >
              {isLoggedIn 
                ? <LogOutButton name={value}/> 
                : 'Авторизоваться'
              }
            </button>
          }
        </CurrentUserContext.Consumer>

      </div>


    </nav>
  );
}