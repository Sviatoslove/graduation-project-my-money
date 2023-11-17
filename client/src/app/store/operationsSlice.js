import { createSlice } from '@reduxjs/toolkit';
import operationsService from '../services/operations.service';
import { countUpdate, countsUpdateAfterOperation } from './countsSlice';
import errorCatcher from '../utils/errorCatcher';

const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: null,
    successNetwork:null
  },
  reducers: {
    operationsReceived: (state, action) => {
      const { payload } = action;
      if (!Object.keys(payload).length) return;
      state.entities = payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    operationAdded: (state, action) => {
      const { payload } = action;
      if (!Object.keys(payload).length) return;
      if (!state.entities) state.entities = {[payload._id]: payload};
      else state.entities = { ...state.entities, [payload._id]: payload };
      state.isLoading = false;
      state.dataLoaded = true;
      state.successNetwork = 'Операция успешно создана';
    },
    operationsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    operationsUpdatedReceived: (state, action) => {
      state.entities[action.payload._id] = {
        ...state.entities[action.payload._id],
        ...action.payload,
      };
      state.successNetwork = 'Операция успешно обновлена';
    },
    operationsRemovedReceived: (state, action) => {
      delete state.entities[action.payload];
      if (!Object.keys(state.entities).length) state.dataLoaded = false;
    },
    operationsDataRemoved: (state) => {
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

const { reducer: operationsReducer, actions } = operationsSlice;

const {
  operationsReceived,
  operationAdded,
  operationsRequestedFailed,
  operationsUpdatedReceived,
  operationsRemovedReceived,
  operationsDataRemoved,
  clearError,
  resetSuccessNetwork
} = actions;

export const operationCreate = (payload) => async (dispatch) => {
  try {
    const { content } = await operationsService.create(payload);
    dispatch(operationAdded(content['newOperation']));
    dispatch(countsUpdateAfterOperation(content['count']));
  } catch (error) {
    errorCatcher(error, dispatch, operationsRequestedFailed)
  }
};

export const loadOperations = () => async (dispatch) => {
  try {
    const { content } = await operationsService.get();
    dispatch(operationsReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, operationsRequestedFailed)
  }
};

export const operationUpdate = (payload) => async (dispatch) => {
  try {
    const { content } = await operationsService.update(payload);
    dispatch(operationsUpdatedReceived(content['operation']));
    dispatch(countUpdate(content['count']));
  } catch (error) {
    errorCatcher(error, dispatch, operationsRequestedFailed)
  }
};

export const operationRemove = (payload) => async (dispatch) => {
  try {
    const { content } = await operationsService.remove(payload);
    dispatch(operationsRemovedReceived(payload));
    dispatch(countUpdate(content));
  } catch (error) {
    errorCatcher(error, dispatch, operationsRequestedFailed)
  }
};

export const operationsDestroyed = () => async (dispatch) => {
  dispatch(operationsDataRemoved());
};

export const clearErrorOperations = (data) => async (dispatch) => {
  dispatch(clearError(data));
};

export const clearSuccessNetworkOperations = (data) => async (dispatch) => {
  dispatch(resetSuccessNetwork(data));
};

export const selectOperations = () => (state) => state.operations.entities;
export const selectOperationsLoadingStatus = () => (state) =>
  state.operations.isLoading;
export const selectOperationsDataLoaded = () => (state) =>
  state.operations.dataLoaded;
  export const selectSuccessNetworkOperations = () => (state) =>
  state.operations.successNetwork;
export const selectErrorOperations = () => (state) => state.operations.error;


export default operationsReducer;
