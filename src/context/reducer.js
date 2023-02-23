export const initialState = {
  user: {
    expiration: "",
    username: "",
    userid: "",
    token: "",
  },
  listClient: false,
  formClient: false,
  editClient: false,
  welcome: true,
  clients: [],
};

export const actionTypes = {
  LOGIN: "LOGIN",
  CREATE_CLIENT: "CREATE_CLIENT",
  GET_CLIENTS: "GET_CLIENTS",
  SHOW_FORM_CLIENT: "SHOW_FORM_CLIENT",
  SHOW_WELCOME: "SHOW_WELCOME",
};

//   export const getBasketTotal = (basket) => {
//     return basket?.reduce((amount, item) => item.price + amount, 0);
//   };

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
      };

    case "SHOW_FORM_CLIENT":
      return {
        ...state,
        listClient: false,
        formClient: true,
        editClient: false,
        welcome: false,
      };

    case "SHOW_WELCOME":
      return {
        ...state,
        listClient: false,
        formClient: false,
        editClient: false,
        welcome: true,
      };
    default:
      return state;
  }
};

export default reducer;
