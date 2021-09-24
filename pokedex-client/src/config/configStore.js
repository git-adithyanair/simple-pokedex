// import { configureStore } from "@reduxjs/toolkit";
// import tokenReducer from "../store/tokenSlice";

// export default configureStore({
//   reducer: { token: tokenReducer },
// });

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "../store/reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export let store = createStore(persistedReducer);
export let persistor = persistStore(store);
