import { seatsItemSelect, seatsItemUnSelect, setTotalPrice } from '../Redux/seats';
import { useSelector, useDispatch } from 'react-redux';
import Price from './Price';
import React, { useEffect } from 'react';

export default function SeatsMap({ coachid, seatsList, seatsType }) {

    const { seats, seatsCount, train } = useSelector((state) => state.seats);
    const dispatch = useDispatch();

    const getPrice = (seatIndex) => {
        let  priceParam = '';
        if (seatsType === 'first') {
            priceParam = 'bottom_price';

        } else if(seatsType === 'second') {
            if (seatIndex % 2 === 0) {
                priceParam = 'top_price'; 
            } else {
                priceParam = 'bottom_price';
            }

        } else if(seatsType === 'third') {
            if (seatIndex > 32) {
                priceParam = 'side_price';
            } else if (seatIndex % 2 === 0) {
                priceParam = 'top_price'; 
            } else {
                priceParam = 'bottom_price';
            }
        } else {
            priceParam = 'bottom_price';
        }
        
        return ( train.departure.price_info[seatsType][priceParam])
    }

  

    const handleClick = (seatIndex) => {
        const totalSeatsLength = Object.values(seats).reduce((sum, seatsArray) => sum + seatsArray.length, 0);
        if (seats[coachid] && seats[coachid].some(item => item.id === seatIndex)) {
            dispatch(seatsItemUnSelect({ id: coachid, seatIndex }));
        } else if (totalSeatsLength < seatsCount.adult + seatsCount.child) 
        {
            dispatch(seatsItemSelect({ id: coachid, seatIndex, price: getPrice(seatIndex) }));
        }
    };

    const renderButton = (seatIndex, className) => {
        const seatData = seatsList[seatIndex];
        return (
            <button
                type="button"
                key={seatIndex}
                className={`${className}${seatData.available ? "Available" : ""} ${seats[coachid].some(item => item.id === seatIndex) ? "seatChosen" : ""} `}
                disabled={!seatData.available}
                onClick={() => handleClick(seatIndex)}
            >
                {seatIndex + 1}
            </button>
        );
    };

    const { getTotalPrice } = Price()
    useEffect(() => {
        const propertyToChange = 'total';
        const value = getTotalPrice();
        dispatch(setTotalPrice({ value, propertyToChange }));
      }, [seats, dispatch, getTotalPrice]); 


    const seatSecond = () => {
        return (
            <div className="main-selectSeats-carriage-seatsmap-coupes">
                {seatsList.map((seat, index) => {

                    if ((index - 1) % 4 === 0) {
                        return (
                            <div key={index} className="main-selectSeats-carriage-seatsmap-coupe">
                                <div key={1} className="main-selectSeats-carriage-seatsmap-coupe-updown-left">
                                    {renderButton(index, "main-selectSeats-carriage-seatsmap-coupe-upleft main-selectSeats-carriage-seatsmap-coupe-seat")}
                                    {renderButton(index - 1, "main-selectSeats-carriage-seatsmap-coupe-downleft main-selectSeats-carriage-seatsmap-coupe-seat")}
                                </div>
                                <div key={2} className="main-selectSeats-carriage-seatsmap-coupe-updown-right">
                                    {renderButton(index + 2, "main-selectSeats-carriage-seatsmap-coupe-upright main-selectSeats-carriage-seatsmap-coupe-seat")}
                                    {renderButton(index + 1, "main-selectSeats-carriage-seatsmap-coupe-downright main-selectSeats-carriage-seatsmap-coupe-seat")}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )

    };

    const seatFirst = () => {
        return (
            <div className="main-selectSeats-carriage-seatsmap-coupes-lux">
                {seatsList.map((seat, index) => {
                    if ((index - 1) % 2 === 0) {
                        return (
                            <div key={index} className="main-selectSeats-carriage-seatsmap-coupe">
                                <div key={1} className="main-selectSeats-carriage-seatsmap-coupe-updown-left">
                                    {renderButton(index - 1, "main-selectSeats-carriage-seatsmap-coupe-downleft main-selectSeats-carriage-seatsmap-lux-seat")}
                                </div>
                                <div key={2} className="main-selectSeats-carriage-seatsmap-coupe-updown-right">
                                    {renderButton(index, "main-selectSeats-carriage-seatsmap-coupe-downright main-selectSeats-carriage-seatsmap-lux-seat")}
                                </div>
                               
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )
    };

    const seatSecondBottom = () => {
        return (
            <div className="main-selectSeats-carriage-seatsmap-bottoms-second">
            </div>
        )
    };

    const seatThird = () => {
        return (
            <div className="main-selectSeats-carriage-seatsmap-coupes">
                {seatsList.map((seat, index) => {
                    if (((index - 1) % 4 === 0) && (index < 32)) {
                        return (
                            <div key={index} className="main-selectSeats-carriage-seatsmap-coupe">
                                <div key={1} className="main-selectSeats-carriage-seatsmap-coupe-updown-left">
                                    {renderButton(index, "main-selectSeats-carriage-seatsmap-coupe-upleft main-selectSeats-carriage-seatsmap-coupe-seat")}
                                    {renderButton(index - 1, "main-selectSeats-carriage-seatsmap-coupe-downleft main-selectSeats-carriage-seatsmap-coupe-seat")}
                                </div>
                                <div key={2} className="main-selectSeats-carriage-seatsmap-coupe-updown-right">
                                    {renderButton(index + 2, "main-selectSeats-carriage-seatsmap-coupe-upright main-selectSeats-carriage-seatsmap-coupe-seat")}
                                    {renderButton(index + 1, "main-selectSeats-carriage-seatsmap-coupe-downright main-selectSeats-carriage-seatsmap-coupe-seat")}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )
    };

    const seatThirdBottom = () => {
        return (
            <div className="main-selectSeats-carriage-seatsmap-bottoms">
                {seatsList.map((seat, index) => {
                    if (((index - 1) % 2 === 0) && (index > 31)) {
                        return (
                            <div key={index} className="main-selectSeats-carriage-seatsmap-bottom-coupe">
                                {renderButton(index - 1, "main-selectSeats-carriage-seatsmap-placcart-seat-up  main-selectSeats-carriage-seatsmap-placcart-seat")}

                                {renderButton(index, "main-selectSeats-carriage-seatsmap-placcart-seat-down  main-selectSeats-carriage-seatsmap-placcart-seat")}

                            </div>
                        )
                    }
                    return null;
                })}
            </div>
        )
    };


    const seatfourth = () => {
        return (
            <div className="main-selectSeats-carriage-seatsmap-coupes-seats">
                {seatsList.map((seat, index) => {
                    if (((index - 1) % 4 === 0) && (index < 32)) {
                        return (
                            <div key={index} className="main-selectSeats-carriage-seatsmap-seats">
                                {renderButton(index - 1, "main-selectSeats-carriage-seatsmap-seats-seat")}
                                {renderButton(index, "main-selectSeats-carriage-seatsmap-seats-seat")}
                                {renderButton(index + 1, "main-selectSeats-carriage-seatsmap-seats-seat")}
                                {renderButton(index + 2, "main-selectSeats-carriage-seatsmap-seats-seat")}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )
    };

    return (
        <div className="main-selectSeats-carriage-seatsmap">
            <div className="main-selectSeats-carriage-seatsmap-imageleft">
            </div>
            <div className="main-selectSeats-carriage-seatsmap-seats">
                {seatsType === 'first' && seatFirst()}
                {seatsType === 'second' && seatSecond()}
                {seatsType === 'second' && seatSecondBottom()}
                {seatsType === 'third' && seatThird()}
                {seatsType === 'third' && seatThirdBottom()}
                {seatsType === 'fourth' && seatfourth()}
            </div>
      
            <div className="main-selectSeats-carriage-seatsmap-imageright">
            </div>
        </div >
    )
}