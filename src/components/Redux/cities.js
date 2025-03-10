
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityFrom: { _id: "", name: "" },
  cityTo: { _id: "", name: "" },
};

const search = createSlice({
  name: "cities",
  initialState,
  reducers: {
    cityExchange: (state) => {
      const from = state.cityFrom;
      state.cityFrom = state.cityTo;
      state.cityTo = from;
    },
    citiesChange: (state, action) => {
      const { name, value } = action.payload;
        state[name] = value;
    },
  },
});

export const { citiesChange, cityExchange } = search.actions;
export default search.reducer;