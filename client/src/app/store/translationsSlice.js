import { createSlice } from '@reduxjs/toolkit'
import translationsService from '../services/translations.service'

const translationsSlice = createSlice({
  name: 'translations',
  initialState: {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: null,
  },
  reducers: {
    translationsRequested: (state) => {
      state.isLoading = true
    },
    translationsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    translationsRequestedFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    translationsRemovedReceived: (state, action) => {
      delete  state.entities[action.payload.countId]
    },
  }
})


const { reducer: translationsReducer, actions } = translationsSlice

const {
  translationsRequested,
  translationsReceived,
  translationsRequestedFailed,
  translationsRemovedReceived,
} = actions

export const translationCreate = (payload) => async (dispatch) => {
  dispatch(translationsRequested())
  try {
    const { content } = await translationsService.create(payload)
    dispatch(translationsReceived(content))
  } catch (error) {
    dispatch(translationsRequestedFailed(error.message))
  }
}

export const translationsLoad = () => async (dispatch) => {
  dispatch(translationsRequested())
  try {
    const { content } = await translationsService.get()
    dispatch(translationsReceived(content))
  } catch (error) {
    dispatch(translationsRequestedFailed(error.message))
  }
}

export const translationRemove = (payload) => async (dispatch) => {
  dispatch(translationsRequested())
  try {
    await translationsService.remove(payload.translationId)
    dispatch(translationsRemovedReceived(payload))
  } catch (error) {
    dispatch(translationsRequestedFailed(error.message))
  }
}


export default translationsReducer
