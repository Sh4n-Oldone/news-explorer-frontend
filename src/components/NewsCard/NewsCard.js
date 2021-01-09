import React, { useState } from 'react';
import '../../utils/button-style__reset.css';
import './NewsCard.css';

export default function NewsCard(card) {

  const [isLabelVisible, setIsLabelVisible] = useState(false);
  function showLabel() {
    setIsLabelVisible(true);
  }
  function hideLabel() {
    setIsLabelVisible(false);
  }
  // card.isLoggedIn
  return (

    <li className='news-card'>

      {/* Этот блок появляется в зависимости от наличия объекта tag в приходящем пропсе card */}
      <div className={`news-card__tag${card.tag ? '' : ' news-card__tag_hidden'}`}>
        <p className='news-card__tag_text'>{card.tag}</p>
      </div>

      {/* Этот блок появляется только если переданный из App в пропсы isLoggedIn равен true */}
      <div className={`news-card__login-label${isLabelVisible && !card.isLoggedIn ? '' : ' news-card__login-label_hidden' }`}>
        <p className='news-card__login-label_text'>Войдите, чтобы сохранять статьи</p>
      </div>

      <button 
        className={ `button-style__reset news-card__save-button
        ${card.isSaved && card.isLoggedIn ? ' news-card__save-button_saved' : ''}` } 
        onClick={() => {card.onSaveClick(card)}}
        onMouseOver={() => {showLabel()}} 
        onMouseOut={() => {hideLabel()}} 
      />

      <img 
        src={card.image} 
        alt={card.title} 
        className='news-card__image'
      />
      <div className='news-card__text'>
        <div className='news-card-text__wrapper'>
          <p className='news-card__date'>{card.date}</p>
          <h3 className='news-card__title'>{card.title}</h3>
          <p className='news-card__subtitle'>{card.subtitle}</p>
        </div>
        <h4 className='news-card__source'>{card.source}</h4>
      </div>
      
    </li>
  
  );
}