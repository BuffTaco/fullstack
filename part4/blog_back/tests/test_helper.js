const Blog = require('../models/blog')
const User = require('../models/user')

let initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '64de9780351bfbb03b0b2589',
        title: 'testing title',
        author: 'you',
        url: 'smth.com',
        likes: 8,
        __v: 0
    }
]
initialBlogs = initialBlogs.map(blog => new Blog(blog).toJSON())

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    blogsInDb,
    initialBlogs,
    usersInDb
}