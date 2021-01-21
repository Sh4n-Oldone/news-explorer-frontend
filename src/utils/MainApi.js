import { setToken } from './token';
import configData from './config.json';

export const BASE_URL = configData.BACKEND_URL;

export const register = ( email, password, name ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
  .then(res => {
    if (res.status === 409 || res.status === 400 || res.status === 401) {
      const error = {error: 'Ошибка'}
      return error;
    }
    if (res.status === 200 || res.status === 201) {
      return res.json();
    }
  })
};

export const authorize = ( email, password ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => {
    if (res.status === 400) {
      const error = 'Не передано одно из полей для проверки пользователя';
      return error;
    }
    if (res.status === 401) {
      const error = 'Неверный логин или пароль';
      return error;
    }
    if (res.status === 200 || res.status === 201) {
      return res.json();
    }
  })
  .then((data) => {
    if (data.token){
      setToken(data.token);
      return data;
    } else {
      return;
    }
  })
};

export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status === 401) {
      const error = 'Некорректная отправка токена';
      return error;
    }
    if (res.status === 404) {
      const error = 'Пользователь не обнаружен';
      return error;
    }
    return res.json();
  })
  .then((data) => {
    return data;
  })
};

export const getArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status !== 200) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
};

export const createArticles = ( token, keyword, {title, description, publishedAt, source, url, urlToImage} ) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      keyword: keyword,
      title: title,
      text: description,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage
    })
  })
  .then(res => {
    if (res.status !== 200) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
};

export const removeArticles = (token, {_id}) => {
  return fetch(`${BASE_URL}/articles/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status === 200) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};