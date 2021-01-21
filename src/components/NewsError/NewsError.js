import React from 'react';
import './NewsError.css';
import notFoundIcon from '../../images/news-notfound-img.png';

export default function NewsNotFound({isNewsErrorVisible, newsLoadingError}) {

  return (
    <div className={`news-not-found${ isNewsErrorVisible ? '' : ' news-not-found__hidden'}`}>
      <img 
        className='news-not-found__icon' 
        src={notFoundIcon}
        alt='Грустный смайлик'
      />
      <h3 className='news-not-found__title'>{newsLoadingError}</h3>
      <p className='news-not-found__subtitle'>{
        newsLoadingError === 'Ничего не найдено'
        ? 'К сожалению по вашему запросу ничего не найдено.'
        : ''
      }</p>
    </div>
  );
}