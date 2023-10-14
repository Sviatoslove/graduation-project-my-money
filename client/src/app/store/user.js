import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken() ? 
{
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false
}:{
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true
    },
    userReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    userRequestedFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequested: (state) => {
      state.error = null
    },
    authRequestedSucess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
      state.isLoading = false
    },
    authRequestedFailed: (state, action) => {
      state.error = action.payload
    },
    userCreatedSucess: (state, action) => {
      state.entities = action.payload
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdatedSucess: (state, action) => {
      state.entities = {
        ...state.entities,
        ...action.payload
      }
    }
  }
})

const { actions, reducer: userReducer } = userSlice

const {
  userRequested,
  userReceived,
  userRequestedFailed,
  authRequested,
  authRequestedSucess,
  authRequestedFailed,
  userCreatedSucess,
  userLoggedOut,
  userUpdatedSucess
} = actions


const userCreateRequested = createAction('user/userCreateRequested')
const userCreatedFailed = createAction('user/userCreatedFailed')
const userUpdateRequested = createAction('user/userUpdateRequested')
const userUpdatedFailed = createAction('user/userUpdatedFailed')

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested())
  try {
    const { content } = await userService.create(payload)
    dispatch(userCreatedSucess(content))
    return content
  } catch (error) {
    console.log(error)
    dispatch(userCreatedFailed(error.message))
  }
}

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      dispatch(authRequestedSucess({ userId: data.localId }))
      localStorageService.setTokens(data)
      dispatch(
        createUser({
          _id: data.localId,
          email,
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      )
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        console.log('code:', code)
        // const errorMessage = generateAuthError(message)
        // dispatch(authRequestedFailed(errorMessage))
      }
    }
  }


export const logIn =
  ({ payload, path }) =>
  async (dispatch) => {
    const { email, password, ...rest } = payload
    const { redirect, navigate } = path
    dispatch(authRequested())
    try {
      const data = await authService.logIn({ email, password })
      dispatch(authRequestedSucess({ userId: data.localId }))
      localStorageService.setTokens({...data, ...rest})
      navigate(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestedFailed(errorMessage))
      }
    }
  }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const userUpdated = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdatedSucess(content))
    return content
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      dispatch(userUpdatedFailed(message))
    }
  }
}

export const loadUser = () => async (dispatch) => {
  dispatch(userRequested())
  try {
    const { content } = await userService.getCurrentUser()
    dispatch(userReceived(content))
    return content
  } catch (error) {
    dispatch(userRequestedFailed(error.message))
  }
}

export const selectIsLoggedIn = () => (state) => state.user.isLoggedIn
export const selectDataStatus = () => (state) => state.user.dataLoaded
export const selectUserLoadingStatus = () => (state) => state.user.isLoading
export const selectAuthError = () => (state) => state.user.error

export const selectUser = () => (state) => state.user.entities
export const selectUserId = () => (state) => state.user.auth.userId

export default userReducer
