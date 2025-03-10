import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeats = createAsyncThunk(
   'seats/fetchSeats',
   async (_, { rejectWithValue, getState }) => {
      const allowedKeys = [
         'have_first_class',
         'have_second_class',
         'have_third_class',
         'have_fourth_class',
         'have_wifi',
         'have_air_conditioning',
         'have_express',
      ];

      const { filter } = getState();
      const train = getState().seats.train;
      const id = train.departure._id;
      let url = `https://students.netoservices.ru/fe-diplom/routes/${id}/seats`;
      //let url = `https://students.netoservices.ru/fe-diplom/routes/66ac8b84cb563f0052176a17/seats`;

      let options = '';

      for (const key in filter) {
         if (filter[key] || filter[key] === 0) {
            if (allowedKeys.includes(key) && (filter[key] || filter[key] === 0)) {
               options += `?${key}=${filter[key]}`;
            }
         }
      }
      url += options;


      try {
         const response = await fetch(url);

         if (!response.ok) {
            throw new Error('Server Error');
         }
         const data = await response.json();
         return { data };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {

   coachList: [],
   status: null,
   error: null,
   train: null,
   coachClass: null,
   coachItems: [],
   seats: {},
   seatsCount: {
      adult: 0,
      child: 0,
      baby: 0,
   },
   services: {},
   totalPrice: {
      adult: 0,
      child: 0,
      total: 0,
   }
};

const seats = createSlice({
   name: 'seats',
   initialState,
   reducers: {
      trainAdd: (state, action) => {
         state.train = action.payload;
      },

      coachClassChange: (state, action) => {
         const { coachClass } = action.payload;
         state.coachClass = coachClass;
      },

      coachItemsSelect: (state, action) => {
         const { id } = action.payload;
         state.coachItems.push(id);
         state.services[id] = {
            wifi: false,
            linen: false,
            meal: false,
         };
         state.seats[id] = [];

      },
      coachItemsUnSelect: (state, action) => {
         const { id } = action.payload;
         state.coachItems = state.coachItems.filter(
            (el) => el !== id
         );
         state.services[id] = {
            wifi: false,
            linen: false,
            meal: false,
         };
         state.seats[id] = [];
      },

      coachItemsClear: (state) => {
         state.coachItems = [];
         state.services = {};
         state.seats = {};
      },

      seatsItemSelect: (state, action) => {
         const { id, seatIndex, price } = action.payload;
         state.seats[id].push({ id: seatIndex, price: price });
      },

      seatsItemUnSelect: (state, action) => {
         const { id, seatIndex } = action.payload;
         state.seats[id] = state.seats[id].filter(
            (el) => el.id !== seatIndex
         );
      },

      serviceItemSelect: (state, action) => {
         const { id, propertyToChange } = action.payload;
         state.services[id][propertyToChange] = !state.services[id][propertyToChange];
      },

      seatsCountChange: (state, action) => {
         const { propertyToChange, value } = action.payload;
         state.seatsCount[propertyToChange] = value;
      },

      setTotalPrice: (state, action) => {
         const { value, propertyToChange } = action.payload;
         state.totalPrice[propertyToChange] = value;
      },


   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSeats.pending, (state) => {
            state.status = 'pending';
            state.error = null;
         })
         .addCase(fetchSeats.fulfilled, (state, action) => {
            state.status = 'resolved';
            const { data } = action.payload;
            state.coachList = data;

         })
         .addCase(fetchSeats.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
         });
   },
});

export const {
   seatsItemUnSelect,
   trainAdd,
   coachClassChange,
   coachItemsSelect,
   coachItemsUnSelect,
   coachItemsClear,
   seatsItemSelect,
   serviceItemSelect,
   seatsCountChange,
   setTotalPrice
} = seats.actions;
export default seats.reducer;