import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubscribe = createAsyncThunk(
    'subscribe/fetchSubscribe',
    async (email, { rejectWithValue }) => {
       
        const url = `https://students.netoservices.ru/fe-diplom/subscribe?email=${email}` ;

          try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Server Error");
            }
            const fetchData = await response.json();

            return fetchData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    status: null,
    error: null,
};

const order = createSlice({
    name: 'subscribe',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscribe.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchSubscribe.fulfilled, (state, action) => {
                state.status = 'resolved';
            })
            .addCase(fetchSubscribe.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

export default order.reducer;