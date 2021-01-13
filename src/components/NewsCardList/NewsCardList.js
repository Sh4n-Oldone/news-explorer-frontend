import React, { useState } from 'react';
import '../../utils/button-style__reset.css';
import './NewsCardList.css';
import CardsContext from '../../context/CardsContext';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from 'react-router-dom';
import SavedCardsContext from '../../context/SavedCardsContext';

export default function NewsCardList({
  isNewsCardListVisible, 
  isLoggedIn, 
  onCardClick, 
  onLikeClick}) {

  const [showMoreCards, setShowMoreCards] = useState(false);

  const location = useLocation();

  function clickMe() {
    setShowMoreCards(true);
  }

  return (

    <section className={`news${ isNewsCardListVisible ? '' : ' news__hidden'}`}>

      {location.pathname!=='/saved-news'
        ? <>
            <h2 className='news__title'>Результаты поиска</h2>
            <CardsContext.Consumer>
              {cards =>
                <section className='news-cards'>
                  <ul className='news-cards__list'>
                    {cards.slice(0, showMoreCards || location.pathname==='/saved-news' ? cards.length : 3).map(card =>
                      <NewsCard {...card}
                            key={card._id} //Не факт, что будет id в api
                            onCardClick={onCardClick} 
                            onSaveClick={onLikeClick} 
                            isLoggedIn={isLoggedIn} 
                      />
                    )}
                  </ul>
                </section>
              }
            </CardsContext.Consumer>
            <button 
              className='button-style__reset news__button-more-news' 
              onClick={clickMe}
            >Показать ещё</button>
          </>
        : <>
            <SavedCardsContext.Consumer>
              {cards =>
                <section className='news-cards'>
                  <ul className='news-cards__list'>
                    {cards.map(card =>
                      <NewsCard {...card}
                            key={card._id} //Не факт, что будет id в api
                            onCardClick={onCardClick} 
                            onSaveClick={onLikeClick} 
                            isLoggedIn={isLoggedIn} 
                      />
                    )}
                  </ul>
                </section>
              }
            </SavedCardsContext.Consumer>
          </>
      }
      
    </section>
  
  );
}