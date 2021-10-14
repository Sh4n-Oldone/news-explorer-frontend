import React from 'react';
import './Footer.css';
import githubIcon from '../../images/github.png';
import linkedinIcon from '../../images/LI-In-Bug.png';

export default function Footer() {

  return (

    <footer className='footer'>
      <p className='footer__copyright'>&#169; 2020 Pavlov's NewsExplorer, Powered by News API</p>
      <div className='footer__links_wrapper'>
        <ul className='footer__links'>
          <li className='footer__links_item'>
            <a
              className='footer__links_link' 
              href='https://alpavlov.students.nomoreparties.space/' 
            >Главная</a>
          </li>
          <li className='footer__links_item'>
            <a
              className='footer__links_link'
              href='https://www.linkedin.com/feed/update/urn:li:activity:6846447949069774848/' 
              target='_blank' 
              rel="noreferrer"
            >Сопроводительное</a>
          </li>
        </ul>
        <a
          href='https://github.com/Sh4n-Oldone' 
          target='_blank' 
          rel="noreferrer"
        >
          <img 
            src={githubIcon} 
            className='footer__link footer__link_github' 
            alt='github' 
          />
        </a>
        <a
          href='https://www.linkedin.com/in/pavlov-alex/' 
          target='_blank' 
          rel="noreferrer"
        >
          <img 
            src={linkedinIcon} 
            className='footer__link footer__link_linkedin' 
            alt='linkedin' 
          />
        </a>
      </div>
      <p className='footer__copyright footer__copyright_small'>&#169; 2020 Pavlov's NewsExplorer, Powered by News API</p>
    </footer>

  );
}
