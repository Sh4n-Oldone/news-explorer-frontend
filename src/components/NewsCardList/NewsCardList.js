import React from 'react';
import '../../utils/button-style__reset.css';
import './NewsCardList.css';
import CardsContext from '../../context/CardsContext';
import NewsCard from '../NewsCard/NewsCard.js';
import { useLocation } from 'react-router-dom';
import SavedCardsContext from '../../context/SavedCardsContext';

export default function NewsCardList({
  isNewsCardListVisible, 
  isLoggedIn, 
  cardsArray, 
  cardsCounter, 
  setCardsCounter, 
  handleSaveCardClick, 
  handleRemoveCardClick}) {

  let location = useLocation();

  function clickMe() {
    setCardsCounter(cardsCounter + 3);
  }

  return (

    <section className={`news${ !isNewsCardListVisible && location.pathname!=='/saved-news' ? ' news__hidden' : '' }`}>

        <div className={`news-block${location.pathname==='/saved-news' ? ' news-block_hidden' : ''}`}>
          <h2 className='news__title'>Результаты поиска</h2>
          <CardsContext.Consumer>
            {cards =>
              <section className='news-cards'>
                <ul className='news-cards__list'>
                  {cards.slice(0, cardsCounter).map(card =>
                    <NewsCard {...card}
                          key={card.url}
                          onSaveClick={handleSaveCardClick} 
                          isLoggedIn={isLoggedIn} 
                    />
                  )}
                </ul>
              </section>
            }
          </CardsContext.Consumer>
          <button 
            className={`button-style__reset news__button-more-news${
              cardsCounter < cardsArray.length
              ? ''
              : ' news__button-more-news_hidden'
            }`} 
            onClick={clickMe}
          >Показать ещё</button>
        </div>
        <div className={`news-block${location.pathname==='/saved-news' ? '' : ' news-block_hidden'}`}>
          <SavedCardsContext.Consumer>
            {cards =>
              <section className='news-cards'>
                <ul className='news-cards__list'>
                  {cards.map(card =>
                    <NewsCard {...card}
                          key={cards.findIndex(element => element === card)}
                          onSaveClick={handleSaveCardClick} 
                          onRemoveClick={handleRemoveCardClick}
                          isLoggedIn={isLoggedIn} 
                          tag={card.keyword}
                    />
                  )}
                </ul>
              </section>
            }
          </SavedCardsContext.Consumer>
        </div>
      
    </section>
  
  );
}