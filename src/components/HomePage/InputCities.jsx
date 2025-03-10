import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { citiesChange } from '../Redux/cities';
import { filterChange } from '../Redux/filter';

export default function InputCities(props) {
   const { direction, type, placeholder } = props;

   const [visible, setVisible] = useState(false);

   const dispatch = useDispatch();
   const { cityFrom, cityTo } = useSelector((state) => state.cities);
   const route = direction === 'cityFrom' ? cityFrom.name : cityTo.name;
   const [value, setValue] = useState('');
   const [cities, setCities] = useState(route);

   useEffect(() => {
      setValue(route);
      if (route === '') {
         setCities([{ _id: "", name: "" }])
      } else {
         fetch(
            `https://students.netoservices.ru/fe-diplom/routes/cities?name=${route}`
         )
            .then((response) => response.json())
            .then((data) => {
               setCities(data)
            });
      }
   }, [route]);

   const onHandleChangeDispatch = (id, name) => {
      dispatch(
         citiesChange({
            name: direction,
            value: { id, name },
         })
      );
      dispatch(
         filterChange({
            name: direction === 'cityFrom' ? "from_city_id": "to_city_id",
            value: id ,
         })
      );

   };

   const handleChange = (event) => {
      const { target } = event;
      setValue(target.value);
      if (target.value.length > 0) {
         const citiObj =
            cities &&
            cities.find((city) => city.name === target.value.toLowerCase());
         const id = citiObj ? citiObj._id : '';
         onHandleChangeDispatch(id, target.value);
      }
   };

   const onVisible = (event) => {
      event.preventDefault();
      setTimeout(() => setVisible(false), 200);
   };

   return (
      <>
         <input
            autoComplete="off"
            className="form-search-input-block"
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            onClick={() => setVisible(true)}
            onBlur={onVisible}
            value={value}
            name={direction}
         />

         {visible && cities.length > 0 ? (
            <dir className="search-form-direction-input-autocomplete-list">
               {cities.map((city) => (
                  <dir

                     className="search-form-direction-input-autocomplete-item"
                     key={city._id}
                     onClick={() => {
                        setValue(city.name);
                        onHandleChangeDispatch(city._id, city.name);
                     }}
                  >
                     {city.name}
                  </dir>
               ))}
            </dir>
         )
            : (
               <ul className="form-search-input-block-hidden" />
            )
         }
      </>
   );
}

