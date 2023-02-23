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
  client: null,
  interest: [],
  error: false,
};

export const actionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
  CREATE_CLIENT: "CREATE_CLIENT",
  GET_CLIENTS: "GET_CLIENTS",
  GET_CLIENT_EDIT: "GET_CLIENT_EDIT",
  SHOW_FORM_CLIENT: "SHOW_FORM_CLIENT",
  SHOW_EDIT_CLIENT: "SHOW_EDIT_CLIENT",
  SHOW_LIST_CLIENTS: "SHOW_LIST_CLIENTS",
  SHOW_WELCOME: "SHOW_WELCOME",
  VALIDATE_SUCCESS: "VALIDATE_SUCCESS",
  VALIDATE_ERROR: "VALIDATE_ERROR",
  GET_INTEREST: "GET_INTEREST",
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "REGISTER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
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
        client: null,
        interest: [],
        error: false,
      };

    case "CREATE_CLIENT":
      return {
        ...state,
      };

    case "GET_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };

    case "GET_CLIENT_EDIT":
      return {
        ...state,
        client: action.payload,
      };

    case "SHOW_FORM_CLIENT":
      return {
        ...state,
        listClient: false,
        formClient: true,
        editClient: false,
        welcome: false,
      };

    case "SHOW_EDIT_CLIENT":
      return {
        ...state,
        listClient: false,
        formClient: false,
        editClient: true,
        welcome: false,
      };

    case "SHOW_LIST_CLIENTS":
      return {
        ...state,
        listClient: true,
        formClient: false,
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
    case "VALIDATE_SUCCESS":
      return {
        ...state,
        error: false,
      };
    case "VALIDATE_ERROR":
      return {
        ...state,
        error: true,
      };
    case "GET_INTEREST":
      return {
        ...state,
        interest: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
