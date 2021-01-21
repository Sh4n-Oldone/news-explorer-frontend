import React, { useEffect, useState } from 'react';
import './App.css';
import configData from '../../utils/config.json';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import NewsError from '../NewsError/NewsError.js';
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
import { setName, getName, removeName } from '../../utils/userStorage';
import { setUserCards, getUserCards, removeUserCards } from '../../utils/cardsStorage';
import ProtectedRoute from '../../utils/ProtectedRoute';


export default function App() {

  const [currentUserName, setCurrentUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [newsVisibility, setNewsVisibility] = useState(false);
  const [NewsErrorVisibility, setNewsErrorVisibility] = useState(false);
  const [newsLoadingError, setNewsLoadingError] = useState('');

  const [newsCards, setNewsCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const [searchTag, setSearchTag] = useState('');

  const [isPopupLogInOpen, setIsPopupLogInOpen] = useState(false);
  const [isPopupSignUpOpen, setIsPopupSignUpOpen] = useState(false);
  const [isPopupSuccessfullRegister, setIsPopupSuccessfullRegister] = useState(false);

  const [cardsCounter, setCardsCounter] = useState(3);

  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLogInError, setIsLogInError] = useState(false);

  function handlePopupLogInOpen() { setIsPopupLogInOpen(true); }
  function handlePopupSignUnOpen() { setIsPopupSignUpOpen(true); }
  function handlePopupSignUnClose() { setIsPopupSignUpOpen(false); }
  function handlePopupSuccessOpen() { setIsPopupSuccessfullRegister(true); }

  function closeAllPopups() {
    setIsPopupLogInOpen(false);
    setIsPopupSignUpOpen(false);
    setIsPopupSuccessfullRegister(false);
  }

  function showLoader() { setLoaderVisibility(true); }
  function hideLoader() { setLoaderVisibility(false); }
  function showNewsCardList() { setNewsVisibility(true); }
  function hideNewsCardList() { setNewsVisibility(false); }
  function showNewsError() { setNewsErrorVisibility(true); }
  function hideNewsError() { setNewsErrorVisibility(false); }
  function showRegistrationError() { setIsRegisterError(true); }

  function tokenCheck() {
    const jwt = getToken();

    if (!jwt) {
      return;
    };

    if (jwt) {
      setIsLoggedIn(true);
      setIsLogInError(false);
      closeAllPopups();
      if (getUserCards() && getUserCards() !== null) {
        getDataFromStorage();
      }
      
      return getDataFromMainApi(jwt);
    };
  }

  async function getDataFromNewsApi(keyword, setIsInputDisabled) {
    try {
      hideNewsCardList();
      hideNewsError();
      showLoader();
      setIsInputDisabled(true);
      await newsApi.getNews(keyword).then((data) => {
        setCardsCounter(configData.CARDS_COUNTER);
        setNewsCards(data.articles);
        setUserCards(data.articles);
        hideLoader();
        setIsInputDisabled(false);
        if (data.articles.length === 0) {
          setNewsLoadingError('Ничего не найдено');
          showNewsError();
        } else {
          showNewsCardList();
        }
      });
      
    } catch (error) {
      if (error.status === 400) {setNewsLoadingError('Ошибка параметров запроса')}
      if (error.status === 401) {setNewsLoadingError('Неавторизованный доступ к API')}
      if (error.status === 429) {setNewsLoadingError('Слишком много запросов')}
      if (error.status === 500) {setNewsLoadingError('Сервер поиска временно недоступен')}
    }
  }

  async function getUserName(token) {
    try {
      await mainApi.getUserData(token)
        .then((res) => {
          setCurrentUserName(res.name);
          setName(res.name);
        })
    } catch (error) {
      console.log(error);
    }
  }

  async function getArticles(token) {
    try {
      await mainApi.getArticles(token)
        .then((data) => {
          const tags = [];
          setSavedCards(data);
          savedCards.map((card) => tags.includes(card.keyword) ? '' : tags.push(card.keyword));
        })
    } catch (error) {
      console.log(error);
    }
  }

  function getDataFromMainApi(token) {
    getUserName(token);
    getArticles(token);
  }

  function getDataFromStorage() {
    setCurrentUserName(getName());
    setNewsCards(JSON.parse(getUserCards()));
    showNewsCardList();
  }

  function registration({email, password, name}, setIsInputDisabled) {
    setIsInputDisabled(true);
    mainApi.register(email, password, name)
      .then((data) => {
        setIsInputDisabled(false);
        if(data.error || !data) {
          showRegistrationError();
        }
        if (data && !data.error) {
          handlePopupSignUnClose();
          handlePopupSuccessOpen();
        }
      })
      .catch(err => console.log(err));
  }

  function logIn({email, password}, setIsInputDisabled) {
    setIsInputDisabled(true);
    mainApi.authorize(email, password)
      .then((data) => {
        setIsInputDisabled(false);
        if (!data) {
          setIsLogInError(true);
        } else {
          tokenCheck();
          closeAllPopups();
        }
      })
      .catch(error => {console.log(error)});
  }

  function logOut() {
    setIsLoggedIn(!isLoggedIn);
    removeName();
    removeUserCards();
    removeToken();
  }

  function handleSaveCardClick(card, setIsCardSaved) {
    const jwt = getToken();
    const keyword = searchTag;
    mainApi.createArticles(jwt, keyword, card)
      .then((newCard) => {
        setSavedCards([...savedCards, newCard]);
        setIsCardSaved(true);
      })
      .catch(err => {console.log(err)});
  }

  function handleRemoveCardClick(card, setHideCard) {
    const jwt = getToken();

    mainApi.removeArticles(jwt, card)
      .then((answer) => {setHideCard(true)})
      .catch(err => {console.log(err)})

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
                      cardsArray={newsCards}
                      cardsCounter={cardsCounter}
                      setCardsCounter={setCardsCounter}
                      handleSaveCardClick={handleSaveCardClick}
                      handleRemoveCardClick={handleRemoveCardClick}
                      handlePopupSignUnOpen={handlePopupSignUnOpen}
                    />

                    <NewsError 
                      isNewsErrorVisible={NewsErrorVisibility}
                      newsLoadingError={newsLoadingError}
                    />

                    <About/>

                  </Route>

                  <ProtectedRoute path='/saved-news' 
                    loggedIn={isLoggedIn}
                    componentFirst={SavedNewsTitles}
                    componentSecond={NewsCardList}
                    isNewsCardListVisible={newsVisibility} 
                    isLoggedIn={isLoggedIn} 
                    cardsArray={newsCards}
                    cardsCounter={cardsCounter}
                    setCardsCounter={setCardsCounter}
                    handleSaveCardClick={handleSaveCardClick}
                    handleRemoveCardClick={handleRemoveCardClick}
                    handlePopupLogInOpen={handlePopupLogInOpen}
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
