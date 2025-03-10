import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('filter')) || {
   from_city_id: "",
   to_city_id: "",
   date_start: "",
   date_end: "",
   date_start_arrival: "",
   date_end_arrival: "",
   have_first_class: false,
   have_second_class: false,
   have_third_class: false,
   have_fourth_class: false,
   have_wifi: false,
   have_express: false,
   have_air_conditioning: false,
   price_from: 0,
   price_to: 10000,
   start_departure_hour_from: 0,
   start_departure_hour_to: 1440,
   start_arrival_hour_from: 0,
   start_arrival_hour_to: 1440,
   end_departure_hour_from: 0,
   end_departure_hour_to: 1440,
   end_arrival_hour_from: 0,
   end_arrival_hour_to: 1440,
   limit: 5,
   offset: 0,
   sort: 'date',
};

const filter = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      filterChange: (state, action) => {
         const { name, value } = action.payload;
         state[name] = value;
      },
      filterExchange: (state) => {
         const from_city_id = state.from_city_id;
         state.from_city_id = state.to_city_id;
         state.to_city_id = from_city_id;
       },
   },
});

export const { filterChange, filterExchange} = filter.actions;
export default filter.reducer;