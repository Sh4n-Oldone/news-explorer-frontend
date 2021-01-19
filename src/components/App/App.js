import React, { useEffect, useState } from 'react';
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
import * as mainApi from '../../utils/MainApi.js';
import * as newsApi from '../../utils/NewsApi.js';
import { getToken, removeToken } from '../../utils/token';
import ProtectedRoute from '../../utils/ProtectedRoute';


export default function App() {

  // Временные состояния для тестирования хэдера
  const [currentUserName, setCurrentUserName] = useState('Грета');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Для тестирования перевести нужные дефолтные значения стейтов в true
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [newsVisibility, setNewsVisibility] = useState(false);
  const [newsNotFoundVisibility, setNewsNotFoundVisibility] = useState(false);

  // При дальнейшей разработке заменить дефолтное значение на пустой массив []
  const [newsCards, setNewsCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const [searchTag, setSearchTag] = useState(''); // Этот стейт идёт в отправку на сервер
  const [tagsArr, setTagsArr] = useState([]); // Этот стейт изменяется при загрузке сохранённых статей

  // дефолтные стейты попапов
  const [isPopupLogInOpen, setIsPopupLogInOpen] = useState(false);
  const [isPopupSignUpOpen, setIsPopupSignUpOpen] = useState(false);
  const [isPopupSuccessfullRegister, setIsPopupSuccessfullRegister] = useState(false);

  const [cardsCounter, setCardsCounter] = useState(3);

  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLogInError, setIsLogInError] = useState(false);

  function handlePopupLogInOpen() {
    setIsPopupLogInOpen(true);
  }

  function handlePopupSignUnOpen() {
    setIsPopupSignUpOpen(true);
  }

  function handlePopupSignUnClose() {
    setIsPopupSignUpOpen(false);
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

  function showRegistrationError() {
    setIsRegisterError(true);
  }

  function tokenCheck() {
    const jwt = getToken();

    if (!jwt) {
      return;
    };

    if (jwt) {
      mainApi.getArticles(jwt)
        .then((data) => {
          setSavedCards(data);
          data.map((card) => tagsArr.find(card.keyword) ? tagsArr : setTagsArr(...tagsArr, card.keyword))
        })

      return mainApi.getUserData(jwt)
              .then((res) => {
                setIsLoggedIn(true);
                setCurrentUserName(res.name);
              });
    }
  }

  async function getDataFromNewsApi(keyword) {
    try {
      hideNewsCardList();
      hideNewsNotFound();
      showLoader();
      
      await newsApi.getNews(keyword).then((data) => {
        setCardsCounter(3);
        setNewsCards(data.articles);
        hideLoader();
        if (data.articles.length === 0) {
          showNewsNotFound();
        } else {
          showNewsCardList();
        }
      })
      
    } catch (error) {
      console.log('getDataFromNewsApi error: ' + error);
    }
  }

  function registration({email, password, name}) {
    mainApi.register(email, password, name)
      .then((data) => {
        if(data.error || !data) {
          showRegistrationError();
        }
        if (data && !data.error) {
          handlePopupSignUnClose();
          handlePopupSuccessOpen();
        }
      })
      .catch(err => console.log('registration: ' + err))
  }

  function logIn({email, password}) {
    mainApi.authorize(email, password)
      .then((data) => {
        if (!data) {
          setIsLogInError(true);
        } else {
          setIsLoggedIn(true);
          setIsLogInError(false);
          tokenCheck();
          closeAllPopups();
        }
      })
      .catch(error => {console.log('logIn: ' + error)})
  }

  function logOut() {
    setIsLoggedIn(!isLoggedIn);
    removeToken();
  }

  function handleSaveCardClick() {
    
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className='App'>
      <div className='page'>
        <div className='page__container'>

          <CurrentUserContext.Provider value={currentUserName}>
            <CardsContext.Provider value={newsCards}>
              <SavedCardsContext.Provider value={savedCards}>

                <Header
                  isLoggedIn={isLoggedIn} 
                  currentUserName={currentUserName} 
                  handleLogInButton={handlePopupLogInOpen}
                  onExit={logOut}
                />
                
                <Switch>

                  <Route exact path='/'>

                    <Main
                      loadingNewsApi={getDataFromNewsApi}
                      setSearchTag={setSearchTag}
                    />

                    <Preloader
                      isPreloaderVisible={loaderVisibility}
                    />

                    <NewsCardList
                      isNewsCardListVisible={newsVisibility} 
                      isLoggedIn={isLoggedIn} 
                      onLikeClick={handleSaveCardClick} 
                      tag={searchTag}
                      cardsArray={newsCards}
                      cardsCounter={cardsCounter}
                      setCardsCounter={setCardsCounter}
                    />

                    <NewsNotFound 
                      isNewsNotFoundVisible={newsNotFoundVisibility}
                    />

                    <About/>

                  </Route>

                  {/* <Route path='/saved-news'>

                    <SavedNewsTitles 
                      currentUserName={currentUserName} 
                      tagsArr={tagsArr}
                    />

                    <NewsCardList
                      isNewsCardListVisible={newsVisibility} 
                      isLoggedIn={isLoggedIn} 
                      onLikeClick={handleSaveCardClick} 
                    />

                  </Route> */}

                  <ProtectedRoute path='/saved-news' 
                    loggedIn={isLoggedIn}
                    componentFirst={SavedNewsTitles}
                    componentSecond={NewsCardList}
                    currentUserName={currentUserName} 
                    tagsArr={tagsArr}
                    isNewsCardListVisible={newsVisibility} 
                    isLoggedIn={isLoggedIn} 
                    onLikeClick={handleSaveCardClick} 
                    tag={searchTag}
                    cardsArray={newsCards}
                    cardsCounter={cardsCounter}
                    setCardsCounter={setCardsCounter}
                  />

                </Switch>
                
                <Footer/>
                
                <PopupLogIn 
                  isOpen={isPopupLogInOpen} 
                  onClose={closeAllPopups} 
                  handleSignUpButton={handlePopupSignUnOpen}
                  isLogInError={isLogInError}
                  logIn={logIn}
                />

                <PopupSignUp
                  isOpen={isPopupSignUpOpen}
                  onClose={closeAllPopups}
                  handleLogIn={handlePopupLogInOpen}
                  registration={registration}
                  isRegisterError={isRegisterError}
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
