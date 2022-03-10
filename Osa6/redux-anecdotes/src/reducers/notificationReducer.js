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
export default notificationSlice.reducer