import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default function createStore() {
  return configureStore({ reducer: rootReducer });
}
