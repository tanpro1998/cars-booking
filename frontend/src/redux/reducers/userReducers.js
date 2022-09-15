const initialState = {
  currentUser: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER": {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    case "LOG_OUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};
