import axios from 'axios'
const baseUrl = '/api/persons/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = person => {
    const request = axios.delete(baseUrl + person.id, person)
    return request.then(response => response.data)
}

const updateNumber = person => {
    const request = axios.put(baseUrl + person.id, person)
    return request.then(response => response.data)
}

export default {
    getAll,
    addPerson,
    deleteEntry,
    updateNumber
}