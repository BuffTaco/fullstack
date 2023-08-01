import axios from 'axios'
const baseUrl = '/api/persons'

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
    
    return axios.put(`${baseUrl}/${person.id}`, replacement).then(response=>response.data)
}




// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, remove, change}