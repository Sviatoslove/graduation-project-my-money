import { createSlice } from '@reduxjs/toolkit';
import translationsService from '../services/translations.service';
import {
  countsUpdateAfterDeleteTranslation,
  countsUpdateAfterTranslation,
} from './countsSlice';
import errorCatcher from '../utils/errorCatcher';

const translationsSlice = createSlice({
  name: 'translations',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: null,
    successNetwork: null,
  },
  reducers: {
    translationsRequested: (state) => {
      state.successNetwork = 'Перевод создан успешно.';
    },
    translationsReceived: (state, action) => {
      const { payload } = action;
      if (!Object.keys(action.payload).length) return;
      if (!state.entities) state.entities = action.payload;
      else state.entities = { ...state.entities, [payload._id]: payload };
      state.isLoading = false;
      state.dataLoaded = true;
    },
    translationsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    translationsRemovedReceived: (state, action) => {
      delete state.entities[action.payload];
      state.isLoading = false;
      state.successNetwork = 'Перевод удалён успешно.';
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSuccessNetwork: (state) => {
      state.successNetwork = null;
    },
  },
});

const { reducer: translationsReducer, actions } = translationsSlice;

const {
  translationsRequested,
  translationsReceived,
  translationsRequestedFailed,
  translationsRemovedReceived,
  clearError,
  resetSuccessNetwork,
} = actions;

export const translationCreate = (payload) => async (dispatch) => {
  dispatch(translationsRequested());
  try {
    const { content } = await translationsService.create(payload);
    dispatch(translationsReceived(content['newTranslation']));
    dispatch(countsUpdateAfterTranslation(content['counts']));
  } catch (error) {
    errorCatcher(error, dispatch, translationsRequestedFailed);
  }
};

export const loadTranslations = () => async (dispatch) => {
  try {
    const { content } = await translationsService.get();
    dispatch(translationsReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, translationsRequestedFailed);
  }
};

export const translationRemove = (payload) => async (dispatch) => {
  try {
    const { content } = await translationsService.remove(payload);
    dispatch(translationsRemovedReceived(payload));
    dispatch(countsUpdateAfterDeleteTranslation(content['counts']));
  } catch (error) {
    errorCatcher(error, dispatch, translationsRequestedFailed);
  }
};

export const clearErrorTranslations = (data) => async (dispatch) => {
  dispatch(clearError(data));
};

export const clearSuccessNetworkTranslations = (data) => async (dispatch) => {
  dispatch(resetSuccessNetwork(data));
};

export const selectTranslations = () => (state) => state.translations.entities;
export const selectTranslationsDataLoaded = () => (state) =>
  state.translations.dataLoaded;
export const selectTranslationsLoadedStatus = () => (state) =>
  state.translations.isLoading;
export const selectErrorTranslations = () => (state) =>
  state.translations.error;
export const selectSuccessNetworkTranslations = () => (state) =>
  state.translations.successNetwork;

export default translationsReducer;
