import SeatsMap from './SeatsMap';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { serviceItemSelect, setTotalPrice } from '../Redux/seats';
import Price from './Price';

export default function Coach({ coach, seatsList }) {
    const { services } = useSelector((state) => state.seats);
    const { totalPrice } = useSelector((state) => state.seats);
    const dispatch = useDispatch();
    const handleClick = (propertyToChange) => {
        const id = coach._id;
        dispatch(serviceItemSelect({ id, propertyToChange }));
    };

        const { getTotalPrice } = Price()
        useEffect(() => {
            const propertyToChange = 'total';
            const value = getTotalPrice();
            dispatch(setTotalPrice({ value, propertyToChange }));
          }, [services, dispatch, getTotalPrice]); 

    return (
        <div className="main-selectSeats-carriage-item">

            <div className="main-selectSeats-carriage-info">
                <div className="main-selectSeats-carriage-info-number">
                    <div className="main-selectSeats-carriage-info-number-value">{coach.name}
                    </div>
                    <div className="main-selectSeats-carriage-info-number-coach">вагон
                    </div>
                </div>

                <div className="main-selectSeats-carriage-info-contant">
                    <div className="main-selectSeats-carriage-info-col1">
                        <div className="main-selectSeats-carriage-info-amount-total">
                            <div className="main-selectSeats-carriage-info-amount-total-title">Места
                            </div>
                            <div className="main-selectSeats-carriage-info-amount-total-value">{coach.available_seats}
                            </div>
                        </div>
                        {(coach.class_type === 'second' || coach.class_type === 'third') && (
                            <>
                                <div className="main-selectSeats-carriage-info-amount">
                                    <div className="main-selectSeats-carriage-info-amount-title">Верхние
                                    </div>
                                    <div className="main-selectSeats-carriage-info-amount-value">
                                        {coach.class_type === 'second' &&
                                            seatsList.filter((el) => el.index % 2 === 0)
                                                .length}
                                        {coach.class_type === 'third' &&
                                            seatsList.filter(
                                                (el) => el.index % 2 === 0 && el.index < 33
                                            ).length}
                                    </div>
                                </div>
                                <div className="main-selectSeats-carriage-info-amount">
                                    <div className="main-selectSeats-carriage-info-amount-title">Нижние
                                    </div>
                                    <div className="main-selectSeats-carriage-info-amount-value">
                                        {coach.class_type === 'second' &&
                                            seatsList.filter((el) => el.index % 2 !== 0)
                                                .length}
                                        {coach.class_type === 'third' &&
                                            seatsList.filter(
                                                (el) => el.index % 2 !== 0 && el.index < 33
                                            ).length}
                                    </div>
                                </div>
                            </>
                        )}

                        {coach.class_type === 'third' && (
                            <div className="main-selectSeats-carriage-info-amount">
                                <div className="main-selectSeats-carriage-info-amount-title">Боковые
                                </div>
                                <div className="main-selectSeats-carriage-info-amount-value">
                                    {seatsList.filter((el) => el.index > 32).length}
                                </div>
                            </div>

                        )}
                    </div>

                    <div className="main-selectSeats-carriage-info-col2">
                        <div className="main-selectSeats-carriage-info-prices-title">Стоимость
                        </div>
                        {(coach.class_type === 'second' || coach.class_type === 'third') && (
                            <div className="main-selectSeats-carriage-info-prices">
                                <div className="main-selectSeats-carriage-info-prices-value">{coach.top_price.toLocaleString().replace(/,/g, ' ')}
                                </div>
                                <div className="main-selectSeats-carriage-info-prices-image">
                                </div>
                            </div>
                        )}
                        {(coach.class_type === 'second' || coach.class_type === 'third') && (
                            <div className="main-selectSeats-carriage-info-prices">
                                <div className="main-selectSeats-carriage-info-prices-value">{coach.bottom_price.toLocaleString().replace(/,/g, ' ')}
                                </div>
                                <div className="main-selectSeats-carriage-info-prices-image">
                                </div>
                            </div>
                        )}
                        {coach.class_type === 'third' && (
                            <div className="main-selectSeats-carriage-info-prices">
                                <div className="main-selectSeats-carriage-info-prices-value">{coach.side_price.toLocaleString().replace(/,/g, ' ')}
                                </div>
                                <div className="main-selectSeats-carriage-info-prices-image">
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="main-selectSeats-carriage-info-col3">
                        <div className="main-selectSeats-carriage-info-service"> Обслуживание ФПК
                        </div>
                        <div className="main-selectSeats-carriage-info-service-images">
                            {coach.have_air_conditioning && (<div className={"main-selectSeats-carriage-info-service-image1" + (coach.have_air_conditioning ? "Active" : "")}>
                            </div>)}
                            {coach.have_wifi && (<div className={"main-selectSeats-carriage-info-service-image2" + (services[coach._id].wifi ? "Active" : "")}
                                onClick={() => handleClick('wifi')}>
                            </div>)}
                            <div className={"main-selectSeats-carriage-info-service-image3" + ((services[coach._id].linen || coach.is_linens_included) ? "Active" : "")}
                                disabled={coach.is_linens_included}
                                onClick={() => handleClick('linen')}>
                            </div>
                            <div className={"main-selectSeats-carriage-info-service-image4" + (services[coach._id].meal ? "Active" : "")}
                                onClick={() => handleClick('meal')}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SeatsMap
                coachid={coach._id}
                seatsList={seatsList}
                seatsType={coach.class_type}
            />

            {totalPrice.total > 0 && (
                <div className="main-selectSeats-carriage-totalPrice">
                    <div className="main-selectSeats-carriage-totalPrice-value">
                        {totalPrice.total.toLocaleString()}
                    </div>

                    <div className="main-selectSeats-carriage-totalPrice-image">
                    </div>
                </div>)
            }
        </div>
    )
}