export const initialState = {
  user: {
    username: "",
    userid: "",
    token: "",
  },
};

export const actionTypes = {
  CREATE_CLIENT: "CREATE_CLIENT"
};

//   export const getBasketTotal = (basket) => {
//     return basket?.reduce((amount, item) => item.price + amount, 0);
//   };

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
