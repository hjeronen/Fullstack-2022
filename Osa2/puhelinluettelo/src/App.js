import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
