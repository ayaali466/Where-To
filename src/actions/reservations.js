import axios from "axios";

// const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/reservations";

// const baseUrl = "http://localhost:1337/api/reservations";
const url = "https://node-airbnb.herokuapp.com/api/reservation";
const get_Place_reservations_url =
  "https://node-airbnb.herokuapp.com/api/placeReservations";
const get_Reservation_Details_Not_Auth =
  "https://node-airbnb.herokuapp.com/api/reservationNotAuth";

export async function getReservationByID(token, id) {
  var payload = null;
  try {
    let response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    payload = await response.json();
  } catch (e) {
    console.log(e);
  }
  return {
    type: "reservationDetails",
    payload,
  };
}
export async function getReservationByID_NotAuth(id) {
  //for calendar
  var payload = null;
  try {
    let response = await fetch(`${get_Reservation_Details_Not_Auth}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    payload = await response.json();
  } catch (e) {
    console.log(e);
  }
  return {
    type: "reservationDetails_Not_auth",
    payload,
  };
}
export async function getPlaceReservations(id) {
  var payload = null;
  try {
    let response = await fetch(`${get_Place_reservations_url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    payload = await response.json();
  } catch (e) {
    console.log(e);
  }
  return {
    type: "place_reservations",
    payload,
  };
}
export async function addReservation(token, id, reservation) {
  var payload = null;
  try {
    await axios
      .post(`${url}/${id}`, reservation, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        payload = "success";
      })
      .catch((err) => {
        payload = "fail";
      });
  } catch (e) {
    console.log(e);
  }
  return {
    type: "add_reservation",
    payload,
  };
}
