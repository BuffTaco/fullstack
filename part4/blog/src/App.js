/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import services from './services/services'

const Form = (props) => {
  return (
  <>
  <form onSubmit={props.handleSubmit}>
  <div>
      Title: <input onChange={props.handleTitleChange}/>
    </div>
    <div>
      Author: <input onChange={props.handleAuthorChange}/>
    </div>
    <div>
      URL: <input onChange={props.handleUrlChange}/>
    </div>
    <div>
      <button type="submit">Add blog</button>
    </div>
    
  </form>
    
  </>
  )
  
}
const Blog = (props) => {
  
  return <div className="blog">
    <p>Title: {props.title}
    <br/>
    Author: {props.author}
    <br/>
    URL: <span className="link">{props.url}</span>
    <br/>
    Likes: {props.likes}
    <br/>
    <button onClick={props.handleLike}>Like</button>
    <br/>
    <button onClick={props.handleDelete}>Delete</button>
    <button>Edit</button>
    </p>
    
    
  </div>
}
const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  

  useEffect(() => {
    services.getAll().then(response => setBlogs(response))
  }, [])
  const handleAuthorChange = (event) => {
    
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLike = (blog) => {
  
    const newObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    services.change(blog, newObj).then(
      services.getAll().then(response => {
        
        setBlogs(response)}))
    
  }
  const handleDelete = (blog) => {
    if (window.confirm('Remove blog?'))
    {
      services.remove(blog).then(
        services.getAll().then(response => {
          
          setBlogs(response)}))
    }
    
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    if (newTitle === '')
    {
      alert('Enter a title')
    }
    else if (newAuthor === '')
    {
      alert('Enter an author')
    }
    else if (newUrl === '')
    {
      alert('Enter an URL')
    }
    else
    {
      services.create(newBlog)
      .then(response => {setBlogs(blogs.concat(response))})
      .catch((error) => {console.log(error.message)})
    }

    
  }


  

  return (
    <div>
      <h1>Blogs</h1>
      <Form  handleSubmit={(e) => handleSubmit(e)} handleAuthorChange={(e) => handleAuthorChange(e)} handleTitleChange={(e) => handleTitleChange(e)}
       handleUrlChange={(e) => handleUrlChange(e)}/>
       {
        blogs.map(blog => <Blog handleDelete={() => handleDelete(blog)} handleLike={() => handleLike(blog)} likes={blog.likes} blog={blog} author={blog.author} title={blog.title} url={blog.url}/>
        
          
        )
       }
      
      
     

    </div>
  )
}

export default App;
