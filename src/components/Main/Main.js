import React, { useState } from 'react';
import '../../utils/button-style__reset.css';
import '../../utils/input-style__reset.css';
import './Main.css';

export default function Main({setSearchTag, loadingNewsApi}) {

  const [inputState, setInputState] = useState({ search: '' })
  const [placeholder, setPlaceholder] = useState('Введите тему новости');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const handleChange = (e) => {
    const { name,  value } = e.target;
    setInputState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = inputState.search;
    if (search !== '') {
      setSearchTag(search);
      loadingNewsApi(search, setIsInputDisabled);
    }
    setPlaceholder('Сначала введите тему');
  }

  return (

    <main className='main'>

      <section className='main__content'>
        <h2 className='main__title'>Что творится в мире?</h2>
        <p className='main__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form 
          className='main__form'
          onSubmit={handleSubmit}
        >
          <input 
            className='input-style__reset main__form_input' 
            name='search' 
            value={inputState.search || ''} 
            placeholder={placeholder} 
            type='text' 
            onChange={handleChange} 
            disabled={ isInputDisabled ? 'disabled' : ''}
            required
          ></input>
          <button type='submit'
                  className='button-style__reset main__form_submit-button'
                  disabled={isInputDisabled}
          >Искать</button>
        </form>
      </section>

    </main>

  );
}