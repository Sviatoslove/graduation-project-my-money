import { createSlice } from '@reduxjs/toolkit';
import countsService from '../services/counts.service';
import countsDataService from '../services/countsData.service';
import countsIconsDataService from '../services/countsIconsData.service';
import currencyDataService from '../services/currencyData.service';
import errorCatcher from '../utils/errorCatcher';

const countsSlice = createSlice({
  name: 'counts',
  initialState: {
    entities: null,
    isLoading: true,
    successNetwork: null,
    error: null,
    dataLoaded: null,
    countsData: null,
    countsDataLoaded: null,
    countsIconsData: null,
    countsIconsDataLoaded: null,
    currencyDataLoaded: null,
    currencyData: null,
    masterCount: null,
  },
  reducers: {
    countsRequested: (state) => {
      state.isLoading = true;
      state.successNetwork = null;
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
      state.successNetwork = 'Счёт успешно создан';
    },
    countsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    countsUpdatedReceived: (state, action) => {
      state.entities[action.payload._id] = {
        ...state.entities[action.payload._id],
        ...action.payload,
      };
      state.successNetwork = 'Счёт успешно обновлён';
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
    clearError: (state) => {
      state.error = null;
    },
    resetSuccessNetwork: (state) => {
      state.successNetwork = null;
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
  countsDataRequestedFailed,
  countsIconsDataReceived,
  countsIconsDataRequestedFailed,
  currencyDataReceived,
  currencyDataRequestedFailed,
  countsDataRemoved,
  countsUpdateByTranslation,
  clearError,
  resetSuccessNetwork,
} = actions;

export const countCreate = (payload) => async (dispatch) => {
  dispatch(countsRequested());
  try {
    const { content } = await countsService.create(payload);
    dispatch(countAdded(content));
  } catch (error) {
    errorCatcher(error, dispatch, countsRequestedFailed);
  }
};

export const loadCounts = () => async (dispatch) => {
  try {
    const { content } = await countsService.get();
    dispatch(countsReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, countsRequestedFailed);
  }
};

export const countUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await countsService.update(payload);
    dispatch(countsUpdatedReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, countsRequestedFailed);
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
    await countsService.remove(payload);
    dispatch(countsRemovedReceived(payload));
  } catch (error) {
    errorCatcher(error, dispatch, countsRequestedFailed);
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
    errorCatcher(error, dispatch, countsDataRequestedFailed);
  }
};

export const loadCountsIconsData = () => async (dispatch) => {
  try {
    const { content } = await countsIconsDataService.get();
    dispatch(countsIconsDataReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, countsIconsDataRequestedFailed);
  }
};

export const loadcurrencyData = () => async (dispatch) => {
  try {
    const { content } = await currencyDataService.get();
    dispatch(currencyDataReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, currencyDataRequestedFailed);
  }
};

export const clearErrorCounts = (data) => async (dispatch) => {
  dispatch(clearError(data));
};

export const clearSuccessNetworkCounts = (data) => async (dispatch) => {
  dispatch(resetSuccessNetwork(data));
};

export const selectCounts = () => (state) => state.counts.entities;
export const selectCountsData = () => (state) => state.counts.countsData;
export const selectCountsIconsData = () => (state) =>
  state.counts.countsIconsData;
export const selectCurrencyData = () => (state) => state.counts.currencyData;

export const selectCountsLoadingStatus = () => (state) =>
  state.counts.isLoading;
export const selectCountsStatus = () => (state) => state.counts.dataLoaded;
export const selectErrorCounts = () => (state) => state.counts.error;
export const selectCountsDataStatus = () => (state) =>
  state.counts.countsDataLoaded;
export const selectCurrencyDataStatus = () => (state) =>
  state.counts.currencyDataLoaded;
export const selectCountsIconsDataStatus = () => (state) =>
  state.counts.countsIconsDataLoaded;
export const selectSuccessNetworkCounts = () => (state) =>
  state.counts.successNetwork;

export default countsReducer;
