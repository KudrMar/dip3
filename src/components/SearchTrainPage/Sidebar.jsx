import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from 'react';
import { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LastTicket from './LastTicket';
import { filterChange } from '../Redux/filter';
import SliderBar from "../MainPage/SliderBar";
import SliderBarTime from "../MainPage/SliderBarTime";
import moment from "moment";
import { fetchSeats } from '../Redux/seats';

function Sidebar() {
	const filter = useSelector((state) => state.filter);

	const dispatch = useDispatch();

	const dateStart = useSelector((state) => state.filter.date_start);
	const dateEnd = useSelector((state) => state.filter.date_end);

	const [start, setStart] = useState();
	const [end, setEnd] = useState();

	useEffect(() => {
		if (dateStart) {
			setStart(new Date(dateStart));
		}
	}, [dateStart]);

	useEffect(() => {
		if (dateEnd) {
			setEnd(new Date(dateEnd));
		}
	}, [dateEnd]);

	const handleChangeDate = (name, date) => {
		const dateCheck = moment(date, "DD.MM.YYYY", true);
		if (dateCheck.isValid()) {
			const str = date.toLocaleDateString();
			const format = `${str.slice(-4)}-${str.slice(3, 5)}-${str.slice(0, 2)}`;
			dispatch(
				filterChange({ name, value: format, })
			);
		} else {
			dispatch(
				filterChange({ name, value: "", })
			);
		};
	}

	const Input = forwardRef(({ value, onClick, onChange }, ref) => (
		<input
			className="sidebar-form-search-input-block"
			type="text"
			placeholder="ДД/ММ/ГГ"
			value={value}
			onClick={onClick}
			onChange={onChange}
			ref={ref}
		/>
	));

	const [lastTickets, setItems] = useState([]);

	useEffect(() => {
		fetch('https://students.netoservices.ru/fe-diplom/routes/last')
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((err) => console.log(err));
	}, []);

	const sendFilter = (optionName, optionValue) => {
		dispatch(filterChange({ name: optionName, value: optionValue }))
		dispatch(fetchSeats());
	};

	const [filter_have_second_class, setFilter_have_second_class] = useState(filter.have_second_class);
	const [filter_have_third_class, setFilter_have_third_class] = useState(filter.have_third_class);
	const [filter_have_fourth_class, setFilter_have_fourth_class] = useState(filter.have_fourth_class);
	const [filter_have_first_class, setFilter_have_first_class] = useState(filter.have_first_class);
	const [filter_have_wifi, setFilter_have_wifi] = useState(filter.have_wifi);
	const [filter_have_express, setFilter_have_express] = useState(filter.have_express);


	const have_second_class = (event) => {
		const isChecked = event.target.checked;
		sendFilter('have_second_class', isChecked);
		setFilter_have_second_class(isChecked);
	}

	const have_third_class = (event) => { const isChecked = event.target.checked; sendFilter('have_third_class', isChecked); setFilter_have_third_class(isChecked); }
	const have_fourth_class = (event) => { const isChecked = event.target.checked; sendFilter('have_fourth_class', isChecked); setFilter_have_fourth_class(isChecked); }
	const have_first_class = (event) => { const isChecked = event.target.checked; sendFilter('have_first_class', isChecked); setFilter_have_first_class(isChecked); }
	const have_wifi = (event) => { const isChecked = event.target.checked; sendFilter('have_wifi', isChecked); setFilter_have_wifi(isChecked); }
	const have_express = (event) => { const isChecked = event.target.checked; sendFilter('have_express', isChecked); setFilter_have_express(isChecked); }

	const params_departure_hour_start = {
		fromHour: "start_departure_hour_from",
		toHour: "start_departure_hour_to"
	};

	const params_arrival_hour_start = {
		fromHour: "start_arrival_hour_from",
		toHour: "start_arrival_hour_to"
	};

	const params_departure_hour_end = {
		fromHour: "end_departure_hour_from",
		toHour: "end_departure_hour_to"
	};

	const params_arrival_hour_end = {
		fromHour: "end_arrival_hour_from",
		toHour: "end_arrival_hour_to"
	};
	const [isCollapsedStart, setIsCollapsedStart] = useState(true);

	const handleCollapseClickStart = () => {
		setIsCollapsedStart((prev) => !prev); // Инвертируем текущее состояние
	};

	const [isCollapsedEnd, setIsCollapsedEnd] = useState(true);

	const handleCollapseClickEnd = () => {
		setIsCollapsedEnd((prev) => !prev); // Инвертируем текущее состояние
	};

	return (
		<div className="sidebar-searchtickets">
			<div className="sidebar-searchtickets-parammenu">
				<form className="sidebar-searchtickets-parammenu-dataFrom">
					<div className="sidebar-searchtickets-dates-title sidebar-form-title">Дата поездки</div>
					< div className="sidebar-searchtickets-dates-input-from sidebar-form-input-from" >
						<DatePicker
							dateFormat="dd.MM.yyyy"
							selected={start}
							selectsStart
							startDate={start}
							endDate={end}
							customInput={<Input />}
							onChange={(date) => handleChangeDate("date_start", date)}
							allowManualInput={true}
						/>
						<div className="sidebar-searchtickets-dates-input-over-calendar" />
					</div>
					<div className="sidebar-searchtickets-dates-title sidebar-form-title">Дата возвращения</div>
					<div className="sidebar-searchtickets-dates-input-to search-form-input-from" >
						<DatePicker
							dateFormat="dd.MM.yyyy"
							selected={end}
							selectsStart
							startDate={start}
							endDate={end}
							customInput={<Input />}
							onChange={(date) => handleChangeDate("date_end", date)}
							allowManualInput={true}
						/>
						<div className="sidebar-searchtickets-dates-input-over-calendar" />
					</div>
				</form>
				<div className="sidebar-searchtickets-parammenu-flags">
					<div className="sidebar-searchtickets-parammenu-flag-coupe sidebar-searchtickets-parammenu-flag">
						<div className="sidebar-searchtickets-parammenu-flag-icon-coupe sidebar-searchtickets-parammenu-flag-icon" />
						<p className="sidebar-searchtickets-parammenu-flag-text">Купе</p>
						<div className={"sidebar-searchtickets-parammenu-flag-control-" + filter_have_second_class}>
							<input id="have_second_class" type="checkbox" className="sidebar-searchtickets-parammenu-flag-control-input" checked={filter.have_second_class} onChange={have_second_class} />
						</div>
					</div>
					<div className="sidebar-searchtickets-parammenu-flag-plackart sidebar-searchtickets-parammenu-flag">
						<div className="sidebar-searchtickets-parammenu-flag-icon-plackart sidebar-searchtickets-parammenu-flag-icon" />
						<p className="sidebar-searchtickets-parammenu-flag-text">Плацкарт</p>
						<div className={"sidebar-searchtickets-parammenu-flag-control-" + filter_have_third_class}>
							<input id="have_third_class" type="checkbox" className="sidebar-searchtickets-parammenu-flag-control-input" checked={filter.have_third_class} onChange={have_third_class} />
						</div>
					</div>
					<div className="sidebar-searchtickets-parammenu-flag-seats sidebar-searchtickets-parammenu-flag">
						<div className="sidebar-searchtickets-parammenu-flag-icon-seats sidebar-searchtickets-parammenu-flag-icon" />
						<p className="sidebar-searchtickets-parammenu-flag-text">Сидячий</p>
						<div className={"sidebar-searchtickets-parammenu-flag-control-" + filter_have_fourth_class}>
							<input id="have_fourth_class" type="checkbox" className="sidebar-searchtickets-parammenu-flag-control-input" checked={filter.have_fourth_class} onChange={have_fourth_class} />
						</div>
					</div>
					<div className="sidebar-searchtickets-parammenu-flag-lux sidebar-searchtickets-parammenu-flag">
						<div className="sidebar-searchtickets-parammenu-flag-icon-lux sidebar-searchtickets-parammenu-flag-icon" />
						<p className="sidebar-searchtickets-parammenu-flag-text">Люкс</p>
						<div className={"sidebar-searchtickets-parammenu-flag-control-" + filter_have_first_class}>
							<input id="have_first_class" type="checkbox" className="sidebar-searchtickets-parammenu-flag-control-input" checked={filter.have_first_class} onChange={have_first_class} />
						</div>
					</div>
					<div className="sidebar-searchtickets-parammenu-flags-wifi sidebar-searchtickets-parammenu-flag">
						<div className="sidebar-searchtickets-parammenu-flags-icon-wifi sidebar-searchtickets-parammenu-flag-icon" />
						<p className="sidebar-searchtickets-parammenu-flag-text">Wi-Fi</p>
						<div className={"sidebar-searchtickets-parammenu-flag-control-" + filter_have_wifi}>
							<input id="have_wifi" type="checkbox" className="sidebar-searchtickets-parammenu-flag-control-input" checked={filter.have_wifi} onChange={have_wifi} />
						</div>
					</div>
					<div className="sidebar-searchtickets-parammenu-flags-express sidebar-searchtickets-parammenu-flag">
						<div className="sidebar-searchtickets-parammenu-flags-icon-express sidebar-searchtickets-parammenu-flag-icon" />
						<p className="sidebar-searchtickets-parammenu-flag-text">Экспресс</p>
						<div className={"sidebar-searchtickets-parammenu-flag-control-" + filter_have_express}>
							<input id="have_express" type="checkbox" className="sidebar-searchtickets-parammenu-flag-control-input" checked={filter.have_express} onChange={have_express} />
						</div>
					</div>
				</div>


				<form className="sidebar-searchtickets-parammenu-prices">
					<div className="sidebar-searchtickets-parammenu-prices-title">Стоимость</div>
					<div className="sidebar-searchtickets-parammenu-prices-slider-title">
						<span>от</span>
						<span>до</span>
					</div>
					<SliderBar
					/>
				</form>

				<form className="sidebar-searchtickets-parammenu-time">
					<div className="sidebar-searchtickets-parammenu-time-title">
						<div className="sidebar-searchtickets-parammenu-time-title-image-right" />
						<div className="sidebar-searchtickets-parammenu-time-title-text">Туда</div>
						<div className={"sidebar-imageColapse-" + isCollapsedStart} onClick={handleCollapseClickStart} />
					</div>
					{!isCollapsedStart && (
						<div className="sidebar-searchtickets-parammenu-time-colapse">
							<div className="sidebar-searchtickets-parammenu-time-title-to">Время отбытия</div>
							<SliderBarTime param={params_departure_hour_start} />
							<div className="sidebar-searchtickets-parammenu-time-title-to-back">Время прибытия</div>
							<SliderBarTime param={params_arrival_hour_start} />
						</div>
					)}
				</form>


				<form className="sidebar-searchtickets-parammenu-time">
					<div className="sidebar-searchtickets-parammenu-time-title">
						<div className="sidebar-searchtickets-parammenu-time-title-image-left" />
						<div className="sidebar-searchtickets-parammenu-time-title-text">Обратно</div>
						<div className={"sidebar-imageColapse-" + isCollapsedEnd} onClick={handleCollapseClickEnd} />
					</div>
					{!isCollapsedEnd && (
						<div className="sidebar-searchtickets-parammenu-time-colapse">
							<div className="sidebar-searchtickets-parammenu-time-title-to">Время отбытия</div>
							<SliderBarTime param={params_departure_hour_end} />
							<div className="sidebar-searchtickets-parammenu-time-title-to-back">Время прибытия</div>
							<SliderBarTime param={params_arrival_hour_end} />
						</div>
					)}
				</form>




			</div>

			{lastTickets.length !== 0 &&
				(<div className="sidebar-searchtickets-last-tickets">
					<div className="sidebar-searchtickets-last-tickets-title">ПОСЛЕДНИЕ БИЛЕТЫ</div>
					<div className="sidebar-searchtickets-last-tickets-list">
						{lastTickets.map((item) => (
							<LastTicket ticket={item} key={item.departure._id} />
						))}
					</div>
				</div>)
			}

		</div>
	);

};

export default Sidebar;