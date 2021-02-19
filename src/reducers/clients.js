function Clients(state = {}, action) {
  switch (action.type) {
    case "AllClients": {
      return action.payload;
    }
    case "update_password": {
      return { ...state, msg: action.payload };
    }
    case "AllClients2": {
      return action.payload;
    }
    case "update_Client": {
      return action.payload;
    }
    case "clientDetails": {
      return action.payload;
    }
    case "addClient": {
      return action.payload;
    }
    case "login": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
export default Clients;
