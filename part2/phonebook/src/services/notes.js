import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = newObj => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}
const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}
const change = (person, newObj) => {
    const replacement = {name: newObj.name, number: newObj.number}
    console.log(replacement)
    return axios.put(`${baseUrl}/${person.id}`, replacement)
}




export default {getAll, create, remove, change}