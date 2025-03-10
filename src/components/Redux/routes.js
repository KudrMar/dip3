import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRoutes = createAsyncThunk(
   'routes/fetchRoutes',
   async (_, { rejectWithValue, getState }) => {
       const { filter } = getState();

   let url = "https://students.netoservices.ru/fe-diplom/routes?";

         let options = '';

      for (const key in filter) {
         if (filter[key] || filter[key] === 0) {
            options += `&${key}=${filter[key]}`;
         }
      }
      url += options;

      // const data = {"items":[{"have_first_class":false,"have_second_class":false,"have_third_class":false,"have_fourth_class":false,"have_wifi":false,"have_air_conditioning":false,"is_express":false,"min_price":1839,"available_seats":63,"available_seats_info":{"second":64},"departure":{"_id":"66ac8b7acb563f0052176233","have_first_class":false,"have_second_class":true,"have_third_class":false,"have_fourth_class":false,"have_wifi":true,"have_air_conditioning":false,"is_express":false,"min_price":1839,"duration":13080,"available_seats":63,"available_seats_info":{"second":64},"train":{"_id":"66ac8b6fcb563f005217596c","name":"Калина - 43"},"from":{"railway_station_name":"Адлер","city":{"_id":"66ac8b69cb563f0052174f49","name":"адлер"},"datetime":1672706771},"to":{"railway_station_name":"Балаково","city":{"_id":"66ac8b69cb563f0052174f4e","name":"балаково"},"datetime":1672719851},"price_info":{"second":{"top_price":1839,"bottom_price":1944}}}},{"have_first_class":false,"have_second_class":false,"have_third_class":false,"have_fourth_class":false,"have_wifi":false,"have_air_conditioning":false,"is_express":false,"min_price":2166,"available_seats":79,"available_seats_info":{"second":32,"third":48},"departure":{"_id":"66ac8b84cb563f0052176a4a","have_first_class":false,"have_second_class":true,"have_third_class":true,"have_fourth_class":false,"have_wifi":false,"have_air_conditioning":true,"is_express":false,"min_price":2166,"duration":276300,"available_seats":79,"available_seats_info":{"second":32,"third":48},"train":{"_id":"66ac8b6fcb563f0052175961","name":"Ласточка - 34"},"from":{"railway_station_name":"Адлер","city":{"_id":"66ac8b69cb563f0052174f49","name":"адлер"},"datetime":1672740201},"to":{"railway_station_name":"Балаково","city":{"_id":"66ac8b69cb563f0052174f4e","name":"балаково"},"datetime":1673016501},"price_info":{"second":{"top_price":2358,"bottom_price":2166},"third":{"top_price":4415,"bottom_price":4530,"side_price":4835}}}},{"have_first_class":false,"have_second_class":false,"have_third_class":false,"have_fourth_class":false,"have_wifi":false,"have_air_conditioning":false,"is_express":false,"min_price":2750,"available_seats":114,"available_seats_info":{"first":18,"third":96},"departure":{"_id":"66ac8b95cb563f005217780e","have_first_class":true,"have_second_class":false,"have_third_class":true,"have_fourth_class":false,"have_wifi":true,"have_air_conditioning":true,"is_express":false,"min_price":2750,"duration":23340,"available_seats":114,"available_seats_info":{"first":18,"third":96},"train":{"_id":"66ac8b6ecb563f00521758bb","name":"undefined - 28"},"from":{"railway_station_name":"Адлер","city":{"_id":"66ac8b69cb563f0052174f49","name":"адлер"},"datetime":1672746997},"to":{"railway_station_name":"Балаково","city":{"_id":"66ac8b69cb563f0052174f4e","name":"балаково"},"datetime":1672770337},"price_info":{"first":{"price":3830,"top_price":3310,"bottom_price":3270},"third":{"top_price":3780,"bottom_price":2760,"side_price":2750}}}},{"have_first_class":false,"have_second_class":false,"have_third_class":false,"have_fourth_class":false,"have_wifi":false,"have_air_conditioning":false,"is_express":false,"min_price":698,"available_seats":109,"available_seats_info":{"third":48,"fourth":62},"departure":{"_id":"66ac8b83cb563f00521768df","have_first_class":false,"have_second_class":false,"have_third_class":true,"have_fourth_class":true,"have_wifi":true,"have_air_conditioning":true,"is_express":false,"min_price":698,"duration":317940,"available_seats":109,"available_seats_info":{"third":48,"fourth":62},"train":{"_id":"66ac8b6dcb563f0052175875","name":"Тройка - 40"},"from":{"railway_station_name":"Адлер","city":{"_id":"66ac8b69cb563f0052174f49","name":"адлер"},"datetime":1672748359},"to":{"railway_station_name":"Балаково","city":{"_id":"66ac8b69cb563f0052174f4e","name":"балаково"},"datetime":1673066299},"price_info":{"third":{"top_price":4060,"bottom_price":4945,"side_price":2525},"fourth":{"top_price":847,"bottom_price":698}}}},{"have_first_class":false,"have_second_class":false,"have_third_class":false,"have_fourth_class":false,"have_wifi":false,"have_air_conditioning":false,"is_express":false,"min_price":3985,"available_seats":47,"available_seats_info":{"third":48},"departure":{"_id":"66ac8b88cb563f0052176d37","have_first_class":false,"have_second_class":false,"have_third_class":true,"have_fourth_class":false,"have_wifi":true,"have_air_conditioning":false,"is_express":false,"min_price":3985,"duration":295920,"available_seats":47,"available_seats_info":{"third":48},"train":{"_id":"66ac8b6ecb563f00521758bd","name":"Калина - 46"},"from":{"railway_station_name":"Адлер","city":{"_id":"66ac8b69cb563f0052174f49","name":"адлер"},"datetime":1672795344},"to":{"railway_station_name":"Балаково","city":{"_id":"66ac8b69cb563f0052174f4e","name":"балаково"},"datetime":1673091264},"price_info":{"third":{"top_price":4510,"bottom_price":4405,"side_price":3985}}}}]};
    //   const data = {"items": [
    //      {
    //          "have_first_class": false,
    //          "have_second_class": false,
    //          "have_third_class": false,
    //          "have_fourth_class": false,
    //          "have_wifi": false,
    //          "have_air_conditioning": false,
    //          "is_express": false,
    //          "min_price": 2214,
    //          "available_seats": 127,
    //          "available_seats_info": {
    //              "second": 32,
    //              "third": 96
    //          },
    //          "departure": {
    //              "_id": "66ac8b84cb563f0052176a17",
    //              "have_first_class": false,
    //              "have_second_class": true,
    //              "have_third_class": true,
    //              "have_fourth_class": false,
    //              "have_wifi": true,
    //              "have_air_conditioning": false,
    //              "is_express": false,
    //              "min_price": 2214,
    //              "duration": 254340,
    //              "available_seats": 127,
    //              "available_seats_info": {
    //                  "second": 32,
    //                  "third": 96
    //              },
    //              "train": {
    //                  "_id": "66ac8b6fcb563f00521759ca",
    //                  "name": "Перун - 99"
    //              },
    //              "from": {
    //                  "railway_station_name": "Киевский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f45",
    //                      "name": "москва"
    //                  },
    //                  "datetime": 1672949001
    //              },
    //              "to": {
    //                  "railway_station_name": "Московский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f46",
    //                      "name": "санкт-петербург"
    //                  },
    //                  "datetime": 1673203341
    //              },
    //              "price_info": {
    //                  "second": {
    //                      "top_price": 2652,
    //                      "bottom_price": 2214
    //                  },
    //                  "third": {
    //                      "top_price": 3455,
    //                      "bottom_price": 2525,
    //                      "side_price": 3855
    //                  }
    //              }
    //          }
    //      },
    //      {
    //          "have_first_class": false,
    //          "have_second_class": false,
    //          "have_third_class": false,
    //          "have_fourth_class": false,
    //          "have_wifi": false,
    //          "have_air_conditioning": false,
    //          "is_express": false,
    //          "min_price": 2825,
    //          "available_seats": 48,
    //          "available_seats_info": {
    //              "third": 48
    //          },
    //          "departure": {
    //              "_id": "66ac8b9fcb563f005217806f",
    //              "have_first_class": false,
    //              "have_second_class": false,
    //              "have_third_class": true,
    //              "have_fourth_class": false,
    //              "have_wifi": true,
    //              "have_air_conditioning": true,
    //              "is_express": false,
    //              "min_price": 2825,
    //              "duration": 218940,
    //              "available_seats": 48,
    //              "available_seats_info": {
    //                  "third": 48
    //              },
    //              "train": {
    //                  "_id": "66ac8b70cb563f0052175a37",
    //                  "name": "Брусника - 15"
    //              },
    //              "from": {
    //                  "railway_station_name": "Киевский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f45",
    //                      "name": "москва"
    //                  },
    //                  "datetime": 1673075448
    //              },
    //              "to": {
    //                  "railway_station_name": "Ладожский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f46",
    //                      "name": "санкт-петербург"
    //                  },
    //                  "datetime": 1673294388
    //              },
    //              "price_info": {
    //                  "third": {
    //                      "top_price": 2825,
    //                      "bottom_price": 4455,
    //                      "side_price": 3985
    //                  }
    //              }
    //          }
    //      },
    //      {
    //          "have_first_class": false,
    //          "have_second_class": false,
    //          "have_third_class": false,
    //          "have_fourth_class": false,
    //          "have_wifi": false,
    //          "have_air_conditioning": false,
    //          "is_express": false,
    //          "min_price": 3005,
    //          "available_seats": 96,
    //          "available_seats_info": {
    //              "third": 96
    //          },
    //          "departure": {
    //              "_id": "66ac8b92cb563f005217753f",
    //              "have_first_class": false,
    //              "have_second_class": false,
    //              "have_third_class": true,
    //              "have_fourth_class": false,
    //              "have_wifi": true,
    //              "have_air_conditioning": true,
    //              "is_express": false,
    //              "min_price": 3005,
    //              "duration": 61860,
    //              "available_seats": 96,
    //              "available_seats_info": {
    //                  "third": 96
    //              },
    //              "train": {
    //                  "_id": "66ac8b70cb563f0052175a03",
    //                  "name": "undefined - 11"
    //              },
    //              "from": {
    //                  "railway_station_name": "Киевский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f45",
    //                      "name": "москва"
    //                  },
    //                  "datetime": 1673161654
    //              },
    //              "to": {
    //                  "railway_station_name": "Московский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f46",
    //                      "name": "санкт-петербург"
    //                  },
    //                  "datetime": 1673223514
    //              },
    //              "price_info": {
    //                  "third": {
    //                      "top_price": 3435,
    //                      "bottom_price": 3005,
    //                      "side_price": 3215
    //                  }
    //              }
    //          }
    //      },
    //      {
    //          "have_first_class": false,
    //          "have_second_class": false,
    //          "have_third_class": false,
    //          "have_fourth_class": false,
    //          "have_wifi": false,
    //          "have_air_conditioning": false,
    //          "is_express": false,
    //          "min_price": 647,
    //          "available_seats": 173,
    //          "available_seats_info": {
    //              "second": 64,
    //              "third": 48,
    //              "fourth": 62
    //          },
    //          "departure": {
    //              "_id": "66ac8b81cb563f0052176799",
    //              "have_first_class": false,
    //              "have_second_class": true,
    //              "have_third_class": true,
    //              "have_fourth_class": true,
    //              "have_wifi": true,
    //              "have_air_conditioning": true,
    //              "is_express": false,
    //              "min_price": 647,
    //              "duration": 149100,
    //              "available_seats": 173,
    //              "available_seats_info": {
    //                  "second": 64,
    //                  "third": 48,
    //                  "fourth": 62
    //              },
    //              "train": {
    //                  "_id": "66ac8b6ecb563f00521758c6",
    //                  "name": "Ураган - 86"
    //              },
    //              "from": {
    //                  "railway_station_name": "Белорусский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f45",
    //                      "name": "москва"
    //                  },
    //                  "datetime": 1673167577
    //              },
    //              "to": {
    //                  "railway_station_name": "Московский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f46",
    //                      "name": "санкт-петербург"
    //                  },
    //                  "datetime": 1673316677
    //              },
    //              "price_info": {
    //                  "second": {
    //                      "top_price": 1725,
    //                      "bottom_price": 2712
    //                  },
    //                  "third": {
    //                      "top_price": 4380,
    //                      "bottom_price": 4110,
    //                      "side_price": 4020
    //                  },
    //                  "fourth": {
    //                      "top_price": 722,
    //                      "bottom_price": 647
    //                  }
    //              }
    //          }
    //      },
    //      {
    //          "have_first_class": false,
    //          "have_second_class": false,
    //          "have_third_class": false,
    //          "have_fourth_class": false,
    //          "have_wifi": false,
    //          "have_air_conditioning": false,
    //          "is_express": false,
    //          "min_price": 533,
    //          "available_seats": 93,
    //          "available_seats_info": {
    //              "second": 32,
    //              "fourth": 62
    //          },
    //          "departure": {
    //              "_id": "66ac8b7dcb563f0052176485",
    //              "have_first_class": false,
    //              "have_second_class": true,
    //              "have_third_class": false,
    //              "have_fourth_class": true,
    //              "have_wifi": true,
    //              "have_air_conditioning": true,
    //              "is_express": false,
    //              "min_price": 533,
    //              "duration": 376620,
    //              "available_seats": 93,
    //              "available_seats_info": {
    //                  "second": 32,
    //                  "fourth": 62
    //              },
    //              "train": {
    //                  "_id": "66ac8b6ecb563f00521758d0",
    //                  "name": "Ураган - 47"
    //              },
    //              "from": {
    //                  "railway_station_name": "Ленинградский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f45",
    //                      "name": "москва"
    //                  },
    //                  "datetime": 1673201234
    //              },
    //              "to": {
    //                  "railway_station_name": "Московский",
    //                  "city": {
    //                      "_id": "66ac8b69cb563f0052174f46",
    //                      "name": "санкт-петербург"
    //                  },
    //                  "datetime": 1673577854
    //              },
    //              "price_info": {
    //                  "second": {
    //                      "top_price": 1812,
    //                      "bottom_price": 2310
    //                  },
    //                  "fourth": {
    //                      "top_price": 770,
    //                      "bottom_price": 533}}}}]};
    //  return data;

      try {
         const response = await fetch(url);

         if (!response.ok) {
            throw new Error('Server Error');
         }
         const data = await response.json();

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   routes: [],
   status: null,
   error: null,
   total_count: 0,
};
const routes = createSlice({
   name: 'routes',
   initialState,
   reducers: {
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchRoutes.pending, (state) => {
            state.status = 'pending';
            state.error = null;
         })
         .addCase(fetchRoutes.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.routes = action.payload.items;
            state.total_count = action.payload.total_count;
         })
         .addCase(fetchRoutes.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
         });
   }
});

export default routes.reducer;