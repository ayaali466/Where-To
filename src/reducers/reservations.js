function Reservations(state = {}, action) {
  switch (action.type) {
    case "AllReservations": {
      return action.payload;
    }
    case "place_reservations": {
      return { ...state, place_reservations: action.payload };
    }
    case "reservationDetails": {
      return { ...state, reservation_details: action.payload };
    }
    case "reservationDetails_Not_auth": {
      return { ...state, reservation_details_Not_Auth: action.payload };
    }
    case "add_reservation": {
      return { ...state, message: action.payload };
    }
    default: {
      return state;
    }
  }
}
export default Reservations;
