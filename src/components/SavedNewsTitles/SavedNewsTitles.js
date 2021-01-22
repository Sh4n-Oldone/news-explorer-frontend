import React from 'react';
import './SavedNewsTitles.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import SavedCardsContext from '../../context/SavedCardsContext';

export default function SavedNewsTitles() {

  function tags(items) {
    const tagsArr = []
    items.map((item) => tagsArr.includes(item.keyword) ? '' : tagsArr.push(item.keyword))
    return tagsArr
  }

  return (
    
    <SavedCardsContext.Consumer>
      {cards =>
        
        <CurrentUserContext.Consumer>
          {user => 

            <section className='saved-news-titles'>
              <h3 className='saved-news-titles__title'>Сохранённые статьи</h3>
              <p className='saved-news-titles__hello'>{user}, у вас {cards.length} {cards.length > 1
              ? cards.length > 4 ? 'сохранённых статей' : 'сохранённые статьи'
              : 'сохранённая статья'
              }</p>
              <p className='saved-news-titles__subtitle'>
                {cards.length >= 2 
                ? <>
                    По ключевым словам:
                    <strong className='saved-news-titles__subtitle saved-news-titles__subtitle_strong-mode'> {
                      tags(cards).slice(0, 2).join(', ')
                    } </strong>
                    и
                    <strong className='saved-news-titles__subtitle saved-news-titles__subtitle_strong-mode'> {
                      tags(cards).length - 2
                    }-м другим</strong>
                  </>
                : 'Вам нужно сохранить больше статей'
                }
              </p>
            </section>

          }
        </CurrentUserContext.Consumer>

      }
    </SavedCardsContext.Consumer>
  );
}