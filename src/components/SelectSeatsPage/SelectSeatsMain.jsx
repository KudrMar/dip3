import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
//import InputMask from 'react-input-mask';
import { InputMask } from '@react-input/mask';
import Coach from './Coach';

import {
    coachClassChange,
    coachItemsSelect,
    coachItemsUnSelect,
    coachItemsClear,
    seatsCountChange
} from '../Redux/seats';

import {passengersAddEmpty, passengersClear} from '../Redux/passengers';

export default function SelectSeatsMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const train = useSelector((state) => state.seats.train);
    const { coachList, coachClass, coachItems, seatsCount, seats} = useSelector(
        (state) => state.seats
    );

    const handleBack = () => {
        dispatch(coachItemsClear({}));
        navigate('/trains');
    };

    let fromDateTime = train.departure.from.datetime;
    let toDateTime = train.departure.to.datetime;
    let duration = train.departure.duration;

    const getHours = (msc) => new Date(msc).getHours();
    const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();

    const getHoursText = (hours) => {
        const lastDigit = hours % 10;
        const lastTwoDigits = hours % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'часов';
        }
        if (lastDigit === 1) {
            return 'час';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'часа';
        }
        return 'часов';
    };

    const getMinutesText = (minutes) => {
        const lastDigit = minutes % 10;
        const lastTwoDigits = minutes % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'минут';
        }
        if (lastDigit === 1) {
            return 'минута';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'минуты';
        }
        return 'минут';
    };

    const [adultsCount, setAdultsCount] = useState(seatsCount.adult);
    const [labelTextAdult, setlabelTextAdult] = useState("");

    const limitlabelTextAdult = 5;

    const handleInputChangeAdult = (e) => {
        const inputValue = e.target.value.replace('Взрослых — ', '');
        const value = parseInt(inputValue, 10);

        if (!isNaN(value)) {
            let correctedValue = value;

            if (value < 0) {
                correctedValue = 0;
            } else if (value > limitlabelTextAdult) {
                correctedValue = limitlabelTextAdult;
            }

            const remainingSeats = limitlabelTextAdult - correctedValue;

            setAdultsCount(correctedValue);
            setlabelTextAdult(
                remainingSeats !== limitlabelTextAdult
                    ? `Можно добавить еще ${remainingSeats}  ${remainingSeats > 1 ? 'пассажиров' : 'пассажира'} `
                    : ''
            );
            dispatch(seatsCountChange({ propertyToChange: 'adult', value: correctedValue }));
        }
    };

    const [childCount, setChildCount] = useState(seatsCount.child);
    const [labelTextChild, setlabelTextChild] = useState("");

    const limitlabelTextChild = 4;

    const handleInputChangeChild = (e) => {
        const inputValue = e.target.value.replace('Детских — ', '');
        const value = parseInt(inputValue, 10);

        if (!isNaN(value)) {
            let correctedValue = value;

            if (value < 0) {
                correctedValue = 0;
            } else if (value > Math.min(limitlabelTextChild, seatsCount.adult * 2)) {
                correctedValue = Math.min(limitlabelTextChild, seatsCount.adult * 2);
            }

            const remainingSeats = limitlabelTextChild - correctedValue;

            setChildCount(correctedValue);
            setlabelTextChild(
                remainingSeats !== limitlabelTextChild
                    ? `Можно добавить еще ${remainingSeats}  ${remainingSeats > 1 ? 'детей' : 'ребенка'} до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%`
                    : ''
            );
            dispatch(seatsCountChange({ propertyToChange: 'child', value: correctedValue }));
        }
    };

    const [babyCount, setBabyCount] = useState(seatsCount.baby);


    const handleInputChangeBaby = (e) => {
        const inputValue = e.target.value.replace('Детских «без места» — ', '');
        const value = parseInt(inputValue, 10);

        if (!isNaN(value)) {
            setBabyCount(value);
        }
        dispatch(seatsCountChange({ propertyToChange: 'baby', value: value }));
    };

    const handleClickType = (classType) => {
        dispatch(coachClassChange({ coachClass: classType }));
        dispatch(coachItemsClear());
    };

    const handleCoachClick = (id) => {
        if (coachItems.includes(id)) {
            dispatch(coachItemsUnSelect({ id }));
        } else {
            dispatch(coachItemsSelect({ id }));
        }
    };

    const handleClickNextPage = (event) => {
        event.preventDefault();
        dispatch(passengersClear());
        Array.from({ length: seatsCount.adult + seatsCount.child  + seatsCount.baby}).forEach((_, i) => (
            dispatch(passengersAddEmpty({ id: i, adultcount: seatsCount.adult}))
        ))
        if (allCorrect) {navigate('/passengers');}
        //navigate('/passengers');
    };

    const countSeats = () => {
        let totalElements = 0;
      
        for (const key in seats) {
          if (seats.hasOwnProperty(key)) {
            const array = seats[key];
            if (Array.isArray(array)) {
              totalElements += array.length;
            } 
            
          }
        }
      
        return totalElements;
      }

    const allCorrect = countSeats() === seatsCount.adult + seatsCount.child;

    return (
        <div className="main-selectSeats">
            <div className="main-selectSeats-title">ВЫБОР МЕСТА</div>

            <div className="main-selectSeats-contaniner">
                <div className="main-selectSeats-departure">
                    <div className="main-selectSeats-departure-back-image"></div>
                    <div className="main-selectSeats-departure-back-but" type="button" onClick={handleBack}>Выбрать другой поезд</div>
                </div>
                <div className="main-selectSeats-departure-trainInfo">
                    <div className="main-selectSeats-departure-image-border" >
                        <div className="main-selectSeats-departure-image" />
                    </div>
                    <div className="main-selectSeats-departure-number-seats">
                        <div className="result-search-tickets-number-text-seats">{train.departure.train.name}</div>
                        <div className="result-search-tickets-number-train-contain">
                            <p className="result-search-tickets-number-train">{train.departure.from.city.name}</p>
                            <div className="result-search-tickets-number-train-arrow" />
                        </div>
                        <div className="result-search-tickets-number-train-contain">
                            <p className="result-search-tickets-number-train">{train.departure.to.city.name}</p>
                        </div>
                        <p className="result-search-tickets-number-train3"></p>
                    </div>
                    <div className="result-search-tickets-route-time-seats">
                        <div className="result-search-tickets-route-time-to-seats">
                            <div className="result-search-tickets-route-time-to-left">
                                <div className="result-search-tickets-route-time-to-time">{getHours(fromDateTime)}:{getMinutes(fromDateTime)}</div>
                                <p className="result-search-tickets-route-time-to-city">{train.departure.from.city.name}</p>
                                <p className="result-search-tickets-route-time-to-station"></p>
                            </div>
                            <div className="result-search-tickets-route-time-to-mid">
                                <div className="result-search-tickets-arrowRight" />
                            </div>
                            <div className="result-search-tickets-route-time-to-right">
                                <div className="result-search-tickets-route-time-to-time">{getHours(toDateTime)}:{getMinutes(toDateTime)}</div>
                                <p className="result-search-tickets-route-time-to-city">{train.departure.to.city.name}</p>
                                <p className="result-search-tickets-route-time-to-station"></p>
                            </div>
                        </div>
                    </div>
                    <div className="main-selectSeats-departure-duration">
                        <div className="main-selectSeats-departure-duration-image" />
                        <div className="result-search-tickets-route-time-to-right">
                            <div className="result-search-tickets-route-time-to-time">{getHours(duration)} {getHoursText(getHours(duration))}</div>
                            <div className="result-search-tickets-route-time-to-city">{getMinutes(duration)} {getMinutesText(getMinutes(duration))}</div>
                        </div>
                    </div>
                </div>
                {/*<div className="result-search-tickets-route-time">
                        <div className="result-search-tickets-route-time-to">
                            <div className="result-search-tickets-route-time-to-left">
                                <div className="result-search-tickets-route-time-to-time"></div>
                                <p className="result-search-tickets-route-time-to-city"></p>
                                <p className="result-search-tickets-route-time-to-station"></p>
                            </div>
                            <div className="result-search-tickets-route-time-to-mid">
                                <p className="result-search-tickets-route-time-to-duration"></p>
                                <div className="result-search-tickets-arrowRight" />
                            </div>
                            <div className="result-search-tickets-route-time-to-right">
                                <div className="result-search-tickets-route-time-to-time"></div>
                                <p className="result-search-tickets-route-time-to-city"></p>
                                <p className="result-search-tickets-route-time-to-station"></p>
                            </div>
                        </div>

                    </div> */}



                <div className="main-selectSeats-ticketsAmount"> Количество билетов</div>

                <div className="main-selectSeats-ticketType">
                    <div className="main-selectSeats-ticketType-adult main-selectSeats-ticketType-third">
                        <InputMask
                            mask="Взрослых — _"
                            replacement={{ _: /\d/ }}
                            value={`Взрослых — ${adultsCount}`}
                            onChange={handleInputChangeAdult}
                            className="main-selectSeats-ticketType-input"
                        />
                        <div className="main-selectSeats-ticketType-text">{labelTextAdult}
                        </div>
                    </div>
                    <div className="main-selectSeats-ticketType-child main-selectSeats-ticketType-third">
                        <InputMask
                            mask="Детских — _"
                            replacement={{ _: /\d/ }}
                            value={`Детских — ${childCount}`}
                            onChange={handleInputChangeChild}
                            className="main-selectSeats-ticketType-input"
                        />
                        <div className="main-selectSeats-ticketType-text">{labelTextChild}

                        </div>
                    </div>
                    <div className="main-selectSeats-ticketType-baby main-selectSeats-ticketType-third">
                        <InputMask
                            mask="Детских «без места» — _"
                            replacement={{ _: /\d/ }}
                            value={`Детских «без места» — ${babyCount}`}
                            onChange={handleInputChangeBaby}
                            className="main-selectSeats-ticketType-input"
                        />
                    </div>
                </div>

                <div className="main-selectSeats-carriage">
                    <div className="main-selectSeats-carriage-title">Тип вагона
                    </div>
                    <div className="main-selectSeats-carriage-types">
                        <div className="main-selectSeats-carriage-types-fourth">
                            <div className={"main-selectSeats-carriage-types-image main-selectSeats-carriage-types-image4" + (coachClass === "fourth" ? "Active" : "")} onClick={() => handleClickType('fourth')}>
                            </div>
                            <div className={"main-selectSeats-carriage-types-text" + (coachClass === "fourth" ? "Active" : "")}>Сидячий
                            </div>
                        </div>
                        <div className="main-selectSeats-carriage-types-fourth">
                            <div className={"main-selectSeats-carriage-types-image main-selectSeats-carriage-types-image3" + (coachClass === "third" ? "Active" : "")} onClick={() => handleClickType('third')}>
                            </div>
                            <div className={"main-selectSeats-carriage-types-text" + (coachClass === "third" ? "Active" : "")}>Плацкарт
                            </div>
                        </div>
                        <div className="main-selectSeats-carriage-types-fourth">
                            <div className={"main-selectSeats-carriage-types-image main-selectSeats-carriage-types-image2" + (coachClass === "second" ? "Active" : "")} onClick={() => handleClickType('second')}>
                            </div>
                            <div className={"main-selectSeats-carriage-types-text" + (coachClass === "second" ? "Active" : "")}>Купе
                            </div>
                        </div>
                        <div className="main-selectSeats-carriage-types-fourth">
                            <div className={"main-selectSeats-carriage-types-image main-selectSeats-carriage-types-image1" + (coachClass === "first" ? "Active" : "")} onClick={() => handleClickType('first')}>
                            </div>
                            <div className={"main-selectSeats-carriage-types-text" + (coachClass === "first" ? "Active" : "")}>Люкс
                            </div>

                        </div>
                    </div>
                </div>

                {coachList.filter((el) => el.coach.class_type === coachClass).length > 0 && (

                    <div className="main-selectSeats-carriage-top">

                        <div className="main-selectSeats-carriage-top-list">
                            <div className="main-selectSeats-carriage-top-carriages">Вагоны</div>
                            {coachList
                                .filter((el) => el.coach.class_type === coachClass)
                                .map((el) => (
                                    <div className={"main-selectSeats-carriage-top-carriages-number" + (coachItems.includes(el.coach._id) ? "Active" : "")}
                                        key={el.coach._id}
                                        onClick={() => handleCoachClick(el.coach._id)}
                                    >
                                        {el.coach.name}
                                    </div>
                                ))}
                        </div>
                        <div className="main-selectSeats-carriage-top-info">
                            Нумерация вагонов начинается с головы поезда
                        </div>


                    </div>
                )}

                {coachList
                    .filter(
                        (el) =>
                            el.coach.class_type === coachClass &&
                            coachItems.includes(el.coach._id)
                    )
                    .map((el) => (
                        <Coach
                            key={el.coach._id}
                            coach={el.coach}
                            seatsList={el.seats}
                        />
                    ))
                }

            </div>
            
            <div className="main-selectSeats-nextPage-container">
                    <button type="button" className={"main-selectSeats-nextPage-container-button" + (allCorrect ? "" : "incorrect")}
                         onClick={handleClickNextPage}
                    >
                        ДАЛЕЕ
                    </button>
                </div>
        </div>
    );
}