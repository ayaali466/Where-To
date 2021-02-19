import { combineReducers } from "redux";
import Places from "./places";
import Wishlists from "./wishlists";
import Reservations from "./reservations";
import Clients from "./clients";
import Reviews from "./reviews";

export default combineReducers({
    Places,
    Wishlists,
    Reservations,
    Clients,
    Reviews
})