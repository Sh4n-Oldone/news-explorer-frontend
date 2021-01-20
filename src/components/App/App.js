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

  const [currentUserName, setCurrentUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [newsVisibility, setNewsVisibility] = useState(false);
  const [newsNotFoundVisibility, setNewsNotFoundVisibility] = useState(false);

  const [newsCards, setNewsCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [tagsArr, setTagsArr] = useState([]);

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
  function showNewsNotFound() { setNewsNotFoundVisibility(true); }
  function hideNewsNotFound() { setNewsNotFoundVisibility(false); }
  function showRegistrationError() { setIsRegisterError(true); }

  function tokenCheck() {
    const jwt = getToken();

    if (!jwt) {
      return;
    };

    if (jwt) {
      setIsLoggedIn(true);
      setIsLogInError(false);
      return getDataFromMainApi(jwt);
    };
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
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserName(token) {
    try {
      await mainApi.getUserData(token)
        .then((res) => {
          setCurrentUserName(res.name);
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
          return tags;
        })
        .then((tags) => {
          setTagsArr(tags);
        })
    } catch (error) {
      console.log(error);
    }
  }

  function getDataFromMainApi(token) {
    getUserName(token);
    getArticles(token);
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
      .catch(err => console.log(err));
  }

  function logIn({email, password}) {
    mainApi.authorize(email, password)
      .then((data) => {
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
    removeToken();
  }

  function handleSaveCardClick(card) {
    const jwt = getToken();
    const keyword = searchTag;
    mainApi.createArticles(jwt, keyword, card)
      .then((newCard) => {
        setSavedCards([...savedCards, newCard]);
      })
      .catch(err => {console.log(err)});
  }

  function handleRemoveCardClick(card) {
    const jwt = getToken();

    mainApi.removeArticles(jwt, card)
      .then((message) => {
        // const newArr = [];
        // savedCards.map((item) => item===card ? '' : newArr.push(item));
        // setSavedCards(newArr);
      })
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
                    />

                    <NewsNotFound 
                      isNewsNotFoundVisible={newsNotFoundVisibility}
                    />

                    <About/>

                  </Route>

                  <ProtectedRoute path='/saved-news' 
                    loggedIn={isLoggedIn}
                    componentFirst={SavedNewsTitles}
                    componentSecond={NewsCardList}
                    tagsArr={tagsArr}
                    isNewsCardListVisible={newsVisibility} 
                    isLoggedIn={isLoggedIn} 
                    cardsArray={newsCards}
                    cardsCounter={cardsCounter}
                    setCardsCounter={setCardsCounter}
                    handleSaveCardClick={handleSaveCardClick}
                    handleRemoveCardClick={handleRemoveCardClick}
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
