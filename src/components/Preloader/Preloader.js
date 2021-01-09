import React from 'react';
import './Preloader.css';
import loadingIcon from '../../images/loading-img.png';

export default function Preloader({isPreloaderVisible}) {

  return (

    <div className={`preloader${ isPreloaderVisible ? '' : ' preloader__hidden' }`}>
      <img
        src={loadingIcon}
        alt='Иконка загрузки'
        className='preloader__icon'
      />
      <p className='preloader__text'>Идет поиск новостей...</p>
    </div>
  
  );
}