import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import avatarsReducer from "./avatarsSlice";
import countsReducer from "./countsSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  avatars: avatarsReducer,
  counts: countsReducer
});

export default function createStore() {
  return configureStore({ reducer: rootReducer });
}
