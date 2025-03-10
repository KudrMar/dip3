import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchSubscribe } from '../Redux/subscribe';
export default function Footer() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      };


    const handleSubmit = () => {
        if (!validateEmail(email)) {
          alert('Пожалуйста, введите email');
          return;
        }
    
        dispatch(fetchSubscribe(email));
      };


    return (
        <section id="footer" className="footer">

            <div className="footer-contacts">
                <div className="footer-contacts-left">
                    <div className="footer-contacts-title footer-contacts-title-head">Свяжитесь с нами</div>
                    <ul className="footer-contacts-list">
                        <div className="footer-contact">
                            <div className="footer-contact-icon footer-contact-icon-phone"></div>
                            <p className="footer-contact-text">8(800)000 00 00</p>
                        </div>
                        <div className="footer-contact">
                            <div className="footer-contact-icon footer-contact-icon-mail"></div>
                            <p className="footer-contact-text">inbox@mail.ru</p>
                        </div>
                        <div className="footer-contact">
                            <div className="footer-contact-icon footer-contact-icon-skype"></div>
                            <p className="footer-contact-text">tu.train.tickets</p>
                        </div>
                        <div className="footer-contact">
                            <div className="footer-contact-icon footer-contact-icon-location"></div>
                            <p className="footer-contact-text">
                                г. Москва ул. Московская 27-35 555 555
                            </p>
                        </div>
                    </ul>
                </div>

                <div className="footer-subscribe-right">
                    <div className="footer-subscribe-title footer-contacts-title-head">Подписка</div>
                    <form className="footer-subscribe-form">

                        <div>Будьте в курсе событий</div>
                        <div className="footer-subscribe-contener">
                            <input className="footer-subscribe-input" 
                            placeholder="e-mail"
                            type="email" 
                            id="footer-subscription"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="button" className="footer-subscribe-button"
                                id="footer-subscribe-button"   onClick={handleSubmit}>ОТПРАВИТЬ</button>
                        </div>
                    </form>
                    <h4 className="footer-subscribe-social-title footer-contacts-title-head">Подписывайся на нас</h4>
                    <div className="footer-subscribe-socials">
                        <div className="footer-subscribe-social footer-subscribe-social-youtube">
                            <a href="https://www.youtube.com" className="footer-subscribe-social-link" aria-label="Subscribe YouTube"> <i className="icon-subscribe" /> </a>
                        </div>
                        <div className="footer-subscribe-social footer-subscribe-social-in">
                            <a href="https://www.linkedin.com" className="footer-subscribe-social-link" aria-label="Subscribe linkedin"> <i className="icon-subscribe" /> </a>
                        </div>
                        <div className="footer-subscribe-social footer-subscribe-social-google">
                            <a href="https://www.google.com" className="footer-subscribe-social-link" aria-label="Subscribe google"> <i className="icon-subscribe" /> </a>
                        </div>
                        <div className="footer-subscribe-social footer-subscribe-social-facebook">
                            <a href="https://www.facebook.com" className="footer-subscribe-social-link" aria-label="Subscribe facebook"> <i className="icon-subscribe" /> </a>
                        </div>
                        <div className="footer-subscribe-social footer-subscribe-social-twitter">
                            <a href="https://twitter.com" className="footer-subscribe-social-link" aria-label="Subscribe twitter"> <i className="icon-subscribe" /> </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-bottom-logo">Лого</div>
                <a className="footer-bottom-up" href="#headerLogo" aria-label="logo"></a>
                <div className="footer-bottom-copyright">2018 WEB</div>
            </div>
        </section>
    );
}