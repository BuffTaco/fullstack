import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = t => {
    token = `Bearer ${t}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = newObj => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.post(baseUrl, newObj, config)
    return request.then(response => response.data)
}
const change = (blog, newObj) => {
    const config = {
        headers: { Authorization: token }
    }
    const replacement = {
        title: newObj.title,
        author: newObj.author,
        url: newObj.url,
        likes: newObj.likes
    } 
    return axios.put(`${baseUrl}/${blog.id}`, replacement, config).then(response=>response.data)
    
}
const remove = (blog) => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${blog.id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, change, remove, setToken}