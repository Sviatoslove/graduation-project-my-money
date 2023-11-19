import { createSlice } from '@reduxjs/toolkit';
import categoriesService from '../services/categories.service';
import categoriesIconsService from '../services/categoriesIcons.service';
import localStorageService from '../services/localStorage.service';
import errorCatcher from '../utils/errorCatcher';
import { setErrorLoad } from './usersSlice';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    successNetwork: null,
    dataLoaded: null,
    categoriesIcons: null,
    categoriesIconsDataLoaded: null,
  },
  reducers: {
    categoriesReceived: (state, action) => {
      const { payload } = action;
      if (!Object.keys(payload).length) return;
      state.entities = payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    categoryAdded: (state, action) => {
      const { payload } = action;
      if (!Object.keys(payload).length) {
        state.isLoading = false;
        return;
      }
      if (!state.entities) state.entities = { [payload._id]: payload };
      else state.entities = { ...state.entities, [payload._id]: payload };
      state.isLoading = false;
      state.dataLoaded = true;
      state.successNetwork = 'Категория успешно создана';
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
      state.successNetwork = 'Категория успешно обновлена';
    },
    categoriesRemovedReceived: (state, action) => {
      delete state.entities[action.payload];
      if (!Object.keys(state.entities).length) {
        state.entities = null;
        state.dataLoaded = false;
      }
      state.successNetwork = { type: 'remove', content:'Категория успешно удалена'}
    },
    categoriesIconsReceived: (state, action) => {
      state.categoriesIcons = action.payload;
      state.isLoading = false;
      state.categoriesIconsDataLoaded = true;
    },
    categoriesIconsUpdatedReceived: (state, action) => {
      state.categoriesIcons[action.payload._id] = {
        ...state.categoriesIcons[action.payload._id],
        ...action.payload,
      };
    },
    categoriesIconsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    categoriesDataRemoved: (state) => {
      state.entities = null;
      state.dataLoaded = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSuccessNetwork: (state) => {
      state.successNetwork = null;
    },
  },
});

const { reducer: categoriesReducer, actions } = categoriesSlice;

const {
  categoriesReceived,
  categoryAdded,
  categoriesRequestedFailed,
  categoriesUpdatedReceived,
  categoriesRemovedReceived,
  categoriesDataRemoved,
  categoriesIconsReceived,
  categoriesIconsRequestedFailed,
  categoriesIconsUpdatedReceived,
  clearError,
  resetSuccessNetwork,
} = actions;

export const categoriesCreate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.create(payload);
    dispatch(categoryAdded(content));
    localStorageService.setCategoriesData('true');
  } catch (error) {
    errorCatcher(error, dispatch, categoriesRequestedFailed);
  }
};

export const loadCategories = () => async (dispatch) => {
  try {
    const { content } = await categoriesService.get();
    dispatch(categoriesReceived(content));
  } catch (error) {
    // errorCatcher(error, dispatch, categoriesRequestedFailed);
    dispatch(setErrorLoad(error))
  }
};

export const categoriesUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.update(payload);
    dispatch(categoriesUpdatedReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, categoriesRequestedFailed);
  }
};

export const categoriesRemove = (payload) => async (dispatch) => {
  try {
    await categoriesService.remove(payload);
    dispatch(categoriesRemovedReceived(payload));
  } catch (error) {
    errorCatcher(error, dispatch, categoriesRequestedFailed);
  }
};

export const categoriesDestroyed = () => async (dispatch) => {
  dispatch(categoriesDataRemoved());
  localStorageService.removeCategoriesData();
};

export const loadСategoriesIcons = () => async (dispatch) => {
  try {
    const { content } = await categoriesIconsService.get();
    dispatch(categoriesIconsReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, categoriesIconsRequestedFailed);
  }
};

export const categoriesIconsUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesIconsService.update(payload);
    dispatch(categoriesIconsUpdatedReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, categoriesIconsRequestedFailed);
  }
};

export const clearErrorCategories = (data) => async (dispatch) => {
  dispatch(clearError(data));
};

export const clearSuccessNetworkCategories = (data) => async (dispatch) => {
  dispatch(resetSuccessNetwork(data));
};

export const selectCategoriesDataloaded = () => (state) =>
  state.categories.dataLoaded;
export const selectCategoriesIsLoading = () => (state) =>
  state.categories.isLoading;
export const selectCategories = () => (state) => state.categories.entities;

export const selectCategoriesIconsDataloaded = () => (state) =>
  state.categories.categoriesIconsDataLoaded;
export const selectCategoriesIcons = () => (state) =>
  state.categories.categoriesIcons;
export const selectErrorCategories = () => (state) => state.categories.error;
export const selectSuccessNetworkCategories = () => (state) =>
  state.categories.successNetwork;

export default categoriesReducer;
