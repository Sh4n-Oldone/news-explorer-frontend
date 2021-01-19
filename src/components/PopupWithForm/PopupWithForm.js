import React, { useEffect } from 'react';
import '../../utils/button-style__reset.css';
import './PopupWithForm.css';

export default function PopupWithForm(props) {

  const handlePopups = () => {
    props.onClose();
    if (props.popupName === 'login') {
      props.handleSignUpButton();
    }
    if (props.popupName === 'signup') {
      props.handleLogIn();
    }
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
      className={`popup__wrapper${
        props.isOpen 
        ? ' popup_opened'
        : ''
      }`}
      onClick={handleClose}
    >

      <div className='popup'>
        <div className='popup__container'>

          <h2 className='popup__title'>{props.title}</h2>

          <form className='popup__form'
                name={props.popupName}
                onSubmit={props.onSubmit}
          >
            {props.children}
            <button type='submit'
                    className={`button-style__reset popup__save-button${
                      props.isSubmitEnable
                      ? ' popup__save-button_enabled'
                      : ''
                    }`} 
                    // disabled={props.isSubmitEnable}
                    // onSubmit={props.onSubmit}
            >{props.buttonName}</button>
          </form>

          <p className='popup__bottom-link'>
            или <button 
                  className='button-style__reset popup__bottom-link_item'
                  onClick={() => {handlePopups()}}
                >{props.altLinkName}</button>
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