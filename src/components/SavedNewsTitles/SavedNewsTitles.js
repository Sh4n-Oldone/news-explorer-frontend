import React from 'react';
import './SavedNewsTitles.css';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function SavedNewsTitles({tagsArr}) {


  return (
    
    <CurrentUserContext.Consumer>
      {user => 
        <section className='saved-news-titles'>
          <h3 className='saved-news-titles__title'>Сохранённые статьи</h3>
          <p className='saved-news-titles__hello'>{user}, у вас {tagsArr.length} {tagsArr.length > 1
          ? 'сохранённых статей'
          : 'сохранённая статья'
          }</p>
          <p className='saved-news-titles__subtitle'>
            {tagsArr.length >= 2 
            ? <>
                По ключевым словам:
                <strong className='saved-news-titles__subtitle saved-news-titles__subtitle_strong-mode'> {tagsArr.slice(0, 2).join(', ')} </strong>
                и
                <strong className='saved-news-titles__subtitle saved-news-titles__subtitle_strong-mode'> {tagsArr.length - 2}-м другим</strong>
              </>
            : 'Вам нужно сохранить больше статей'
            }
          </p>
        </section>
      }
    </CurrentUserContext.Consumer>
  );
}