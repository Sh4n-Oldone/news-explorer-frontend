import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupSignUp.css';

export default function PopupSignUp({isOpen, onClose, handleLogIn}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailInput = (event) => {setEmail(event.target.value)}
  const handlePasswordInput = (event) => {setPassword(event.target.value)}
  const handleNameInput = (event) => {setName(event.target.value)}

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return (

    <PopupWithForm
      popupName={'signup'}
      onSubmit={handleSubmit}
      title={'Вход'}
      isSubmitEnable={true}
      buttonName={'Зарегистрироваться'}
      altLinkName={'Войти'}
      onClose={onClose}
      isOpen={isOpen}
      handleLogIn={handleLogIn}
    >

      <p className='popup-sign-up__input_name'>Email</p>
      <input
        value={email || ''}
        type='email'
        name='email'
        placeholder='Введите почту'
        className='popup-sign-up__input'
        onChange={handleEmailInput}
        required
      />
      <small
        className='popup-sign-up__input_type_error'
      />

      <p className='popup-sign-up__input_name'>Пароль</p>
      <input
        value={password || ''}
        type='password'
        name='password'
        placeholder='Введите пароль'
        className='popup-sign-up__input'
        onChange={handlePasswordInput}
        required
      />
      <small
        className='popup-sign-up__input_type_error'
      />

      <p className='popup-sign-up__input_name'>Имя</p>
      <input
        value={name || ''}
        type='text'
        name='name'
        placeholder='Введите своё имя'
        className='popup-sign-up__input'
        onChange={handleNameInput}
        required
      />
      <small
        className='popup-sign-up__input_type_error'
      />

      <p className='popup-sign-up__form_error'/>
      
    </PopupWithForm>

  );
}