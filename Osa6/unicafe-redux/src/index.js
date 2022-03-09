import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const all = (state) => state.good + state.ok + state.bad

  const average = (state) => Math.round(((state.good + (-1) * state.bad) / all(state)) * 100) / 100

  const positive = (state) => Math.round((state.good / all(state)) * 10000) / 100

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <h3>Statistics</h3>
      {all(store.getState()) === 0
        ? <div>No feedback given</div>
        :<div>
          <div>all {all(store.getState())}</div>
          <div>average {average(store.getState())}</div>
          <div>positive {positive(store.getState())} %</div>
        </div>
      }
      
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)