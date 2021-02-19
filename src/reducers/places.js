function Places(state = {}, action) {
  switch (action.type) {
    case "AllPlaces": {
      return action.payload;
    }
    case "Location": {
      var position = {
        lat: action.payload.coords.latitude,
        lng: action.payload.coords.longitude,
      };
      return position;
    }
    case "PlaceDetails": {
      return action.payload;
    }
    case "Place_Details": {
      return { ...state, place_details: action.payload };
    }
    case "addplace": {
      return { ...state, message: action.payload };
    }
    case "updatePlace": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
export default Places;
