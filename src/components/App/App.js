import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import NewsNotFound from '../NewsNotFound/NewsNotFound.js';
import PopupLogIn from '../PopupLogIn/PopupLogIn.js';
import PopupSignUp from '../PopupSignUp/PopupSignUp.js';
import PopupSuccess from '../PopupSuccess/PopupSuccess.js';
import SavedNewsTitles from '../SavedNewsTitles/SavedNewsTitles.js';
import Footer from '../Footer/Footer.js';
import { Switch, Route } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import CardsContext from '../../context/CardsContext';
import SavedCardsContext from '../../context/SavedCardsContext';
import testImg from '../../images/test-card-image.png';


export default function App() {

  // Временные состояния для тестирования хэдера
  const [currentUserName, setCurrentUserName] = useState('Грета');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Для тестирования перевести нужные дефолтные значения стейтов в true
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [newsVisibility, setNewsVisibility] = useState(true);
  const [newsNotFoundVisibility, setNewsNotFoundVisibility] = useState(false);

  // При дальнейшей разработке заменить дефолтное значение на пустой массив []
  const [newsCards, setNewsCards] = useState([
    {
      image: testImg,
      date: '2 августа, 2019',
      title: 'Национальное достояние – парки',
      subtitle: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
      source: 'Лента.ру',
      _id: '1', 
      isSaved: false,
    },
    {
      image: testImg,
      date: '3 августа, 2019',
      title: 'Лесные огоньки: история одной фотографии',
      subtitle: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
      source: 'Медуза',
      _id: '2', 
      isSaved: false,
    },
    {
      image: testImg,
      date: '4 августа, 2019',
      title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
      subtitle: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
      source: 'Медуза',
      _id: '3', 
      isSaved: true,
    },
    {
      image: testImg,
      date: '17 августа, 2020',
      title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка asdasdasdasd',
      subtitle: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
      source: 'Риа',
      _id: '4', 
      isSaved: true,
    },
    {
      image: testImg,
      date: '30 августа, 2019',
      title: 'Первозданная тайга',
      subtitle: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
      source: 'Риа',
      _id: '5', 
      isSaved: false,
    }
  ]);

  const [searchTag, setSearchTag] = useState(''); // Добавление этого стейта к загружаемой карточке

  // дефолтные стейты попапов
  const [isPopupLogInOpen, setIsPopupLogInOpen] = useState(false);
  const [isPopupSignUpOpen, setIsPopupSignUpOpen] = useState(false);
  const [isPopupSuccessfullRegister, setIsPopupSuccessfullRegister] = useState(false);

  function handlePopupLogInOpen() {
    setIsPopupLogInOpen(true);
  }

  function handlePopupSignInOpen() {
    setIsPopupSignUpOpen(true);
  }

  function handlePopupSuccessOpen() {
    setIsPopupSuccessfullRegister(true);
  }

  // Функция закрытия попапов
  function closeAllPopups() {
    setIsPopupLogInOpen(false);
    setIsPopupSignUpOpen(false);
    setIsPopupSuccessfullRegister(false);
  }

  function handleSearchTag(tag) {
    setSearchTag(tag);
  }

  // Наброски рабочих функций
  function showLoader() {
    // по нажатию на кнопку "Искать" включает отображение блока с аниманией загрузки
    setLoaderVisibility(true);
  }
  function hideLoader() {
    // по ДЕЙСТВИЕ выключает отображение блока с аниманией загрузки
    setLoaderVisibility(false);
  }
  function showNewsCardList() {
    // Отобразить блок карточек
    setNewsVisibility(true);
  }
  function hideNewsCardList() {
    // Скрыть блок карточек
    setNewsVisibility(false);
  }
  function showNewsNotFound() {
    // Отобразить блок с ошибкой Not Found
    setNewsNotFoundVisibility(true);
  }
  function hideNewsNotFound() {
    // Скрыть блок с ошибкой Not Found
    setNewsNotFoundVisibility(false);
  }

  function getDataFromNewsApi() {
    try {
      // showLoader();
      // await newsApi().then((data) => {
      //   //записать данные в стейты
      //   //записать карточки в стейт карточек
      //   hideLoader();
      // })
      
    } catch (error) {
      
    }
  }

  function handleCardClick() {
    // При клике на новость должна открываться вкладка по ссылке на эту новость, наверное
  }

  function handleSaveCardClick() {
    // Карточка добавляется в сохранённые
  }

  return (
    <div className='App'>
      <div className='page'>
        <div className='page__container'>

          <CurrentUserContext.Provider value={currentUserName}>
            <CardsContext.Provider value={newsCards}>
              <SavedCardsContext.Provider value={newsCards}>
                {/* В дальнейшем для сохранённых карточек надо будет сделать свой стейт, в который будут выгружаться данные из базы */}

                <Header
                  isLoggedIn={isLoggedIn} 
                  currentUserName={currentUserName} 
                  handleLogInButton={handlePopupLogInOpen}
                />
                
                <Switch>

                  <Route exact path='/'>

                    <Main
                      showLoader={showLoader}
                      // loadingNewsApi={getDataFromNewsApi} // заменить этим showLoader
                    />

                    <Preloader
                      isPreloaderVisible={loaderVisibility}
                    />

                    <NewsCardList
                      isNewsCardListVisible={newsVisibility} 
                      isLoggedIn={isLoggedIn} 
                      onCardClick={handleCardClick} 
                      onLikeClick={handleSaveCardClick} 
                    />

                    <NewsNotFound 
                      isNewsNotFoundVisible={newsNotFoundVisibility}
                    />

                    <About/>

                  </Route>

                  <Route path='/saved-news'>

                    <SavedNewsTitles 
                      currentUserName={currentUserName} 
                    />

                    <NewsCardList
                      isNewsCardListVisible={newsVisibility} 
                      isLoggedIn={isLoggedIn} 
                      onCardClick={handleCardClick} 
                      onLikeClick={handleSaveCardClick} 
                    />

                  </Route>

                </Switch>
                
                <Footer/>
                
                <PopupLogIn 
                  isOpen={isPopupLogInOpen} 
                  onClose={closeAllPopups} 
                  handleSignUpButton={handlePopupSignInOpen}
                />

                <PopupSignUp
                  isOpen={isPopupSignUpOpen}
                  onClose={closeAllPopups}
                  handleLogIn={handlePopupLogInOpen}
                  handleSuccess={handlePopupSuccessOpen}
                />

                <PopupSuccess 
                  isOpen={isPopupSuccessfullRegister}
                  onClose={closeAllPopups}
                  handleLogIn={handlePopupLogInOpen}
                />

              </SavedCardsContext.Provider>
            </CardsContext.Provider>
          </CurrentUserContext.Provider>

        </div>
      </div>
    </div>
  );
}
