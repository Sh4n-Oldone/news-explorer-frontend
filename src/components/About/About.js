import React from 'react';
import './About.css';
import me from '../../images/author.jpg';

export default function About() {

  return (

    <section className='about'>
      <img 
        src={me}
        alt='Фото автора'
        className='about__photo'
      />
      <div className='about__wrapper'>
        <h2 className='about__title'>Об авторе</h2>
        <div className='about__text_wrapper'>
          <p className='about__text'>
            Павлов Александр. Веб-разработчик с опытом администрирования и различными нывыками в области digital-редактирования. Во фронте использую React (CRA), способен собрать с нуля REST API на Express.js с Mongo-базой.
          </p>
          <p className='about__text'>
            Выпускник курсов от Яндекс.Практикум, на которых получил навыки решения задач с помощью реакта, ноды и nginx. Буду рад собирать проекты в дружной команде!
          </p>
        </div>
      </div>
    </section>

  );
}