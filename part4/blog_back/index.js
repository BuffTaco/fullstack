const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
console.log("Connecting to", mongoUrl)
mongoose.connect(mongoUrl).then(result => {
	console.log('Connected to MongoDB')
})
	.catch((error) => {
		console.log('Failed to connect to MongDB:', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/blogs', (request, response) => {
  
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
app.get('/api/blogs/:id', (request, response) => {
  Blog.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
app.put('/api/blogs/:id', (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  
  Blog.findByIdAndUpdate(
    request.params.id,
    blog, {new:true})
    .then(updatedBlog => {response.json(updatedBlog)})
    
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})