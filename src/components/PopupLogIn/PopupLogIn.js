import React, { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupLogIn.css';
import useForm from '../../utils/useForm'

export default function PopupLogin({isOpen, onClose, handleSignUpButton}) {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return (

    <PopupWithForm
      popupName={'login'}
      onSubmit={handleSubmit}
      title={'Вход'}
      isSubmitEnable={isValid}
      buttonName={'Войти'}
      altLinkName={'Зарегистрироваться'}
      onClose={onClose}
      isOpen={isOpen}
      handleSignUpButton={handleSignUpButton} 
    >

      <p className='popup-log-in__input_name'>Email</p>
      <input
        value={values.email || ''}
        type='email'
        name='email'
        placeholder='Введите почту'
        className='popup-log-in__input'
        onChange={handleChange}
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
        required
      />
      <small
        className='popup-log-in__input_type_error'
      >{errors.password}</small>

      <p className='popup-log-in__form_error'>{
        // Сюда должна падать ошибка api
      }</p>
      
    </PopupWithForm>

  );
}