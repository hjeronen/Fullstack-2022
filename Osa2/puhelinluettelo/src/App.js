import { useState, useEffect } from 'react'
import personService from './services/persons'

const ErrorNotification = ({ message }) => {
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }

  return (
    <div className="error" style={error} >
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }

  return (
    <div className="success" style={success} >
      {message}
    </div>
  )
}


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
          <li key={person.id}>{person.name} {person.number} <button key={person.id} onClick={() => buttonAction({person})}>delete</button></li>
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
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
          const message = `Added ${newPerson.name}`
          showSuccess({ message })
        })
        .catch(error => {
          // const message = `Could not add entry ${newPerson.name}`
          showError(error.response.data)
        })
    }
  }

  const deleteEntry = ({ person }) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .deleteEntry(person)
        .then(result => {
          setPersons(persons.filter(p => person.id !== p.id))
          const message = `Successfully deleted entry ${person.name}`
          showSuccess({ message })
        })
        .catch(error => {
          const message = `Could not delete entry ${person.name}`
          setPersons(persons.filter(p => person.id !== p.id))
          showError({ message })
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
          setNewName('')
          setNewNumber('')
          const message = `Successfully changed person's ${person.name} number`
          showSuccess({ message })
        })
        .catch(error => {
          const message = `Information of ${person.name} has already been removed from the server`
          setPersons(persons.filter(p => person.id !== p.id))
          showError({ message })
        })
    }
  }

  const showSuccess = ({ message }) => {
    setSuccessMessage(message)
    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
    return timer
  }

  const showError = ({ message }) => {
    setErrorMessage(message)
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)
    return timer
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>Add new number</h3>
      <PersonsForm name={newName} number={newNumber} submit={addName} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={numbersToShow} buttonAction={deleteEntry} />
    </div>
  )

}

export default App
