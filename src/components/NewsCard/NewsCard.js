import React, { useState } from 'react';
import '../../utils/button-style__reset.css';
import './NewsCard.css';
import notImg from '../../images/test-card-image.jpg';
import { useLocation } from 'react-router-dom';

export default function NewsCard(card) {

  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const [isCardSaved, setIsCardSaved] = useState(false);
  const [hideCard, setHideCard] = useState(false)

  const location = useLocation();

  function showLabel() {
    setIsLabelVisible(true);
  }
  function hideLabel() {
    setIsLabelVisible(false);
  }

  function handleClick() {
    if (location.pathname==='/saved-news') {
      card.onRemoveClick(card, setHideCard);
    }
    if (location.pathname!=='/saved-news' && card.isLoggedIn) {
      card.onSaveClick(card, setIsCardSaved);
    }
    if (location.pathname!=='/saved-news' && !card.isLoggedIn) {
      card.handlePopupSignUnOpen();
    }
  }

  const timeOptions = {
    year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	  timezone: 'UTC'
  }
  

  return (

    <li className={`news-card${hideCard ? ' news-card_hidden' : ''}`}>

      <div className={`news-card__tag${card.tag ? '' : ' news-card__tag_hidden'}`}>
        <p className='news-card__tag_text'>
          {card.keyword}
        </p>
      </div>

      <div className={`news-card__login-label${isLabelVisible && !card.isLoggedIn ? '' : ' news-card__login-label_hidden' }`}>
        <p className='news-card__login-label_text'>Войдите, чтобы сохранять статьи</p>
      </div>

      <button 
        className={ `button-style__reset news-card__save-button
          ${
            isCardSaved && card.isLoggedIn 
              ? ' news-card__save-button_saved' 
              : ''}
          ${
            location.pathname==='/saved-news' 
              ? ' news-card__save-button_unsave' 
              : ''
          }` 
        } 
        onClick={handleClick}
        onMouseOver={() => {showLabel()}} 
        onMouseOut={() => {hideLabel()}} 
      />

      <a 
        className='news-card__image'
        target='_blank'
        rel='noreferrer'
        href={card.url
          ? card.url
          : card.link
        }
      >
        <img 
          src={card.urlToImage 
            ? card.urlToImage
            : card.image ? card.image : notImg
          } 
          alt={card.title} 
          className='news-card__image'
        />
      </a>
      <a 
        className='news-card__text news-card__text_link-wrapper'
        target='_blank'
        rel='noreferrer'
        href={card.url
          ? card.url
          : card.link
        }
      >
        <div className='news-card-text__wrapper'>
          <p className='news-card__date'>{new Date(card.publishedAt ? card.publishedAt : card.date).toLocaleString('ru', timeOptions).replace(' г.', '')}</p>
          <h3 className='news-card__title'>{card.title}</h3>
          <p className='news-card__subtitle'>{card.description ? card.description : card.text}</p>
        </div>
        <h4 className='news-card__source'>{card.source.name ? card.source.name : card.source}</h4>
      </a>
      
    </li>
  
  );
}