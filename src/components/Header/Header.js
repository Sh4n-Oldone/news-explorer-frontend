import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerHeaderNav from '../BurgerHeaderNav/BurgerHeaderNav';
import './Header.css';

export default function Header({isLoggedIn, currentUserName, handleLogInButton}) {

  const location = useLocation();
  const intViewportWidth = window.innerWidth;
  const [makeHeaderWhite, setMakeHeaderWhite] = useState(true)

  function changeHeaderToDark() {
    setMakeHeaderWhite(false)
  }
  function changeHeaderToWhite() {
    setMakeHeaderWhite(true)
  }

  return (
    <>
      <header className='header'>
        <h1 className={`header__title${makeHeaderWhite && location.pathname==='/saved-news' ? ' header__title_dark-mode' : ''}`}>NewsExplorer</h1>

        { intViewportWidth<631
          ? <BurgerHeaderNav 
              isLoggedIn={isLoggedIn}
              currentUserName={currentUserName}
              handleLogInButton={handleLogInButton}
              changeHeaderToDark={changeHeaderToDark}
              changeHeaderToWhite={changeHeaderToWhite}
            />
          : <Navigation
              isLoggedIn={isLoggedIn} 
              currentUserName={currentUserName} 
              handleLogInButton={handleLogInButton}
            />
        }

      </header>
    </>
  );
}