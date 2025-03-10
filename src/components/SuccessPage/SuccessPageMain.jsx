import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import StarRate from '../SuccessPage/StarRate';

export default function SuccessPageMain() {
    const navigate = useNavigate();
    const { totalPrice } = useSelector((state) => state.seats);
    const {  user } = useSelector((state) => state.passengers);
    const handleClickNextPage = (event) => {
        event.preventDefault();
        navigate('/');
    };

    
    return (
        <div className="main-successPageMain">
            <div className="main-successPageMain-in">
                <div className="main-successPageMain-title">Благодарим Вас за заказ!
                </div >
                <div className="main-successPageMain-conteiner">
                    <div className="main-successPageMain-order">
                        <div className="main-successPageMain-order-left">№Заказа 285АА
                        </div >
                        <div className="main-successPageMain-order-right">
                            <div className="main-checkPage-passenger-price-container">
                                <div className="main-checkPage-passenger-textRub">сумма</div>
                                <div className="main-checkPage-passenger-price">{totalPrice.total.toLocaleString()}</div>
                                <div className="result-search-tickets-route-minPrices-item-rubImage"></div>
                            </div>
                        </div >
                    </div >
                    <div className="main-successPageMain-picInf">
                        <div className="main-successPageMain-picInf-third">
                            <div className="main-successPageMain-picInf-third-pic main-successPageMain-picInf-third-pic1">
                            </div >
                            <div className="main-successPageMain-picInf-third-text">билеты будут отправлены на ваш e-mail
                            </div >
                        </div >
                        <div className="main-successPageMain-picInf-third">
                            <div className="main-successPageMain-picInf-third-pic main-successPageMain-picInf-third-pic2">
                            </div >
                            <div className="main-successPageMain-picInf-third-text">распечатайте и сохраняйте билеты до даты поездки
                            </div >
                        </div >
                        <div className="main-successPageMain-picInf-third">
                            <div className="main-successPageMain-picInf-third-pic main-successPageMain-picInf-third-pic3">
                            </div >
                            <div className="main-successPageMain-picInf-third-text">предьявите распечатанные билеты при посадке
                            </div >
                        </div >
                    </div >

                    <div className="main-successPageMain-announcement">
                        <div className="main-successPageMain-announcement-name">{user.first_name + " " + user.patronymic}!
                        </div >
                        <div className="main-successPageMain-announcement-text">Ваш заказ успешно оформлен.
                        </div >
                        <div className="main-successPageMain-announcement-text">В ближайшее время с вами свяжется наш оператор для подтверждения.
                        </div >
                        <div className="main-successPageMain-announcement-textbold">Благодарим Вас за оказанное доверие и желаем приятного путешествия!
                        </div >
                    </div >
                    <div className="main-successPageMain-rate">
                        <div className="main-successPageMain-rate-left">
                            <div className="main-successPageMain-rate-text">Оценить сервис
                            </div >
                            <StarRate />
                            {/* <div className="main-successPageMain-rate-stars">
                                <div className="main-successPageMain-star-empty" data-value="1" key={1}/>
                                <div className="main-successPageMain-star-empty" data-value="2" key={2}/>
                                <div className="main-successPageMain-star-empty" data-value="3" key={3}/>
                                <div className="main-successPageMain-star-empty" data-value="4" key={4}/>
                                <div className="main-successPageMain-star-empty" data-value="5" key={5}/>
                                <StarRate />
                            </div > */}
                        </div >
                        <button type="button" className="main-successPageMain-nextPage-button"
                         onClick={handleClickNextPage}
                        >
                            ПОДТВЕРДИТЬ
                        </button>

                    </div >

                </div >

            </div >
        </div >
    );
}