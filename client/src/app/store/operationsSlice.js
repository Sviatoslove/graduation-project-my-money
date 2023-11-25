import { createSlice } from '@reduxjs/toolkit';
import operationsService from '../services/operations.service';
import { countUpdate, countsUpdateAfterOperation } from './countsSlice';
import { setError, setSuccessNetwork } from './usersSlice';

const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    entities: null,
    isLoading: false,
    dataLoaded: null,
  },
  reducers: {
    operationsRequested: (state) => {
      state.isLoading = true;
    },
    operationsReceived: (state, action) => {
      const { payload } = action;
      if (!Object.keys(payload).length) {
        state.isLoading = false;
        return;
      }
      state.entities = payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    operationAdded: (state, action) => {
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
    operationsRequestedFailed: (state) => {
      state.isLoading = false;
    },
    operationsUpdatedReceived: (state, action) => {
      state.entities[action.payload._id] = {
        ...state.entities[action.payload._id],
        ...action.payload,
      };
      state.isLoading = false;
    },
    operationsRemovedReceived: (state, action) => {
      delete state.entities[action.payload];
      if (!Object.keys(state.entities).length) state.dataLoaded = false;
      state.isLoading = false;
    },
    operationsDataRemoved: (state) => {
      state.entities = null;
      state.dataLoaded = false;
      state.isLoading = false;
    },
  },
});

const { reducer: operationsReducer, actions } = operationsSlice;

const {
  operationsRequested,
  operationsReceived,
  operationAdded,
  operationsRequestedFailed,
  operationsUpdatedReceived,
  operationsRemovedReceived,
  operationsDataRemoved,
} = actions;

export const operationCreate =
  ({ payload, contentError }) =>
  async (dispatch) => {
    dispatch(operationsRequested());
    try {
      const { content } = await operationsService.create(payload);
      dispatch(operationAdded(content['newOperation']));
      dispatch(countsUpdateAfterOperation(content['count']));
      dispatch(setSuccessNetwork('Операция успешно создана'));
    } catch (error) {
      if (contentError === null) {
        const newError = {
          response: {
            data: {
              error: {
                message:
                  'На сервере произошла ошибка. Операция не создана. Попробуйте выбрать главный счёт и повторите попытку.',
                code: 500,
              },
            },
          },
        };
        dispatch(setError(newError));
      } else dispatch(setError(error));
      dispatch(operationsRequestedFailed());
    }
  };

export const loadOperations = () => async (dispatch) => {
  dispatch(operationsRequested());
  try {
    const { content } = await operationsService.get();
    dispatch(operationsReceived(content));
  } catch (error) {
    dispatch(setError(error));
    dispatch(operationsRequestedFailed());
  }
};

export const operationUpdate = (payload) => async (dispatch) => {
  dispatch(operationsRequested());
  try {
    const { content } = await operationsService.update(payload);
    dispatch(operationsUpdatedReceived(content['operation']));
    dispatch(countUpdate(content['count']));
    dispatch(setSuccessNetwork('Операция успешно обновлена'));
  } catch (error) {
    dispatch(setError(error));
    dispatch(operationsRequestedFailed());
  }
};

export const operationRemove = (payload) => async (dispatch) => {
  dispatch(operationsRequested());
  try {
    const { content } = await operationsService.remove(payload);
    dispatch(operationsRemovedReceived(payload));
    dispatch(countUpdate(content));
    dispatch(setSuccessNetwork(['Операция успешно удалена', 'remove']));
  } catch (error) {
    dispatch(setError(error));
    dispatch(operationsRequestedFailed());
  }
};

export const operationsDestroyed = () => async (dispatch) => {
  dispatch(operationsDataRemoved());
};

export const selectOperations = () => (state) => state.operations.entities;
export const selectOperationsLoadingStatus = () => (state) =>
  state.operations.isLoading;
export const selectOperationsDataLoaded = () => (state) =>
  state.operations.dataLoaded;

export default operationsReducer;
