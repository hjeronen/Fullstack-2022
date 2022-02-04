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

const Languages = ({ languages }) => {
  const languagesArray = Object.values(languages)
  return (
    <div>
      <h3>languages:</h3>
      <ul>
        {languagesArray.map((language, i) => <li key={i}>{language}</li>)}
      </ul>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={''} width={'150'} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [country, setCountry] = useState('all')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/' + country)
      .then(response => {
        setCountries(response.data)
      })
  }, [country])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value === '') {
      setCountry('all')
    } else {
      setCountry('name/' + event.target.value)
    }
  }

  const countriesToShow = () => {
    if (countries.length === 1) {
      return <Country country={countries[0]} />
    } else if (countries.length > 10) {
      return 'Too many matches, specify another filter'
    } else {
      return countries.map((country, i) => {
        return (
          <div>
            <li key={i}>
              {country.name.common} <button key={country.name.common} onClick={() => setCountry('name/' + country.name.common)}>show</button>
              </li>
          </div>
        )})
    }
  }

  return (
    <div>
      <Filter filter={newFilter} handler={handleFilterChange} />
      {countriesToShow()}
    </div>
  )

}

export default App