import React from 'react';
import './LogOutButton.css';
import ImageLogOut from '../../images/Union.png';
import ImageLogOutDark from '../../images/Union-dark.png';
import { useLocation } from 'react-router-dom';

export default function LogOutButton({name, isNeedToBeDark}) {

  const location = useLocation();

  return (
    <div className='logout-button_wrapper'>
      <p className='logout-button__item'>{name}</p>
      <img 
        src={isNeedToBeDark || location.pathname==='/saved-news' 
          ? ImageLogOutDark
          : ImageLogOut
        } 
        className='logout-button__image' 
        alt='Exit icon'/>
    </div>
  )
}