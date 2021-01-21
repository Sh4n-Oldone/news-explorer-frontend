const USER_NAME = 'username';

export const setName = (data) => {
  localStorage.setItem(USER_NAME, data)
}

export const getName = () => {
  return localStorage.getItem(USER_NAME)
}

export const removeName = () => {
  localStorage.removeItem(USER_NAME)
}