import React from 'react';
import InputCities from "./InputCities";
import DatePicker from "react-datepicker";
import { useEffect, useState, forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { cityExchange } from "../Redux/cities";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { filterChange,filterExchange } from "../Redux/filter";
import { fetchRoutes } from "../Redux/routes";
import moment from "moment";
export default function HomePageForm({ className }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const dateStart = useSelector((state) => state.filter.date_start);
   const dateEnd = useSelector((state) => state.filter.date_end);

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(filterChange({ name: 'offset', value: 0 }));
      dispatch(fetchRoutes());
      navigate('/trains');
   };

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

   const Input = forwardRef(({ value, onClick, onChange }, ref) => (
      <input
         className="form-search-input-block"
         type="text"
         placeholder="ДД/ММ/ГГ"
         value={value}
         onClick={onClick}
         onChange={onChange}
         ref={ref}
      />
   ));
   const handleChangeDate = (name, date) => {
      // const str = date.toLocaleDateString();
      // const format = `${str.slice(-4)}-${str.slice(3, 5)}-${str.slice(0, 2)}`;
      // dispatch(
      //    filterChange({ name, value: format, })
      // );
      const dateCheck = moment(date, "DD.MM.YYYY", true); // Парсим дату
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
   };

   const onClickDirectionChange = (e) => {
      e.preventDefault();
      dispatch(cityExchange());
      dispatch(filterExchange());
   }
   return (
      <section className={"header-section-" + className}>
         <div className={"header-" + className}>
            <div className={"header-leftcol-" + className}>
               <p className={"header-leftcol-" + className + "title"}>Вся жизнь -</p>
               <p className={"header-leftcol-" + className + "title-bold"}>путешествие!</p>
            </div>
            <form className={"header-rightcol-" + className} onSubmit={handleSubmit}>
               <div className={"shearch-form-item-" + className}>
                  <div className={"shearch-form-item-imputblock-" + className}>
                     <div className="search-form-direction">
                        <div className="search-form-direction-title search-form-title">Направление</div>
                        <div className="search-form-direction-input search-form-input">
                           <div className="search-form-direction-input-from search-form-input-from">
                              <InputCities placeholder="Откуда" direction="cityFrom" />
                           </div>
                           <button type="button" className="search-form-direction-cityChange" onClick={onClickDirectionChange}></button>
                           <div className="search-form-direction-input-to search-form-input-from">
                              <InputCities placeholder="Куда" direction="cityTo" />
                           </div>
                        </div>
                     </div>
                     <div className="search-form-dates">
                        <div className="search-form-dates-title search-form-title">Дата</div>
                        <div className="search-form-dates-input search-form-input">
                           <div className="search-form-dates-input-from search-form-input-from">
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
                           </div>
                           <div className="search-form-dates-input-to search-form-input-from">
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
                           </div>
                        </div>
                     </div>
                  </div>
                  <button type="submit" className="header-button-search">Найти билеты</button>
               </div>

            </form>
         </div>
      </section>
   );
}