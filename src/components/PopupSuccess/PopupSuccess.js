import React from 'react';
import '../../utils/button-style__reset.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupSuccess.css';

export default function PopupSuccess(props) {

  const handlePopups = () => {
    props.onClose();
    props.handleLogIn();
  }

  return (

    <section 
      className={`popup__wrapper${
        props.isOpen 
        ? ' popup_opened'
        : ''
      }`}
      // onClick={props.onClose}
    >

      <div className='popup'>
        <div className='popup__container'>

          <h2 className='popup__title'>Пользователь успешно зарегистрирован!</h2>
          <p className='popup__bottom-link_mod'>
            <button 
                  className='button-style__reset popup__bottom-link_item'
                  onClick={() => {handlePopups()}}
                >Войти</button>
          </p>

          <button type='button'
            className='button-style__reset popup__close-button'
            onClick={props.onClose}
          />

        </div>
      </div>

    </section>

  );
}