import React from 'react';
import './About.css';
import me from '../../images/author.jpg';

export default function About() {

  // Заменить файл author.jpg на нормальную фотку
  // Заменить текст параграфов на что-то вменяемое

  return (

    <section className='about'>
      <img 
        src={me}
        alt='Фото автора'
        className='about__photo'
      />
      <div className='about__text-wrapper'>
        <h2 className='about__title'>Об авторе</h2>
        <div className='about__text_wrapper'>
          <p className='about__text'>
            Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.
          </p>
          <p className='about__text'>
            Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.
          </p>
        </div>
      </div>
    </section>

  );
}