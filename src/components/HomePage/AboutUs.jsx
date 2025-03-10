import React from 'react';

export default function About() {
  return (
    <section id="about" className="about" >
      <div className="about-title">О НАС</div>
      
      <div className="about-box">
        <p className="about-content">
          Мы рады видеть Вас! Мы работаем для Вас с 2003года. 14 лет мы
          наблюдаем как с каждым днем всё больше людей заказывают жд билеты
          через интернет.
        </p>
        <p className="about-content">
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика,
          но стоит ли это делать? Мы расскажем о преимуществах заказа через
          интернет.
        </p>
        <p className="about-content about-content-bold">
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.
          Благодаря динамическому ценообразованию цена на билеты в это время
          самая низкая.
        </p>
      </div>
    </section>
  );
};

