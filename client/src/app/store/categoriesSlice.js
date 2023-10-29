import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";
import categoriesIconsService from "../services/categoriesIcons.service";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: null,
    categoriesIcons: null,
    categoriesIconsDataLoaded: null,
  },
  reducers: {
    categoriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    categoriesRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    categoriesUpdatedReceived: (state, action) => {
      state.entities[action.payload._id] = {
        ...state.entities[action.payload._id],
        ...action.payload,
      };
    },
    categoriesRemovedReceived: (state, action) => {
      delete state.entities[action.payload.categoriesId];
    },
    categoriesIconsReceived: (state, action) => {
      state.categoriesIcons = action.payload;
      state.isLoading = false;
      state.categoriesIconsDataLoaded = true;
    },
    categoriesIconsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    categoriesDataRemoved: (state) => {
      state.entities = null;
      state.dataLoaded = false;
    },
  },
});

const { reducer: categoriesReducer, actions } = categoriesSlice;

const {
  categoriesReceived,
  categoriesRequestedFailed,
  categoriesUpdatedReceived,
  categoriesRemovedReceived,
  categoriesDataRemoved,
  categoriesIconsReceived,
  categoriesIconsRequestedFailed,
} = actions;

export const categoriesCreate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.create(payload);
    dispatch(categoriesReceived(content));
  } catch (error) {
    dispatch(categoriesRequestedFailed(error.message));
  }
};

export const loadCategories = () => async (dispatch) => {
  try {
    const { content } = await categoriesService.get();
    dispatch(categoriesReceived(content));
  } catch (error) {
    dispatch(categoriesRequestedFailed(error.message));
  }
};

export const categoriesUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.update(payload);
    dispatch(categoriesUpdatedReceived(content));
  } catch (error) {
    dispatch(categoriesRequestedFailed(error.message));
  }
};

export const categoriesRemove = (payload) => async (dispatch) => {
  try {
    await categoriesService.remove(payload.categoriesId);
    dispatch(categoriesRemovedReceived(payload));
  } catch (error) {
    dispatch(categoriesRequestedFailed(error.message));
  }
};

export const categoriesDestroyed = () => async (dispatch) => {
  dispatch(categoriesDataRemoved());
};

export const loadСategoriesIcons = () => async (dispatch) => {
  try {
    const { content } = await categoriesIconsService.get();
    dispatch(categoriesIconsReceived(content));
  } catch (error) {
    dispatch(categoriesIconsRequestedFailed(error.message));
  }
};

export const selectCategriesDataloaded = () => (state) => state.categories.dataLoaded;
export const selectCategriesIsLoading = () => (state) => state.categories.isLoading;
export const selectCategries = () => (state) => state.categories.entities;

export const selectCategriesIconsDataloaded = () => (state) =>
  state.categories.categoriesIconsDataLoaded;
export const selectCategriesIcons = () => (state) => state.categories.categoriesIcons;

export default categoriesReducer;
