import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

  const dispatch = useDispatch()

  const voteAnecdote = ({ anecdote }) => {
    dispatch(vote(anecdote.id))
    dispatch(notify('you voted \'' + anecdote.content + '\''))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote({ anecdote })}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList