import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerHeaderNav from '../BurgerHeaderNav/BurgerHeaderNav';
import './Header.css';

export default function Header({isLoggedIn, handleLogInButton, onExit}) {
  const location = useLocation();
  const [makeHeaderWhite, setMakeHeaderWhite] = useState(true)
  const [screenWidth, setScreenWidth] = useState(1400)

  function changeHeaderToDark() {
    setMakeHeaderWhite(false)
  }
  function changeHeaderToWhite() {
    setMakeHeaderWhite(true)
  }

  // создание таймера до выполнения принятой функции
  // чтобы было меньше рендеров на странице
  function debounce(func, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        func.apply(this, arguments)
      }, ms)
    };
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function resize() {
      setScreenWidth(window.innerWidth)
    }, 50)
    // 50 - количество милисекунд, после которого 
    // прочитается значение window.innerWidth и запишется в стейт
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [screenWidth])

  return (

      <header className='header'>
        <h1 
          className={`header__title${makeHeaderWhite && location.pathname==='/saved-news' 
          ? ' header__title_dark-mode' 
          : ''
          }`}
        >NewsExplorer</h1>

        { screenWidth<631 || window.innerWidth<631
          ? <BurgerHeaderNav 
              isLoggedIn={isLoggedIn} 
              handleLogInButton={handleLogInButton} 
              changeHeaderToDark={changeHeaderToDark} 
              changeHeaderToWhite={changeHeaderToWhite} 
              onExit={onExit} 
            />
          : <Navigation
              isLoggedIn={isLoggedIn} 
              handleLogInButton={handleLogInButton} 
              onExit={onExit} 
            />
        }
      </header>

  );
}