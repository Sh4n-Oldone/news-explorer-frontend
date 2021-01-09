import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({isLoggedIn, currentUserName, handleLogInButton}) {

  const location = useLocation();

  const [isNeedToBeDark, setIsNeedToBeDark] = useState(false);
  const setHeaderToDarkMode =(e) => {
    if (window.scrollY > 500) {
      setIsNeedToBeDark(true);
    } else {
      setIsNeedToBeDark(false);
    }    
  }

  useEffect(() => {
    window.addEventListener('scroll', setHeaderToDarkMode)
  }, [])

  return (
    <>
      <header className='header'>
        <h1 className={`header__title${isNeedToBeDark || location.pathname==='/saved-news' ? ' header__title_dark-mode' : ''}`}>NewsExplorer</h1>
        <Navigation
          isLoggedIn={isLoggedIn} 
          currentUserName={currentUserName} 
          isNeedToBeDark={isNeedToBeDark}
          handleLogInButton={handleLogInButton}
        />
      </header>
    </>
  );
}