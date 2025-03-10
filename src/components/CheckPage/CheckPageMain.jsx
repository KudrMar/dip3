import { fetchOrder } from '../Redux/order';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CheckPageMain() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClickNextPage = (event) => {
        event.preventDefault();
        dispatch(fetchOrder());
        navigate('/success');
    };

    // const { services } = useSelector((state) => state.seats);

    const train = useSelector((state) => state.seats.train);
    const { passengers, user } = useSelector((state) => state.passengers);
    const { totalPrice } = useSelector((state) => state.seats);
    let fromDateTime = train.departure.from.datetime;
    let toDateTime = train.departure.to.datetime;
    let duration = train.departure.duration;

    let fromDateTimeAr = 0;
    let toDateTimeAr = 0;
    let durationAr = 0;

    if (train.arrival) {
        fromDateTimeAr = train.arrival.from.datetime;
        toDateTimeAr = train.arrival.to.datetime;
        durationAr = train.arrival.duration;
    }

    const getHours = (msc) => new Date(msc).getHours();
    const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();

    const setTrainEvent = (event) => {
        event.preventDefault();
        navigate('/trains');
    };

    const setTrainPassengers = (event) => {
        event.preventDefault();
        navigate('/passengers');
    };

    const setTrainPayment = (event) => {
        event.preventDefault();
        navigate('/payment');
    };

    return (
        <div className="main-SelectPassengersMain">
            <div className="main-checkPage-top">
                <div className="main-SelectPassengersMain-passengerCard-top-text">Поезд</div>
            </div>

            <div className="result-search-tickets cssPaddingTop0">
                <div className="result-search-tickets-number">
                    <div className="result-search-tickets-number-image-border" >
                        <div className="result-search-tickets-number-image" />
                    </div>
                    <div className="result-search-tickets-number-text">{train.departure.train.name}</div>
                    <div className="result-search-tickets-number-train-contain">
                        <p className="result-search-tickets-number-train">{train.departure.from.city.name}</p>
                        <div className="result-search-tickets-number-train-arrow" />
                    </div>
                    <div className="result-search-tickets-number-train-contain">
                        <p className="result-search-tickets-number-train">{train.departure.to.city.name}</p>
                    </div>
                    <p className="result-search-tickets-number-train3"></p>
                </div>
                <div className="result-search-tickets-route-time">
                    <div className="result-search-tickets-route-time-to">
                        <div className="result-search-tickets-route-time-to-left">
                            <div className="result-search-tickets-route-time-to-time">{getHours(fromDateTime)}:{getMinutes(fromDateTime)}</div>
                            <p className="result-search-tickets-route-time-to-city">{train.departure.from.city.name}</p>
                            <p className="result-search-tickets-route-time-to-station"></p>
                        </div>
                        <div className="result-search-tickets-route-time-to-mid">
                            <p className="result-search-tickets-route-time-to-duration">{getHours(duration)}:{getMinutes(duration)}</p>
                            <div className="result-search-tickets-arrowRight" />
                        </div>
                        <div className="result-search-tickets-route-time-to-right">
                            <div className="result-search-tickets-route-time-to-time">{getHours(toDateTime)}:{getMinutes(toDateTime)}</div>
                            <p className="result-search-tickets-route-time-to-city">{train.departure.to.city.name}</p>
                            <p className="result-search-tickets-route-time-to-station"></p>
                        </div>
                    </div>
                    {train.arrival &&
                        <div className="result-search-tickets-route-time-to">
                            <div className="result-search-tickets-route-time-to-left">
                                <div className="result-search-tickets-route-time-to-time">{getHours(fromDateTimeAr)}:{getMinutes(fromDateTimeAr)}</div>
                                <p className="result-search-tickets-route-time-to-city">{train.arrival.from.city.name}</p>
                                <p className="result-search-tickets-route-time-to-station"></p>
                            </div>
                            <div className="result-search-tickets-route-time-to-mid">
                                <p className="result-search-tickets-route-time-to-duration">{getHours(durationAr)}:{getMinutes(durationAr)}</p>
                                <div className="result-search-tickets-arrowLeft" />
                            </div>
                            <div className="result-search-tickets-route-time-to-right">
                                <div className="result-search-tickets-route-time-to-time">{getHours(toDateTimeAr)}:{getMinutes(toDateTimeAr)}</div>
                                <p className="result-search-tickets-route-time-to-city">{train.arrival.to.city.name}</p>
                                <p className="result-search-tickets-route-time-to-station"></p>
                            </div>
                        </div>
                    }
                </div>
                <div className="result-search-tickets-route-minPrices">

                    <div className="result-search-tickets-route-minPrices-block">
                        <div className="result-search-tickets-route-minPrices-item">
                            {train.departure.have_fourth_class &&
                                <div className="result-search-tickets-route-minPrices-item">
                                    <div className="result-search-tickets-route-minPrices-item-name">Сидячий</div>
                                    <div className="result-search-tickets-route-minPrices-item-seats">{train.available_seats_info.fourth}</div>
                                    <div className="result-search-tickets-route-minPrices-item-ot">от</div>
                                    <div className="result-search-tickets-route-minPrices-item-price">{train.departure.price_info.fourth.top_price.toLocaleString()}</div>
                                    <div className="result-search-tickets-route-minPrices-item-rubImage" />
                                </div>
                            }
                        </div>
                        <div className="result-search-tickets-route-minPrices-item">
                            {train.departure.have_third_class &&
                                <div className="result-search-tickets-route-minPrices-item">
                                    <div className="result-search-tickets-route-minPrices-item-name">Плацкарт</div>
                                    <div className="result-search-tickets-route-minPrices-item-seats">{train.available_seats_info.third}</div>
                                    <div className="result-search-tickets-route-minPrices-item-ot">от</div>
                                    <div className="result-search-tickets-route-minPrices-item-price">{train.departure.price_info.third.top_price.toLocaleString()}</div>
                                    <div className="result-search-tickets-route-minPrices-item-rubImage" />
                                </div>
                            }
                        </div>
                        <div className="result-search-tickets-route-minPrices-item">
                            {train.departure.have_second_class &&
                                <div className="result-search-tickets-route-minPrices-item">
                                    <div className="result-search-tickets-route-minPrices-item-name">Купе</div>
                                    <div className="result-search-tickets-route-minPrices-item-seats">{train.available_seats_info.second}</div>
                                    <div className="result-search-tickets-route-minPrices-item-ot">от</div>
                                    <div className="result-search-tickets-route-minPrices-item-price">{train.departure.price_info.second.top_price.toLocaleString()}</div>
                                    <div className="result-search-tickets-route-minPrices-item-rubImage" />
                                </div>
                            }
                        </div>
                        <div className="result-search-tickets-route-minPrices-item">
                            {train.departure.have_first_class &&
                                <div className="result-search-tickets-route-minPrices-item">
                                    <div className="result-search-tickets-route-minPrices-item-name">Люкс</div>
                                    <div className="result-search-tickets-route-minPrices-item-seats">{train.available_seats_info.first}</div>
                                    <div className="result-search-tickets-route-minPrices-item-ot">от</div>
                                    <div className="result-search-tickets-route-minPrices-item-price">{train.departure.price_info.first.top_price.toLocaleString()}</div>
                                    <div className="result-search-tickets-route-minPrices-item-rubImage" />
                                </div>
                            }
                        </div>
                    </div>

                    <div className="result-search-tickets-route-minPrices-bottom">
                        <div className="result-search-tickets-route-images">
                            <div className="result-search-tickets-route-image-wifi result-search-tickets-route-image" />
                            <div className="result-search-tickets-route-image-rocket result-search-tickets-route-image" />
                            <div className="result-search-tickets-route-image-cup result-search-tickets-route-image" />
                        </div>
                        <div className="result-search-tickets-route-button-container">
                            <button className="button-change"
                                type="button"
                                onClick={setTrainEvent}
                            >Изменить
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="main-checkPage-top cssMarginTop45">
                <div className="main-SelectPassengersMain-passengerCard-top-text">Пассажиры</div>
            </div>
            <div className="main-checkPage-passenger">
                <div className="main-checkPage-passenger-left">
                    {passengers.map((passenger, index) => (
                        <div className="main-checkPage-passenger-list" key={index}>
                            <div className="main-checkPage-passenger-icon">
                                <div className="main-checkPage-passenger-pic"></div>
                                <div className="main-checkPage-passenger-text">{passenger.is_adult === "true" ? "Взрослый" : "Детский"}</div>
                            </div>
                            <div className="main-checkPage-passenger-passenger">
                                <div className="main-checkPage-passenger-name">{passenger.last_name + " " + passenger.first_name + " " + passenger.patronymic}</div>
                                <div className="main-checkPage-passenger-info">Пол {passenger.gender ? " мужской" : " женский"}</div>
                                <div className="main-checkPage-passenger-info">Дата рождения {passenger.birthday}</div>
                                <div className="main-checkPage-passenger-info">{passenger.is_adult !== "true" ? "Свидетельство о рождении " + passenger.document_data_n : "Паспорт РФ " + passenger.document_data_s + " " + passenger.document_data_n}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="main-checkPage-passenger-right">
                    <div className="main-checkPage-passenger-price-container">
                        <div className="main-checkPage-passenger-textRub">Всего</div>
                        <div className="main-checkPage-passenger-price">{totalPrice.total.toLocaleString()}</div>
                        <div className="result-search-tickets-route-minPrices-item-rubImage"></div>
                    </div>
                    <div className="result-search-tickets-route-button-container">
                        <button className="button-change"
                            type="button"
                            onClick={setTrainPassengers}
                        >Изменить
                        </button>
                    </div>
                </div>
            </div>


            <div className="main-checkPage-top cssMarginTop45">
                <div className="main-SelectPassengersMain-passengerCard-top-text">Способ оплаты</div>
            </div>
            <div className="main-checkPage-passenger cssPaddingTop45">
                <div className="main-checkPage-PaymentType-left">
                    <div className="main-checkPage-PaymentType-text">{user.payment_method === "online" ? "Онлайн" : "Наличные"}</div>
                </div>
                <div className="main-checkPage-passenger-right">

                    <div className="result-search-tickets-route-button-container">
                        <button className="button-change"
                            type="button"
                            onClick={setTrainPayment}
                        >Изменить
                        </button>
                    </div>
                </div>
            </div>



            <div className="main-selectSeats-nextPage-container">
                <button type="button" className="main-selectSeats-nextPage-container-button"
                    onClick={handleClickNextPage}
                >
                    ПОДТВЕРДИТЬ
                </button>
            </div>
        </div >
    );
}