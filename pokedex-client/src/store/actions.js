export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

export const setToken = (token) => {
  return { type: SET_TOKEN, token };
};

export const clearToken = (token) => {
  return { type: CLEAR_TOKEN, token };
};
