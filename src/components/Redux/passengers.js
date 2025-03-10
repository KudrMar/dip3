import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   user: {
      first_name: "",
      last_name: "",
      patronymic: "",
      phone: "",
      email: "",
      payment_method: "online"
  },
   passengers: [],
   passengersLocal: [],
   empty: {
      "is_adult": "true",
      "first_name": "",
      "last_name": "",
      "patronymic": "",
      "gender": true,
      "birthday": "",
      "document_type": "Паспорт РФ",
      "document_data_s": "",
      "document_data_n": "",
      "limited": false,
      "warning": "",
      "correct": false,
   }

};

const passengers = createSlice({
   name: 'passengers',
   initialState,
   reducers: {
      passengersAddEmpty: (state, action) => {
         const { id, adultcount } = action.payload;
         state.passengers.push(state.empty);
         state.passengersLocal.push(state.empty);
         if (id >= adultcount) {
            state.passengers[id].is_adult = "false";
            state.passengersLocal[id].is_adult = "false";
            state.passengers[id].document_type = "Свидетельство о рождении";
            state.passengersLocal[id].document_type = "Свидетельство о рождении"
         }
      },

      passengersClear: (state) => {
         state.passengers=[];
         state.passengersLocal=[];
      },
      

      passengersChange: (state, action) => {
         const { index, data } = action.payload;
         state.passengers[index] = {
            ...state.passengers[index],
            ...data[index],
         }
         state.passengers[index].warning = ""
         state.passengers[index].correct = true
         
         state.passengersLocal = data;
         state.passengersLocal[index].warning = ""
         state.passengersLocal[index].correct = true
      },

      
      passengersChangeFalse: (state, action) => {
         const { index, data, error} = action.payload;
         state.passengers[index] = {
            ...state.passengers[index],
            ...data[index],
         }
         state.passengers[index].warning = error
         state.passengers[index].correct = false
         
         state.passengersLocal = data;
         state.passengersLocal[index].warning = error
         state.passengersLocal[index].correct = false
      },

      passengersDel: (state, action) => {
         const { index } = action.payload;
         state.passengers[index] = { ...state.empty };
         state.passengersLocal[index] = { ...state.empty };
      },

      userChange: (state, action) => {
         const { data } = action.payload;
         state.user = data;
      },
      
   }
   });

export const {
   passengersAddEmpty,
   passengersChange,
   passengersDel,
   passengersChangeFalse,
   userChange,
   passengersClear

} = passengers.actions;
export default passengers.reducer;

