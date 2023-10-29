import { createSlice } from "@reduxjs/toolkit";
import avatarsService from "../services/avatars.service";
import { formatDataAvatars } from "../utils";

const avatarsSlice = createSlice({
  name: "avatars",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: null,
  },
  reducers: {
    avatarsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    avatarsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: avatarsReducer, actions } = avatarsSlice;

const { avatarsReceived, avatarsRequestedFailed } = actions;

export const loadAvatars = () => async (dispatch) => {
  try {
    const { content } = await avatarsService.getAvatars();
    const avatars = formatDataAvatars(12 ,content);
    dispatch(avatarsReceived(avatars));
  } catch (error) {
    dispatch(avatarsRequestedFailed(error.message));
  }
};

export const selectAvatars = () => (state) => state.avatars.entities;
export const selectAvatarsLoadingStatus = () => (state) =>
  state.avatars.isLoading;
export const selectAvatarsDataStatus = () => (state) =>
  state.avatars.dataLoaded;

export default avatarsReducer;
