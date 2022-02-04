import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, buttonAction }) => {
  return (
    <ul>
      {persons.map((person, i) => {
        return (
          <div>
            <li key={person.id}>{person.name} {person.number} <button key={person.id} onClick={() => buttonAction({person})}>delete</button></li>
          </div>
        )
      
      })}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
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
      // alert(`${newName} is already added to phonebook`)
      const person = persons.filter(person => person.name === newName)[0]
      setNumber({person, newNumber})
    } else {
      const newPerson = {
        name: newName, number: newNumber
      }

      personService
        .addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteEntry = ({ person }) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .deleteEntry(person.id)
        .then(id => {
          setPersons(persons.filter((personId => id !== personId)))
        })
    }
  }

  const setNumber = ({ person, newNumber }) => {
    const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    if (result) {
      const oldPerson = persons.find(p => p.id === person.id)
      const newPerson = { ...oldPerson, number: newNumber }
      personService
        .updateNumber(newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>Add new number</h3>
      <PersonsForm name={newName} number={newNumber} submit={addName} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={numbersToShow} buttonAction={deleteEntry} />
    </div>
  )

}

export default App
