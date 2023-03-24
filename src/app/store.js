// single store
import { configureStore } from "@reduxjs/toolkit";
import amountReducer from "./features/amount/amountSlice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  amount: amountReducer,
  transaction: trasactionReducer,
  limit: limitSlice,
  category: categorySlice,
  form: formSlice,
  time: timeSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

import trasactionReducer from "./features/transactions/transactionSlice";
import categorySlice from "./features/transactions/categorySlice";
import limitSlice from "./features/limit/limitSlice";
import formSlice from "./features/transactions/formSlice";
import timeSlice from "./features/transactions/timeSlice";
export const store = configureStore({
  reducer: persistedReducer,
  middleware: []
});
