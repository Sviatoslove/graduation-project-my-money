import { createSlice } from "@reduxjs/toolkit";
import countsService from "../services/counts.service";
import countsDataService from "../services/countsData.service";
import countsIconsDataService from "../services/countsIconsData.service";
import currencyDataService from "../services/currencyData.service";

const countsSlice = createSlice({
  name: "counts",
  initialState: {
    entities: null,
    isLoading: false,
    error: null,
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
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
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
    },
    countsRemovedReceived: (state, action) => {
      delete state.entities[action.payload.countId];
    },
    countsDataRequested: (state) => {
      state.isLoading = true;
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
    countsIconsDataRequested: (state) => {
      state.isLoading = true;
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
    currencyDataRequested: (state) => {
      state.isLoading = true;
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
    countsUpdatedByTranslation: (state, action) => {
      const { fromCount, toCount, balanceFrom, balanceTo } = action.payload;
      if (fromCount !== "0") {
        const countFrom = state.entities[fromCount];
        countFrom.balance = Number(countFrom.balance) - Number(balanceFrom);
      }
      const countTo = state.entities[toCount];
      countTo.balance = Number(countTo.balance) + Number(balanceTo);
    },
    countsUpdatedByOperation: (state, action) => {
      const { countId, balance, status } = action.payload;
      const count = state.entities[countId];
      if (status === "increment")
        count.balance = Number(count.balance) + Number(balance);
      else count.balance = Number(count.balance) - Number(balance);
    },
  },
});

const { reducer: countsReducer, actions } = countsSlice;

const {
  countsRequested,
  countsReceived,
  countsRequestedFailed,
  countsUpdatedReceived,
  countsRemovedReceived,
  countsDataRequested,
  countsDataReceived,
  countsDataRequestedFailed,
  countsIconsDataRequested,
  countsIconsDataReceived,
  countsIconsDataRequestedFailed,
  currencyDataRequested,
  currencyDataReceived,
  currencyDataRequestedFailed,
  countsDataRemoved,
  countsUpdatedByTranslation,
  countsUpdatedByOperation,
} = actions;

export const countCreate = (payload) => async (dispatch) => {
  dispatch(countsRequested());
  try {
    const { content } = await countsService.create(payload);
    dispatch(countsReceived(content));
  } catch (error) {
    dispatch(countsRequestedFailed(error.message));
  }
};

export const countsLoad = () => async (dispatch) => {
  dispatch(countsRequested());
  try {
    const { content } = await countsService.get();
    dispatch(countsReceived(content));
  } catch (error) {
    dispatch(countsRequestedFailed(error.message));
  }
};

export const countUpdate = (payload) => async (dispatch) => {
  dispatch(countsRequested());
  try {
    const { content } = await countsService.update(payload);
    dispatch(countsUpdatedReceived(content));
  } catch (error) {
    dispatch(countsRequestedFailed(error.message));
  }
};

export const countsUpdateAfterTranslation = (payload) => async (dispatch) => {
  dispatch(countsUpdatedByTranslation(payload));
};

export const countsUpdateAfterOperation = (payload) => async (dispatch) => {
  dispatch(countsUpdatedByOperation(payload));
};

export const countRemove = (payload) => async (dispatch) => {
  dispatch(countsRequested());
  try {
    await countsService.remove(payload.countId);
    dispatch(countsRemovedReceived(payload));
  } catch (error) {
    dispatch(countsRequestedFailed(error.message));
  }
};

export const countsDestroyed = () => async (dispatch) => {
  dispatch(countsDataRemoved());
};

export const loadCountsData = () => async (dispatch) => {
  dispatch(countsDataRequested());
  try {
    const { content } = await countsDataService.get();
    dispatch(countsDataReceived(content));
  } catch (error) {
    dispatch(countsDataRequestedFailed(error.message));
  }
};

export const loadCountsIconsData = () => async (dispatch) => {
  dispatch(countsIconsDataRequested());
  try {
    const { content } = await countsIconsDataService.get();
    dispatch(countsIconsDataReceived(content));
  } catch (error) {
    dispatch(countsIconsDataRequestedFailed(error.message));
  }
};

export const loadcurrencyData = () => async (dispatch) => {
  dispatch(currencyDataRequested());
  try {
    const { content } = await currencyDataService.get();
    dispatch(currencyDataReceived(content));
  } catch (error) {
    dispatch(currencyDataRequestedFailed(error.message));
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
