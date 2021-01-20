export const todayDate = new Date().toISOString().slice(0, 10);
export const oneWeekAgoDate = new Date(Date.parse(new Date()) - (1000 * 60 * 60 * 24 * 7)).toISOString().slice(0, 10);

// export const getNews = (keyword) => {
//   return fetch(`https://newsapi.org/v2/everything?language=ru&q=${keyword}&sortBy=popularity&from=${todayDate}&to=${oneWeekAgoDate}&pageSize=100&apiKey=13660dd63a8c4779b16d48753e2f56cf`, {
//     method: 'GET'
//   })
//   .then(res => {
//     if (res.status !== 200) {
//       const error = 'Ошибка доставки';
//       return error;
//     }
//     return res.json();
//   })
// }

export const getNews = (keyword) => {
  return fetch(`https://nomoreparties.co/news/v2/everything?language=ru&q=${keyword}&sortBy=popularity&from=${todayDate}&to=${oneWeekAgoDate}&pageSize=100&apiKey=13660dd63a8c4779b16d48753e2f56cf`, {
    method: 'GET'
  })
  .then(res => {
    if (res.status !== 200) {
      const error = 'Ошибка доставки';
      return error;
    }
    return res.json();
  })
}