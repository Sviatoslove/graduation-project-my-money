import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";
import categoriesIconsService from "../services/categoriesIcons.service";
import localStorageService from "../services/localStorage.service";

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
      if(Object.keys(state.entities).length)state.dataLoaded = true;
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
      delete state.entities[action.payload];
      if(!Object.keys(state.entities).length) state.dataLoaded=false
    },
    categoriesIconsReceived: (state, action) => {
      console.log('action:', action)
      state.categoriesIcons = action.payload;
      state.isLoading = false;
      state.categoriesIconsDataLoaded = true;
    },
    categoriesIconsUpdatedReceived: (state, action) => {
        console.log('state.categoriesIcons:', state.categoriesIcons)
        console.log('action:', action)
      state.categoriesIcons[action.payload._id] = {
        ...state.categoriesIcons[action.payload._id],
        ...action.payload,
      };
      console.log(' state.categoriesIcons[action.payload._id]:',  state.categoriesIcons[action.payload._id])

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
  categoriesIconsUpdatedReceived
} = actions;

export const categoriesCreate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.create(payload);
    dispatch(categoriesReceived(content));
    localStorageService.setCategoriesData('true')
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
    await categoriesService.remove(payload);
    dispatch(categoriesRemovedReceived(payload));
  } catch (error) {
    dispatch(categoriesRequestedFailed(error.message));
  }
};

export const categoriesDestroyed = () => async (dispatch) => {
  dispatch(categoriesDataRemoved());
  localStorageService.removeCategoriesData()
};

export const loadСategoriesIcons = () => async (dispatch) => {
  try {
    const { content } = await categoriesIconsService.get();
    dispatch(categoriesIconsReceived(content));
  } catch (error) {
    dispatch(categoriesIconsRequestedFailed(error.message));
  }
};

export const categoriesIconsUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesIconsService.update(payload);
    dispatch(categoriesIconsUpdatedReceived(content));
  } catch (error) {
    dispatch(categoriesIconsRequestedFailed(error.message));
  }
};

export const selectCategoriesDataloaded = () => (state) => state.categories.dataLoaded;
export const selectCategoriesIsLoading = () => (state) => state.categories.isLoading;
export const selectCategories = () => (state) => state.categories.entities;

export const selectCategoriesIconsDataloaded = () => (state) =>
  state.categories.categoriesIconsDataLoaded;
export const selectCategoriesIcons = () => (state) => state.categories.categoriesIcons;

export default categoriesReducer;
