import React, { useEffect, useState } from 'react';
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
  onLikeClick,
  tag,
  cardsArray,
  cardsCounter,
  setCardsCounter}) {

  // const [showMoreCards, setShowMoreCards] = useState(false);

  const [isButtonVisible, setIsButtonVisible] = useState(true)

  const location = useLocation();

  function clickMe() {
    setCardsCounter(cardsCounter + 3);
  }

  useEffect(() => {
    if (cardsCounter >= cardsArray.length) {
      setIsButtonVisible(false);
    }
    if (cardsCounter < cardsArray.length) {
      setIsButtonVisible(true);
    }
  }, [cardsCounter, cardsArray.length]);

  return (

    <section className={`news${ isNewsCardListVisible ? '' : ' news__hidden'}`}>

      {location.pathname!=='/saved-news'
        ? <>
            <h2 className='news__title'>Результаты поиска</h2>
            <CardsContext.Consumer>
              {cards =>
                <section className='news-cards'>
                  <ul className='news-cards__list'>
                    {cards.slice(0, location.pathname==='/saved-news' ? cards.length : cardsCounter).map(card =>
                      <NewsCard {...card}
                            // key={cards.findIndex(element => element === card)}
                            key={cards.url}
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
              className={`button-style__reset news__button-more-news${
                isButtonVisible
                ? ''
                : ' news__button-more-news_hidden'
              }`} 
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
                            key={card.link}
                            onCardClick={onCardClick} 
                            onSaveClick={onLikeClick} 
                            isLoggedIn={isLoggedIn} 
                            tag={tag}
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