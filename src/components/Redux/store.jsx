import { configureStore } from "@reduxjs/toolkit";
import cities from "./cities";
import routes from "./routes";
import filter from "./filter";
import seats from "./seats";
import passengers from "./passengers";
import order from "./order";
import subscribe from "./subscribe";

export default  configureStore({
  reducer: {
    cities: cities,
    routes: routes,
    filter: filter,
    seats: seats,
    passengers: passengers,
    order: order,
    subscribe: subscribe,
  },
});