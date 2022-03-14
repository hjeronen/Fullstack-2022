import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: '', timeID: undefined }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      clearTimeout(state.timeID)
      state = action.payload
      return state
    }
  }
})

export const { notify } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    const notification = {
      content: content,
      timeID: setTimeout(() => {
        dispatch(notify({ content: '', timeID: undefined }))
      }, time * 1000)
    }
    dispatch(notify(notification))
  }
}

export default notificationSlice.reducer