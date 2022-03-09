import { createSlice } from '@reduxjs/toolkit'

const initialMessage = 'This is a notification.'

// const notificationSlice = createSlice({
//     name: 'notification',
//     initialMessage,
//     reducers: {
//       notify(state = initialMessage, action) {
//         return state
//       }
//     }
// })

// export const { notify } = notificationSlice.actions
// export default notificationSlice.reducer

const notificationReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state
        default:
            return state
    }
}

export const notify = () => {
    return {
        type: 'NOTIFY'
    }
}

export default notificationReducer