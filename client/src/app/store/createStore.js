import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import avatarsReducer from "./avatarsSlice";
import countsReducer from "./countsSlice";
import translationsReducer from "./translationsSlice";
import categoriesReducer from "./categoriesSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  avatars: avatarsReducer,
  counts: countsReducer,
  translations: translationsReducer,
  categories: categoriesReducer,
});

export default function createStore() {
  return configureStore({ reducer: rootReducer });
}
