import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { notify } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notify(content))
    setTimeout(() => {
      dispatch(notify(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer