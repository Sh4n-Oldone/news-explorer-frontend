const CARDS = 'userCards';

export const setUserCards = (data) => {
  localStorage.setItem(CARDS, JSON.stringify(data))
}

export const getUserCards = () => {
  return localStorage.getItem(CARDS)
}

export const removeUserCards = () => {
  localStorage.removeItem(CARDS)
}