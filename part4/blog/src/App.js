/* eslint-disable no-unused-vars */
import {useState, useEffect, useRef} from 'react'
import services from './services/services'
import loginHelper from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [newMessage, setNewMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  
  useEffect(() => {
    services.getAll().then(response => setBlogs(response))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      services.setToken(user.token)
    }
  }, [])

  const handleLike = (blog) => {
    const newObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    services.change(blog, newObj).then(response => {
      services.getAll().then(response => {
        
        setBlogs(response)})})
  }

  const handleDelete = (blog) => {
    if (window.confirm('Remove blog?'))
    {
      services.remove(blog).then(response => {
        services.getAll().then(response => {
          console.log(response)
          setBlogs(response)
          setMessageType('Sucess')
          setNewMessage('Blog successfully removed')
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
          
        })})
        .catch(error => {
          console.log(error)
        })
    }
  }
  
  const handleSubmit = (newBlog) => {
      services.create(newBlog)
      .then(
        response => {setBlogs(blogs.concat(response))
        
        
        setMessageType('Success')
        setNewMessage('Blog successfully added')
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
 
      })
      .catch((error) => {console.log(error.message)
      setMessageType('Error')
      setNewMessage('Unable to add blog')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
      })
  }

  const handleLogin = ( username, password ) => {
    loginHelper.login( {username, password })
    .then(response => {
      setUser(response)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))

      services.setToken(response.token)
    })
    .catch(error => {
      console.log(error)
      console.log("Wrong credentials")
      setMessageType('Error')
      setNewMessage('Wrong credentials')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    })
      
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }
  const form = () => {
    return (
      
    <>
    <p>Logged in as {user.username} <button onClick={handleLogout}>Logout</button></p>
    <Togglable buttonLabel="Add blog" closeLabel="Cancel">
      <BlogForm createBlog={handleSubmit}/>
    </Togglable>
    </>
    )
    
  }
  
  const login = () => {
    return <>
    <Togglable buttonLabel="Login" closeLabel="Cancel">
      <LoginForm login={handleLogin}/>
    </Togglable>
      
    </>
  }

  return (
    <div className="body">
      <Notification message={newMessage} type={messageType}/>
      <h1>Blogs</h1>
      { user === null
      ? login()
      : form()
      }
       {
        blogs.map(blog => 
          {
            
            return <div className="blog">
            <h3>{blog.title}</h3>
            <Togglable buttonLabel="View" closeLabel="Close">
              <Blog key={blog.id} handleDelete={() => handleDelete(blog)} handleLike={() => handleLike(blog)} blog={blog} />
            </Togglable>
            
            </div>
          }          
        )
       }
    </div>
  )
}

export default App;