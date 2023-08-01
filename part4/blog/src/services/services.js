import axios from 'axios'
const baseUrl = 'http://localhost:3001/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = newObj => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}
const change = (blog, newObj) => {
    const replacement = {
        title: newObj.title,
        author: newObj.author,
        url: newObj.url,
        likes: newObj.likes
    }
    return axios.put(`${baseUrl}/${blog.id}`, replacement).then(response=>response.data)
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, change}