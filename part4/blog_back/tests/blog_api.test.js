const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require("bcrypt")
const blog = require('../models/blog')
let token;

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('MLP123', 10)
    const user = new User({
        username: "new user",
        name: "John Smith",
        passwordHash: passwordHash
    })
    await user.save()
    const login = await api
    .post('/api/login')
    .send(
        { 
        'username': 'new user',
        'password': 'MLP123'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    token = login._body.token
    
    

})
describe('adding users to db with 1', () => {
    test('can add valid user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "Failure799",
            name: "El Cerdo",
            password: "My password"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('must have different username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "new user",
            name: "Jay Smith",
            password: "password"
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toEqual(usersAtStart.length)


    })
})
describe('getting blogs', () => {
    test('blogs returned as JSON', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('gets all blogs', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('can get specific blog', async () => {
        const allBlogs = await helper.blogsInDb()
        const blogToGet = allBlogs[0]
    
        const returnedBlog = await api
        .get(`/api/blogs/${blogToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        expect(returnedBlog.body).toEqual(blogToGet)
    })
})
describe('adding blogs', () => {
    
    test('can add valid blog', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        }
        const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const blogIds = blogsAtEnd.map(b => b.id)
        
        
        const currBlog = await Blog.findOne({_id: res.body.id})
        const currUser = await User.findOne({_id: currBlog.user})
        
        
        expect(currUser.blogs).toContainEqual(currBlog._id)
        expect(blogIds).toContain(currBlog._id.toString())
        

        
    })
    test('400 if lack title or url', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        
    
    })
    test('0 likes if no likes property', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsInDb()
        
        expect(blogs[2].likes).toEqual(0)
    })
    test('401 if no user', async () => {
        const blogsAtBeginning = await Blog.find({})
        await api
        .post('/api/blogs')
        .send(
            {
                title: 'do not go through',
                author: 'anon',
                url: 'failure.org',
                likes: 999
            }
        )
        .expect(401)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd.length).toEqual(blogsAtBeginning.length)


    })
})
test('id not _id', async () => {
    for (let blog of helper.initialBlogs)
    {
        expect(blog.id).toBeDefined();
    } 
})
test('can delete blog', async () => {
    
    let blogToDelete = (await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(
        {
            'title': 'delete this',
            'author': 'none',
            'url': 'testing.com'
        }
    )
    .expect(201)
    .expect('Content-Type', /application\/json/))._body
    
    const totalBlogs = await helper.blogsInDb()
    

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(totalBlogs.length-1)
    expect(blogsAtEnd).not.toContain(blogToDelete)
})

afterAll(async () => {
    await mongoose.connection.close()
})