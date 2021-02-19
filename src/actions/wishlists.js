import axios from "axios";

// const baseUrl = "http://localhost:1337/api/wishlists";
const url = "https://node-airbnb.herokuapp.com/api/wishlist";

const deleteByID_url = "https://node-airbnb.herokuapp.com/api/wishlist";

const getById_url = "https://node-airbnb.herokuapp.com/api/wishlist";
// const Url = "http://localhost:1337/api/wishlist";

const baseUrl =
  "http://my-json-server.typicode.com/sondossamii/airbnb/wishlists";

const wishlistsUrl = "https://node-airbnb.herokuapp.com/api/wishlists";
// const wishlistsUrl = "https://node-airbnb.herokuapp.com/api/wishlists";

// const baseUrl = " http://localhost:2400/wishlists";

export async function getAllWishlists() {
  var payload = null;
  try {
    let response = await fetch(`${baseUrl}`);
    payload = await response.json();
  } catch (e) {
    console.log(e);
  }
  return {
    type: "AllWishlists",
    payload,
  };
}
export async function getWishlistByID(token, id) {
  var payload = null;
  try {
    let response = await fetch(`${getById_url}/${id}`, {
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
    type: "WishlistDetails",
    payload,
  };
}

export async function getWishlistsByUserId(token) {
  var payload = null;
  try {
    let response = await fetch(`${wishlistsUrl}`, {
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
    type: "Wishlist_By_user",
    payload,
  };
}
export async function deleteByID(id) {
  var payload = null;
  try {
    await axios
      .delete(`${url}/${id}`)
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
    type: "deleteByID",
    payload,
  };
}
export async function addWishlist(token, wishlist) {
  var payload = null;
  try {
    await axios
      .post(url, wishlist, {
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
    type: "addWishlist",
    payload,
  };
}
export async function deleteWishlistById(token, id) {
  var payload = null;
  try {
    await axios
      .delete(`${deleteByID_url}/${id}`, {
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
    type: "deleteByIDwithtoken",
    payload,
  };
}
