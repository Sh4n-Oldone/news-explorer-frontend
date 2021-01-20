import React, { useEffect } from 'react';
import '../../utils/button-style__reset.css';
import './PopupSuccess.css';

export default function PopupSuccess(props) {

  const handlePopups = () => {
    props.onClose();
    props.handleLogIn();
  }
  const handleClose = (e) => {
    if (e.target.classList.contains("popup__wrapper")) {
      props.onClose();
    }
  }
  const handleEsc = (e) => {
    if(e.keyCode === 27) {
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc)
  }, [])

  return (

    <section 
      className={`popup-success__wrapper${
        props.isOpen 
        ? ' popup-success_opened'
        : ''
      }`}
      onClick={handleClose}
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