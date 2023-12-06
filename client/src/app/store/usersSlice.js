import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import errorCatcher from '../utils/errorCatcher';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      errorGlobal: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
      successNetwork: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      errorGlobal: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = { error: action.payload, type: 'auth' };
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSuccessNetwork: (state) => {
      state.successNetwork = null;
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload;
    },
    savedError: (state, action) => {
      state.error = action.payload;
    },
    savedSuccessNetwork: (state, action) => {
      state.successNetwork = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userUpdateSuccessed,
  resetSuccessNetwork,
  userUpdateFailed,
  savedError,
  savedSuccessNetwork,
} = actions;

const authRequested = createAction('users/authRequested');
const userUpdateRequested = createAction('users/userUpdateRequested');

export const logIn =
  ({ payload, path }) =>
  async (dispatch) => {
    const { email, password, stayOn } = payload;
    const { navigate, redirect } = path;
    dispatch(authRequested());
    try {
      const data = await authService.logIn({ email, password });
      dispatch(authRequestSuccess({ userId: data.userId }));
      localStorageService.setTokens({ ...data, stayOn });
      navigate(redirect);
    } catch (error) {
      errorCatcher(error, dispatch, authRequestFailed);
    }
  };

export const signUp =
  ({ payload, path }) =>
  async (dispatch) => {
    const { navigate, redirect } = path;
    dispatch(authRequested());
    try {
      const data = await authService.register(payload);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate(redirect);
    } catch (error) {
      errorCatcher(error, dispatch, authRequestFailed);
    }
  };

export const logOut = () => (dispatch) => {
  dispatch(userLoggedOut());
  localStorageService.removeAuthData();
};

export const loadUser = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    errorCatcher(error, dispatch, usersRequestFailed);
  }
};

export const updateUser = ({payload, type, iconCount}) => async (dispatch) => {
  let contentSuccessNetwork
  if(type) contentSuccessNetwork='Главный счёт успешно обновлён'
  else contentSuccessNetwork='Профиль успешно обновлён'
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdateSuccessed(content));
    dispatch(savedSuccessNetwork([contentSuccessNetwork, type, iconCount]));
  } catch (error) {
    errorCatcher(error, dispatch, userUpdateFailed);
  }
};

export const clearError = (data) => async (dispatch) => {
  dispatch(authRequested(data));
};

export const setError = (error) => async (dispatch) => {
  errorCatcher(error, dispatch, savedError);
};

export const setSuccessNetwork = (data) => async (dispatch) => {
  dispatch(savedSuccessNetwork(data));
};

export const clearSuccessNetwork = (data) => async (dispatch) => {
  dispatch(resetSuccessNetwork(data));
};

export const selectUser = () => (state) => state.users.entities;
export const selectIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const selectDataStatus = () => (state) => state.users.dataLoaded;
export const selectUserLoadingStatus = () => (state) => state.users.isLoading;
export const selectUserId = () => (state) => state.users.auth.userId;
export const selectError = () => (state) => state.users.error;
export const selectSuccessNetwork = () => (state) => state.users.successNetwork;

export default userReducer;
