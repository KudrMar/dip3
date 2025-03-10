import { useNavigate } from 'react-router';
import { fetchSeats, trainAdd } from '../Redux/seats';
import { useDispatch } from 'react-redux';
const ResultSearchTickets = ({ train }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let fromDateTime = train.departure.from.datetime;
    let toDateTime = train.departure.to.datetime;
    let duration = train.departure.duration;

    // let fromDateTimeAr = 0;
    // let toDateTimeAr = 0;
    // let durationAr = 0;

    // if (train.arrival) {
    //     fromDateTimeAr = train.arrival.from.datetime;
    //     toDateTimeAr = train.arrival.to.datetime;
    //     durationAr = train.arrival.duration;
    // }

    const getHours = (msc) => new Date(msc).getHours();
    const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();

    const setTrainEvent = (event) => {
        event.preventDefault();
        dispatch(trainAdd(train));
        dispatch(fetchSeats());
        navigate('/seats');
    };

    return (
        <div className="result-search-tickets">
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
                {/* {train.arrival &&
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
                } */}
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
                        <button className="result-search-tickets-route-button-choseTrain"
                            type="button"
                            onClick={setTrainEvent}
                        >Выбрать места
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultSearchTickets;