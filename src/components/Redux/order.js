import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk(
    "order/fetchOrder",
    async (_, { rejectWithValue, getState }) => {
        const { passengers, seats } = getState();

        const user = passengers.user;
        const seatsArray = [];
        let i = 0;

        const convertDate = (inputDate) => {
            const [day, month, year] = inputDate.split('/');
            const fullYear = year < 30 ? `20${year}` : `19${year}`;
            const formattedDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            return formattedDate;
        }

        const adults = passengers.passengers.filter(passenger => passenger.is_adult === "true");

        const children = passengers.passengers.filter(passenger => passenger.is_adult === "false").slice(0,seats.seatsCount.child );

        const resultPassengers = [...adults, ...children];


        Object.keys(seats.seats).forEach((key) => {
            const coachData = seats.seats[key];
            const coach = seats.coachList.find((coach) => coach.coach._id === key);

            coachData.forEach((item) => {
                const passenger = resultPassengers[i];
                i += 1;
                seatsArray.push({
                    coach_id: coach.coach.name,

                    person_info: {
                        is_adult: (passenger.is_adult === "true") ? true : false,
                        first_name: passenger.first_name,
                        last_name: passenger.last_name,
                        patronymic: passenger.patronymic,
                        gender: passenger.gender,
                        birthday: convertDate(passenger.birthday),
                        document_type: passenger.document_type,
                        document_data: `${passenger.document_data_s} ${passenger.document_data_n}`,
                    },
                    seat_number: item.id + 1,
                    is_child: (passenger.is_adult === "true") ? false : true,
                    include_children_seat: false,

                });
            });
        })


        const departure = {
            route_direction_id: seats.train.departure._id,
            seats: seatsArray,
        };

        const data = { user, departure }

        const url = `https://students.netoservices.ru/fe-diplom/order`;

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
            });

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


// {
//     "user": {
//         "first_name": "Иван",
//         "last_name": "Смирнов",
//         "patronymic": "Олегович",
//         "phone": "8900123123",
//         "email": "string@string.ru",
//         "payment_method": "cash" // или online
//       },
//       "departure": {
//         "route_direction_id": "123431",
//         "seats": [
//           {
//             "coach_id": "12341",
//             "person_info": {
//               "is_adult": true,
//               "first_name": "Ivan",
//               "last_name": "Popov",
//               "patronymic": "Popovich",
//               "gender": true,
//               "birthday": "1980-01-01",
//               "document_type": "паспорт",
//               "document_data": "45 6790195"
//             },
//             "seat_number": 10,
//             "is_child": true,
//             "include_children_seat": true
//           }
//         ]
//       }
//     }
const initialState = {
    order: null,
    status: null,
    error: null,
};

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.status = 'pending';
                state.order = null;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.order = action.payload.items;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

export default order.reducer;