import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.data.id
//       const anecdote = state.find(a => a.id === id)
//       const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
//       return state.map(a => a.id !== id ? a : votedAnecdote).sort((a1, a2) => a2.votes - a1.votes)
//     case 'NEW_ANECDOTE':
//       const newAnecdote = asObject(action.data.content)
//       return [...state, newAnecdote].sort((a1, a2) => a2.votes - a1.votes)
//     default: return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: asObject(content)
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: {
//       id: id
//     }
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote).sort((a1, a2) => a2.votes - a1.votes)
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return state.map(a => a.id !== id ? a : votedAnecdote).sort((a1, a2) => a2.votes - a1.votes)
    }
  }
})

export const { createAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer