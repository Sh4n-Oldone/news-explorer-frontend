import React, { useState } from 'react';
import './SavedNewsTitles.css';

export default function SavedNewsTitles({currentUserName}) {

  // Можно добавить в дефолтный массив данные для проверки
  const [tags, setTags] = useState(['Природа', 'Котики', 'Тэги'])

  return (

    <section className='saved-news-titles'>

      <h3 className='saved-news-titles__title'>Сохранённые статьи</h3>
      <p className='saved-news-titles__hello'>{currentUserName}, у вас {tags.length} {tags.length > 1
      ? 'сохранённых статей'
      : 'сохранённая статья'
      }</p>
      <p className='saved-news-titles__subtitle'>
        {tags.length >= 2 
        ? <>
            По ключевым словам:
            <strong className='saved-news-titles__subtitle saved-news-titles__subtitle_strong-mode'> {tags.slice(0, 2).join(', ')} </strong>
            и
            <strong className='saved-news-titles__subtitle saved-news-titles__subtitle_strong-mode'> {tags.length - 2}-м другим</strong>
          </>
        : 'Вам нужно сохранить больше статей'
        
        
        }

        
      </p>

    </section>

  );
}