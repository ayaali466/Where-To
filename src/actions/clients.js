import axios from "axios";

// const baseUrl = "http://localhost:1337/api/clients";
// const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/clients";

const url = "https://node-airbnb.herokuapp.com/api/client";
const update_pass_url = "https://node-airbnb.herokuapp.com/api/clientPassword";

export async function AllClients() {
  var payload = null;
  try {
    let url = "https://node-airbnb.herokuapp.com/api/clients";
    const res = await fetch(url);
    payload = await res.json();
  } catch (err) {
    console.log(err);
  }
  return { type: "AllClients2", payload };
}

export async function updateClient(token, client) {
  var payload = null;
  try {
    await axios
      .put(`${url}`, client, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        payload = "successUpdated";
      })
      .catch((err) => {
        payload = "fail To update";
      });
  } catch (e) {
    console.log(e);
  }
  return {
    type: "update_Client",
    payload,
  };
}
export async function updatePassword(token, clientPasswords) {
  var payload = null;
  try {
    await axios
      .put(`${update_pass_url}`, clientPasswords, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        payload = res;
      })
      .catch((err) => {
        payload = "Wrong password!";
      });
  } catch (e) {
    console.log(e);
  }
  return {
    type: "update_password",
    payload,
  };
}

export async function getclientById(token) {
  var payload = null;
  try {
    let response = await fetch(`${url}`, {
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
    type: "clientDetails",
    payload,
  };
}

export async function addclient(formData, url) {
  var payload = null;
  try {
    let response = await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        payload = response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
  return {
    type: "addClient",
    payload,
  };
}

export async function login(formData, url) {
  var payload = null;
  try {
    let response = await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        payload = response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
  return {
    type: "login",
    payload,
  };
}
