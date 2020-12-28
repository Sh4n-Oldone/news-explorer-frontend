import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { Route, Switch } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import CardsContext from '../../context/CardsContext';

export default function App() {


  return (
    <div className='App'>

      <CurrentUserContext.Provider>
        <CardsContext.Provider>

          <Header/>

          <Switch>

            <Route exact path='/'>
            </Route>

            <Route path='saved-news'>
            </Route>

          </Switch>

          <Footer/>

        </CardsContext.Provider>
      </CurrentUserContext.Provider>

    </div>
  );
}
