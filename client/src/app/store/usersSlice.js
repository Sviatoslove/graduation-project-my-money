import { createAction, createSlice } from '@reduxjs/toolkit'
import localStorageService from '../services/localStorage.service'
import authService from '../services/auth.service'
import userService from '../services/user.service'
// import { generetaAuthError } from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      state.entities = action.payload
    },
    authRequested: (state) => {
      state.error = null
    }
  }
})

const { reducer: userReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userUpdateSuccessed
} = actions

const authRequested = createAction('users/authRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')

export const logIn =
  ({ payload, path }) =>
  async (dispatch) => {
    const { email, password } = payload
    const { navigate, redirect } = path
    dispatch(authRequested())
    try {
      const data = await authService.logIn({ email, password })
      dispatch(authRequestSuccess({ userId: data.userId }))
      localStorageService.setTokens(data)
      navigate(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        console.log('code:', code)
        //   const errorMessage = generetaAuthError(message)
        //   dispatch(authRequestFailed(errorMessage))
        // } else {
        //   dispatch(authRequestFailed(error.message))
      }
    }
  }

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.userId }))
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const loadUser = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdateSuccessed(content))
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const updateUserByCount = (payload) => async (dispatch) => {
    console.log('payload:', payload)
    // dispatch(userUpdateSuccessed(payload))
}

export const selectUser = () => (state) => state.users.entities

export const selectIsLoggedIn = () => (state) => state.users.isLoggedIn
export const selectDataStatus = () => (state) => state.users.dataLoaded
export const selectUserLoadingStatus = () => (state) => state.users.isLoading
export const selectUserId = () => (state) => state.users.auth.userId
export const selectAuthError = () => (state) => state.users.error

export default userReducer
