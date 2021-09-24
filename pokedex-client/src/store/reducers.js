import { SET_TOKEN, CLEAR_TOKEN } from "./actions";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { token: action.token };
    case CLEAR_TOKEN:
      return { token: null };
    default:
      return state;
  }
};

export default reducer;
