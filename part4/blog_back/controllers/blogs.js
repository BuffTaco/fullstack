const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog)
    {
      response.json(blog)
    }
    else
    {
      response.status(404).end()
    }
    
})
blogsRouter.post('/', userExtractor, async (request, response) => {
    const blog = request.body
    
    
    /*const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id){
      return response.json(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)*/

    if (!blog.hasOwnProperty('likes'))
    {
      
      blog['likes'] = 0     
      
    }
    if (!blog.hasOwnProperty('title') || !blog.hasOwnProperty('url'))
    {
      
      response.status(400).end()
    }
    


    const toSave = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: request.user.id
    })
    const savedBlog = await toSave.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog, {new:true})
      response.json(updatedBlog)
      
      
})
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  /*const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id)
  {
    resonse.status(401).json({ errror: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)*/
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (blog == null)
  {
    response.status(400).end()
  }
  const blogUser = await User.findById(blog.user)
  if (blogUser.username === request.user.username)
  {
    request.user.blogs = request.user.blogs.filter(blog => blog.id != request.params.id)
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else
  {
    response.status(401).json({ error: 'incorrect user' })
  }
  
  
})


module.exports = blogsRouter