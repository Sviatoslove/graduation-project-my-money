import { createSlice } from '@reduxjs/toolkit';
import translationsService from '../services/translations.service';
import {
  countsUpdateAfterDeleteTranslation,
  countsUpdateAfterTranslation,
} from './countsSlice';
import { setError, setSuccessNetwork } from './usersSlice';

const translationsSlice = createSlice({
  name: 'translations',
  initialState: {
    entities: null,
    isLoading: true,
    dataLoaded: null,
  },
  reducers: {
    translationsReceived: (state, action) => {
      const { payload } = action;
      if (!Object.keys(action.payload).length) return;
      if (!state.entities) state.entities = action.payload;
      else state.entities = { ...state.entities, [payload._id]: payload };
      state.isLoading = false;
      state.dataLoaded = true;
    },
    translationsRequestedFailed: (state) => {
      state.isLoading = false;
    },
    translationsRemovedReceived: (state, action) => {
      delete state.entities[action.payload];
      state.isLoading = false;
    },
  },
});

const { reducer: translationsReducer, actions } = translationsSlice;

const {
  translationsRequested,
  translationsReceived,
  translationsRemovedReceived,
  translationsRequestedFailed
} = actions;

export const translationCreate = (payload) => async (dispatch) => {
  try {
    const { content } = await translationsService.create(payload);
    dispatch(translationsReceived(content['newTranslation']));
    dispatch(countsUpdateAfterTranslation(content['counts']));
    dispatch(setSuccessNetwork('Перевод создан успешно.'))
  } catch (error) {
    dispatch(setError(error))
    dispatch(translationsRequestedFailed())

  }
};

export const loadTranslations = () => async (dispatch) => {
  try {
    const { content } = await translationsService.get();
    dispatch(translationsReceived(content));
  } catch (error) {
    dispatch(setError(error))
    dispatch(translationsRequestedFailed())
  }
};

export const translationRemove = (payload) => async (dispatch) => {
  try {
    const { content } = await translationsService.remove(payload);
    dispatch(translationsRemovedReceived(payload));
    dispatch(countsUpdateAfterDeleteTranslation(content['counts']));
    dispatch(setSuccessNetwork(['Перевод удалён успешно.', 'remove']))
  } catch (error) {
    dispatch(setError(error))
    dispatch(translationsRequestedFailed())
  }
};

export const selectTranslations = () => (state) => state.translations.entities;
export const selectTranslationsDataLoaded = () => (state) =>
  state.translations.dataLoaded;
export const selectTranslationsLoadedStatus = () => (state) =>
  state.translations.isLoading;;

export default translationsReducer;
