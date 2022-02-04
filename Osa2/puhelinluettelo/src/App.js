import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handler }) => {
  return (
    <div>filter shown with <input 
      value={filter}
      onChange={handler}
      />
    </div>)
}

const PersonsForm = ({ name, number, submit, nameHandler, numberHandler}) => {
  return (
    <form onSubmit={submit}>
        <div>
          name: <input 
            value={name}
            onChange={nameHandler}
            />
        </div>
        <div>
          number: <input 
          value={number}
          onChange={numberHandler}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const numbersToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.startsWith(newFilter))

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName, number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>Add new number</h3>
      <PersonsForm name={newName} number={newNumber} submit={addName} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={numbersToShow} />
    </div>
  )

}

export default App
