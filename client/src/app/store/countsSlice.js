import { createSlice } from '@reduxjs/toolkit';
import countsService from '../services/counts.service';
import countsDataService from '../services/countsData.service';
import countsIconsDataService from '../services/countsIconsData.service';
import currencyDataService from '../services/currencyData.service';
import { setError, setSuccessNetwork } from './usersSlice';

const countsSlice = createSlice({
  name: 'counts',
  initialState: {
    entities: null,
    isLoading: true,
    dataLoaded: null,
    countsData: null,
    countsDataLoaded: null,
    countsIconsData: null,
    countsIconsDataLoaded: null,
    currencyDataLoaded: null,
    currencyData: null,
  },
  reducers: {
    countsRequested: (state) => {
      state.isLoading = true;
    },
    countsReceived: (state, action) => {
      const { payload } = action;
      if (!Object.keys(payload).length) {
        state.isLoading = false;
        return;
      }
      state.entities = payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    countAdded: (state, action) => {
      const { payload } = action;
      if (!state.entities) state.entities = { [payload._id]: payload };
      else
        state.entities = {
          ...state.entities,
          [payload._id]: payload,
        };
      state.isLoading = false;
      state.dataLoaded = true;
    },
    countsRequestedFailed: (state) => {
      state.isLoading = false;
    },
    countsUpdatedReceived: (state, action) => {
      state.entities[action.payload._id] = {
        ...state.entities[action.payload._id],
        ...action.payload,
      };
    },
    countsRemovedReceived: (state, action) => {
      delete state.entities[action.payload];
      if (!Object.keys(state.entities).length) {
        state.entities = null;
        state.dataLoaded = false;
      }
    },
    countsDataReceived: (state, action) => {
      state.countsData = action.payload;
      state.isLoading = false;
      state.countsDataLoaded = true;
    },
    countsDataRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    countsIconsDataReceived: (state, action) => {
      state.countsIconsData = action.payload;
      state.isLoading = false;
      state.countsIconsDataLoaded = true;
    },
    countsIconsDataRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    currencyDataReceived: (state, action) => {
      state.currencyData = action.payload;
      state.isLoading = false;
      state.currencyDataLoaded = true;
    },
    currencyDataRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    countsDataRemoved: (state) => {
      state.entities = null;
      state.dataLoaded = false;
    },
    countsUpdateByTranslation: (state, action) => {
      if (action.payload.countFrom) {
        state.entities[action.payload.countFrom._id] = {
          ...state.entities[action.payload.countFrom._id],
          ...action.payload.countFrom,
        };
      }
      state.entities[action.payload.countTo._id] = {
        ...state.entities[action.payload.countTo._id],
        ...action.payload.countTo,
      };
    },
  },
});

const { reducer: countsReducer, actions } = countsSlice;

const {
  countsRequested,
  countsReceived,
  countAdded,
  countsRequestedFailed,
  countsUpdatedReceived,
  countsRemovedReceived,
  countsDataReceived,
  countsIconsDataReceived,
  currencyDataReceived,
  countsDataRemoved,
  countsUpdateByTranslation,
} = actions;

export const countCreate = (payload) => async (dispatch) => {
  dispatch(countsRequested());
  try {
    const { content } = await countsService.create(payload);
    dispatch(countAdded(content));
    dispatch(setSuccessNetwork('Счёт успешно создан'));
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const loadCounts = () => async (dispatch) => {
  try {
    const { content } = await countsService.get();
    dispatch(countsReceived(content));
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const countUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await countsService.update(payload);
    dispatch(countsUpdatedReceived(content));
    dispatch(setSuccessNetwork('Счёт успешно обновлён'));
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const countsUpdateAfterTranslation = (payload) => async (dispatch) => {
  dispatch(countsUpdateByTranslation(payload));
};

export const countsUpdateAfterOperation = (payload) => async (dispatch) => {
  dispatch(countsUpdatedReceived(payload));
};

export const countsUpdateAfterDeleteTranslation =
  (payload) => async (dispatch) => {
    dispatch(countsUpdateByTranslation(payload));
  };

export const countsUpdateDeleteOperation = (payload) => async (dispatch) => {
  dispatch(countsReceived(payload));
};

export const countRemove = (payload) => async (dispatch) => {
  try {
    const { content } = await countsService.remove(payload);
    dispatch(countsRemovedReceived({ payload }));
    dispatch(
      setSuccessNetwork([
        `Счёт успешно удалён. Вместе с ним удалено: операций в количестве: ${content.deletedOperations} шт; переводов в количестве: ${content.deletedTranslations} шт.`, 'remove',
      ])
    );
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const countsDestroyed = () => async (dispatch) => {
  dispatch(countsDataRemoved());
};

export const loadCountsData = () => async (dispatch) => {
  try {
    const { content } = await countsDataService.get();
    dispatch(countsDataReceived(content));
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const loadCountsIconsData = () => async (dispatch) => {
  try {
    const { content } = await countsIconsDataService.get();
    dispatch(countsIconsDataReceived(content));
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const loadcurrencyData = () => async (dispatch) => {
  try {
    const { content } = await currencyDataService.get();
    dispatch(currencyDataReceived(content));
  } catch (error) {
    dispatch(setError(error));
    dispatch(countsRequestedFailed());
  }
};

export const selectCounts = () => (state) => state.counts.entities;
export const selectCountsData = () => (state) => state.counts.countsData;
export const selectCountsIconsData = () => (state) =>
  state.counts.countsIconsData;
export const selectCurrencyData = () => (state) => state.counts.currencyData;

export const selectCountsLoadingStatus = () => (state) =>
  state.counts.isLoading;
export const selectCountsStatus = () => (state) => state.counts.dataLoaded;
export const selectCountsDataStatus = () => (state) =>
  state.counts.countsDataLoaded;
export const selectCurrencyDataStatus = () => (state) =>
  state.counts.currencyDataLoaded;
export const selectCountsIconsDataStatus = () => (state) =>
  state.counts.countsIconsDataLoaded;

export default countsReducer;
