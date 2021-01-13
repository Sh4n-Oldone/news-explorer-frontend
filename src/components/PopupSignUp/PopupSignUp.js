import React, { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupSignUp.css';
import useForm from '../../utils/useForm';

export default function PopupSignUp({isOpen, onClose, handleLogIn}) {

  const { values, handleChange, errors, isValid, resetForm } = useForm();
  
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return (

    <PopupWithForm
      popupName={'signup'}
      onSubmit={handleSubmit}
      title={'Вход'}
      isSubmitEnable={isValid}
      buttonName={'Зарегистрироваться'}
      altLinkName={'Войти'}
      onClose={onClose}
      isOpen={isOpen}
      handleLogIn={handleLogIn}
    >

      <p className='popup-sign-up__input_name'>Email</p>
      <input
        value={values.email || ''}
        type='email'
        name='email'
        placeholder='Введите почту'
        className='popup-sign-up__input'
        onChange={handleChange}
        required
      />
      <small
        className='popup-sign-up__input_type_error'
      >{errors.email}</small>

      <p className='popup-sign-up__input_name'>Пароль</p>
      <input
        value={values.password || ''}
        type='password'
        name='password'
        placeholder='Введите пароль'
        className='popup-sign-up__input'
        onChange={handleChange}
        minLength={8} 
        required
      />
      <small
        className='popup-sign-up__input_type_error'
      >{errors.password}</small>

      <p className='popup-sign-up__input_name'>Имя</p>
      <input
        value={values.name || ''}
        type='text'
        name='name'
        placeholder='Введите своё имя'
        className='popup-sign-up__input'
        onChange={handleChange}
        minLength={2}
        maxLength={30}
        required
      />
      <small
        className='popup-sign-up__input_type_error'
      >{errors.name}</small>

      <p className='popup-sign-up__form_error'>{
        // Сюда должна падать ошибка api
      }</p>
      
    </PopupWithForm>

  );
}