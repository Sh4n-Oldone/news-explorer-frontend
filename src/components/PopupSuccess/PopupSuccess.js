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
      className={`popup-success__wrapper${
        props.isOpen 
        ? ' popup-success_opened'
        : ''
      }`}
      // onClick={props.onClose}
    >

      <div className='popup-success'>
        <div className='popup-success__container'>

          <h2 className='popup-success__title'>Пользователь успешно зарегистрирован!</h2>
          <p className='popup-success__bottom-link_mod'>
            <button 
                  className='button-style__reset popup-success__bottom-link_item'
                  onClick={() => {handlePopups()}}
                >Войти</button>
          </p>

          <button type='button-success'
            className='button-style__reset popup-success__close-button'
            onClick={props.onClose}
          />

        </div>
      </div>

    </section>

  );
}