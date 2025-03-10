import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
   const navigate = useNavigate();
   const handleNavigate = (hash) => {
      navigate("/"); 
    };
   return (
      <div id="headerLogo" className="header">
         <header className="header-container">
            <div className="header-logo">
               <NavLink className="header-logo-image" to="/" id="header-logo-image">Лого</NavLink>
            </div>
            <div className="header-logo-navbar">
               <div className="header-logo-navbar-list">
                  <a className="header-logo-navbar-item" href="#about" onClick={(e) => handleNavigate(e, 'about')}>О нас</a>
                  <a className="header-logo-navbar-item" href="#howItWorks" onClick={(e) => handleNavigate(e, 'howItWorks')}>Как это работает</a>
                  <a className="header-logo-navbar-item" href="#feedbacks" onClick={(e) => handleNavigate(e, 'feedbacks')}>Отзывы</a>
                  <a className="header-logo-navbar-item" href="#footer" onClick={(e) => handleNavigate(e, 'footer')}>Контакты</a>
               </div>
            </div>
         </header>
      </div>
   );
}


// navigate('/seats#section-2');