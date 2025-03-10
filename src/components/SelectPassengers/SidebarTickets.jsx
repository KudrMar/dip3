import React from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

function SidebarTickets() {
    const { train, seatsCount, totalPrice } = useSelector((state) => state.seats);

    const [isCollapsedTo, setIsCollapsedTo] = useState(false);

    const handleCollapseClickTo = () => {
        setIsCollapsedTo((prev) => !prev);
    };

    const [isCollapsedPas, setIsCollapsedPas] = useState(false);

    const handleCollapseClickPas = () => {
        setIsCollapsedPas((prev) => !prev);
    };

    const getAdult = () => {
        const totalCount = seatsCount.adult + 0.5 * seatsCount.child;
        if (totalCount === 0) { return 0 }
        else {
            return seatsCount.adult / totalCount * totalPrice.total;
        }
    };

    const getChild = () => {
        const totalCount = seatsCount.adult + 0.5 * seatsCount.child;
        if (totalCount === 0) { return 0 }
        else {
            return 0.5 * seatsCount.child / totalCount * totalPrice.total;
        }
    };

    const getChildText = () => {
        return seatsCount.child > 1 ? 'детей' : 'ребенка'
    }

    const getAdultText = () => {
        return seatsCount.adult > 1 ? 'взрослых' : 'взрослый'
    }

    return (
        <div className="sidebar-SelectPassengers">
            <div className="sidebar-SelectPassengersIn">
                <div className="sidebar-SelectPassengers-title">ДЕТАЛИ ПОЕЗДКИ </div>
                <div className="sidebar-SelectPassengers-line"></div>
                <div className="sidebar-SelectPassengers-to">
                    <div className="sidebar-SelectPassengers-to-arrow"> </div>
                    <div className="sidebar-SelectPassengers-to-text">Туда</div>
                    <div className="sidebar-SelectPassengers-to-date"> {moment
                        .unix(train.departure.from.datetime)
                        .utc()
                        .format('DD.MM.YYYY')}</div>
                    <div className={"sidebar-imageColapse-" + isCollapsedTo} onClick={handleCollapseClickTo}></div>
                </div>
                {!isCollapsedTo && (<div className="sidebar-SelectPassengers-to-train-contener">
                    <div className="sidebar-SelectPassengers-to-train">
                        <div className="sidebar-SelectPassengers-to-train-text">№ Поезда</div>
                        <div className="sidebar-SelectPassengers-to-train-number">{train.departure.train.name}</div>
                    </div>
                    <div className="sidebar-SelectPassengers-to-info">
                        <div className="sidebar-SelectPassengers-to-info-text">Название</div>
                        <div className="sidebar-SelectPassengers-to-info-name">
                            <div className="sidebar-SelectPassengers-to-info-city1">{train.departure.train.name}</div>
                            <div className="sidebar-SelectPassengers-to-info-city2">{train.departure.to.city.name}</div>
                        </div>
                    </div>
                    <div className="sidebar-SelectPassengers-to-time">
                        <div className="sidebar-SelectPassengers-to-timefrom">
                            <div className="sidebar-SelectPassengers-to-timefrom-time">{moment
                                .unix(train.departure.from.datetime)
                                .utc()
                                .format('HH:mm')}</div>
                            <div className="sidebar-SelectPassengers-to-timefrom-date"> {moment
                                .unix(train.departure.from.datetime)
                                .utc()
                                .format('DD.MM.YYYY')}</div>
                        </div>
                        <div className="sidebar-SelectPassengers-to-duration">
                            <div className="sidebar-SelectPassengers-to-duration-time"> {moment.unix(train.departure.duration).utc().format('HH:mm')}</div>
                            <div className="sidebar-SelectPassengers-to-duration-arrow"></div>
                        </div>
                        <div className="sidebar-SelectPassengers-to-timeto">
                            <div className="sidebar-SelectPassengers-to-timeto-time">{moment
                                .unix(train.departure.to.datetime)
                                .utc()
                                .format('HH:mm')}</div>
                            <div className="sidebar-SelectPassengers-to-timeto-date">{moment
                                .unix(train.departure.to.datetime)
                                .utc()
                                .format('DD.MM.YYYY')}</div>
                        </div>
                    </div>
                    <div className="sidebar-SelectPassengers-to-cities">
                        <div className="sidebar-SelectPassengers-to-citiesfrom">
                            <div className="sidebar-SelectPassengers-to-citiesfrom-city">{train.departure.from.city.name}</div>
                            <div className="sidebar-SelectPassengers-to-citiesfrom-station">{train.departure.from.railway_station_name}</div>
                            <div className="sidebar-SelectPassengers-citiesto-text">вокзал</div>
                        </div>
                        <div className="sidebar-SelectPassengers-to-citiesto">
                            <div className="sidebar-SelectPassengers-to-citiesto-city">{train.departure.to.city.name}</div>
                            <div className="sidebar-SelectPassengers-to-citiesto-station">{train.departure.to.railway_station_name}</div>
                            <div className="sidebar-SelectPassengers-citiesto-text">вокзал</div>
                        </div>
                    </div>
                </div>)}
                <div className="sidebar-SelectPassengers-line"></div>
                {/* <div className="sidebar-SelectPassengers-to">
                <div className="sidebar-SelectPassengers-to-arrow"> </div>
                <div className="sidebar-SelectPassengers-to-text">Туда</div>
                <div className="sidebar-SelectPassengers-to-date"></div>
                <div className="sidebar-SelectPassengers-to-colapse"></div>
            </div>
            <div className="sidebar-SelectPassengers-to-train">
                <div className="sidebar-SelectPassengers-to-train-text">№ Поезда</div>
                <div className="sidebar-SelectPassengers-to-train-number"></div>
            </div>
            <div className="sidebar-SelectPassengers-to-info">
                <div className="sidebar-SelectPassengers-to-info-text">Название</div>
                <div className="sidebar-SelectPassengers-to-info-name">
                    <div className="sidebar-SelectPassengers-to-info-city1"></div>
                    <div className="sidebar-SelectPassengers-to-info-city2"></div>
                </div>
            </div>
            <div className="sidebar-SelectPassengers-back-time">
                <div className="sidebar-SelectPassengers-back-timefrom">
                    <div className="sidebar-SelectPassengers-back-timefrom-time"></div>
                    <div className="sidebar-SelectPassengers-back-timefrom-date"></div>
                </div>
                <div className="sidebar-SelectPassengers-back-duration">
                    <div className="sidebar-SelectPassengers-back-duration-time"></div>
                    <div className="sidebar-SelectPassengers-back-duration-arrow"></div>
                </div>
                <div className="sidebar-SelectPassengers-back-timeto">
                    <div className="sidebar-SelectPassengers-back-timeto-time"></div>
                    <div className="sidebar-SelectPassengers-back-timeto-date"></div>
                </div>
            </div>
            <div className="sidebar-SelectPassengers-back-cities">
                <div className="sidebar-SelectPassengers-back-citiesfrom">
                    <div className="sidebar-SelectPassengers-back-citiesfrom-city"></div>
                    <div className="sidebar-SelectPassengers-back-citiesfrom-station"></div>
                </div>
                <div className="sidebar-SelectPassengers-back-citiesto">
                    <div className="sidebar-SelectPassengers-back-citiesto-city"></div>
                    <div className="sidebar-SelectPassengers-back-citiesto-station"></div>
                </div>
            </div>
            <div className="sidebar-SelectPassengers-line"></div> */}
                <div className="sidebar-SelectPassengers-passengers">
                    <div className="sidebar-SelectPassengers-passengers-pic"> </div>
                    <div className="sidebar-SelectPassengers-passengers-text">Пассажиры</div>
                    <div className={"sidebar-imageColapse-" + isCollapsedPas} onClick={handleCollapseClickPas}></div>
                </div>
                {!isCollapsedPas && (<div className="sidebar-SelectPassengers-contener">
                    {getAdult() > 0 && (
                        <div className="sidebar-SelectPassengers-sb">
                            <div className="sidebar-SelectPassengers-sb-left">
                                <div className="sidebar-SelectPassengers-sb-value">{seatsCount.adult}</div>
                                <div className="sidebar-SelectPassengers-sb-text">{getAdultText()}</div>
                            </div>

                            <div className="sidebar-SelectPassengers-sb-right">
                                <div className="sidebar-SelectPassengers-sb-price">{getAdult().toLocaleString()}</div>
                                <div className="sidebar-SelectPassengers-sb-rub"></div>
                            </div>
                        </div>)}
                    {getChild() > 0 && (
                        <div className="sidebar-SelectPassengers-sb">
                            <div className="sidebar-SelectPassengers-sb-left">
                                <div className="sidebar-SelectPassengers-sb-value">{seatsCount.child}</div>
                                <div className="sidebar-SelectPassengers-sb-text">{getChildText()}</div>
                            </div>
                            <div className="sidebar-SelectPassengers-sb-right">
                                <div className="sidebar-SelectPassengers-sb-price">{getChild().toLocaleString()}</div>
                                <div className="sidebar-SelectPassengers-sb-rub"></div>
                            </div>
                        </div>)}
                </div>)}
                <div className="sidebar-SelectPassengers-line"></div>
                <div className="sidebar-SelectPassengers-totalPrice">
                    <div className="sidebar-SelectPassengers-totalPrice-left">ИТОГ
                    </div>
                    <div className="sidebar-SelectPassengers-totalPrice-right">
                        <div className="sidebar-SelectPassengers-totalPrice-price">{totalPrice.total.toLocaleString()}</div>
                        <div className="sidebar-SelectPassengers-totalPrice-rub"></div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default SidebarTickets;