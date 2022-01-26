import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Votes = ({ number }) => <p>has {number} votes</p>

const Anecdote = ({ anecdote }) => <p>{anecdote}</p>

const MostVotes = ({ votes, anecdotes }) => {
  let index = 0
  let max = 0
  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[i] > max) {
      index = i
      max = votes[i]
    }
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[index]} />
      <Votes number={votes[index]} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes number={votes[selected]} />
      <Button handleClick={handleClickVote} text='vote' />
      <Button handleClick={handleClickNext} text='anecdote' />
      <Header text='Anecdote with most votes' />
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
