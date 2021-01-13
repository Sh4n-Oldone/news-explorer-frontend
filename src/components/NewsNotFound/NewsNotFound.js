import React from 'react';
import './NewsNotFound.css';
import notFoundIcon from '../../images/news-notfound-img.png';

export default function NewsNotFound({isNewsNotFoundVisible}) {


  return (
    <div className={`news-not-found${ isNewsNotFoundVisible ? '' : ' news-not-found__hidden'}`}>
      <img 
        className='news-not-found__icon' 
        src={notFoundIcon}
        alt='Грустный смайлик'
      />
      <h3 className='news-not-found__title'>Ничего не найдено</h3>
      <p className='news-not-found__subtitle'>К сожалению по вашему запросу ничего не найдено.</p>
    </div>
  );
}