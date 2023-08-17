const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', (request, response) => {
  
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  blogsRouter.get('/:id', (request, response) => {
    Blog.findById(request.params.id).then(note => {
      response.json(note)
    })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  blogsRouter.put('/:id', (request, response) => {
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

module.exports = blogsRouter