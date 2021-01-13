import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupLogIn.css';

export default function PopupLogin({isOpen, onClose, handleSignUpButton}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = (event) => {setEmail(event.target.value)}
  const handlePasswordInput = (event) => {setPassword(event.target.value)}

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return (

    <PopupWithForm
      popupName={'login'}
      onSubmit={handleSubmit}
      title={'Вход'}
      isSubmitEnable={true}
      buttonName={'Войти'}
      altLinkName={'Зарегистрироваться'}
      onClose={onClose}
      isOpen={isOpen}
      handleSignUpButton={handleSignUpButton}
    >

      <p className='popup-log-in__input_name'>Email</p>
      <input
        value={email || ''}
        type='email'
        name='email'
        placeholder='Введите почту'
        className='popup-log-in__input'
        onChange={handleEmailInput}
        required
      />
      <small
        className='popup-log-in__input_type_error'
      />

      <p className='popup-log-in__input_name'>Пароль</p>
      <input
        value={password || ''}
        type='password'
        name='password'
        placeholder='Введите пароль'
        className='popup-log-in__input'
        onChange={handlePasswordInput}
        required
      />
      <small
        className='popup-log-in__input_type_error'
      />

      <p className='popup-log-in__form_error'/>
      
    </PopupWithForm>

  );
}