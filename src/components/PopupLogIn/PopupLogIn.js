import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupLogIn.css';
import useForm from '../../utils/useForm'

export default function PopupLogin({isOpen, onClose, handleSignUpButton, isLogInError, logIn}) {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(values, setIsInputDisabled);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (

    <PopupWithForm
      popupName={'login'}
      handleSubmit={handleSubmit}
      title={'Вход'}
      isSubmitEnable={isValid}
      buttonName={'Войти'}
      altLinkName={'Зарегистрироваться'}
      onClose={onClose}
      isOpen={isOpen}
      handleSignUpButton={handleSignUpButton} 
      isDisabled={isInputDisabled}
    >

      <p className='popup-log-in__input_name'>Email</p>
      <input
        value={values.email || ''}
        type='email'
        name='email'
        placeholder='Введите почту'
        className='popup-log-in__input'
        onChange={handleChange}
        disabled={ isInputDisabled ? 'disabled' : ''}
        required
      />
      <small
        className='popup-log-in__input_type_error'
      >{errors.email}</small>

      <p className='popup-log-in__input_name'>Пароль</p>
      <input
        value={values.password || ''}
        type='password'
        name='password'
        placeholder='Введите пароль'
        className='popup-log-in__input'
        onChange={handleChange}
        disabled={ isInputDisabled ? 'disabled' : ''}
        required
      />
      <small
        className='popup-log-in__input_type_error'
      >{errors.password}</small>

      <p className='popup-log-in__form_error'>{
        isLogInError
        ? 'Ошибка входа'
        : ''
      }</p>
      
    </PopupWithForm>

  );
}