import { createSlice } from '@reduxjs/toolkit';
import categoriesService from '../services/categories.service';
import categoriesIconsService from '../services/categoriesIcons.service';
import localStorageService from '../services/localStorage.service';
import { setError, setSuccessNetwork } from './usersSlice';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    entities: null,
    isLoading: true,
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
    },
    categoriesRequestedFailed: (state) => {
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
      if (!Object.keys(state.entities).length) {
        state.entities = null;
        state.dataLoaded = false;
      }
    },
    categoriesIconsReceived: (state, action) => {
      state.categoriesIcons = action.payload;
      state.isLoading = false;
      state.categoriesIconsDataLoaded = true;
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
  categoryAdded,
  categoriesRequestedFailed,
  categoriesUpdatedReceived,
  categoriesRemovedReceived,
  categoriesDataRemoved,
  categoriesIconsReceived,
} = actions;

export const categoriesCreate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.create(payload);
    dispatch(categoryAdded(content));
    dispatch(setSuccessNetwork('Категория успешно создана'));
    localStorageService.setCategoriesData('true');
  } catch (error) {
    dispatch(setError(error))
    dispatch(categoriesRequestedFailed())
  }
};

export const loadCategories = () => async (dispatch) => {
  try {
    const { content } = await categoriesService.get();
    dispatch(categoriesReceived(content));
  } catch (error) {
    dispatch(setError(error))
    dispatch(categoriesRequestedFailed())
  }
};

export const categoriesUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await categoriesService.update(payload);
    dispatch(categoriesUpdatedReceived(content));
    dispatch(setSuccessNetwork('Категория успешно обновлена'));
  } catch (error) {
    dispatch(setError(error))
    dispatch(categoriesRequestedFailed())
  }
};

export const categoriesRemove = (payload) => async (dispatch) => {
  try {
    await categoriesService.remove(payload);
    dispatch(categoriesRemovedReceived(payload));
    dispatch(setSuccessNetwork(['Категория успешно удалена', 'remove']));
  } catch (error) {
    dispatch(setError(error))
    dispatch(categoriesRequestedFailed())
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
    dispatch(setError(error))
    dispatch(categoriesRequestedFailed())
  }
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

export default categoriesReducer;
