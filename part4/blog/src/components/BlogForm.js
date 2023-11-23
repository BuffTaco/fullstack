import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')

  const handleAuthorChange = (event) => {
    
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
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
    else {
      createBlog(newBlog)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

    }
  }
    return (
        <>
        <form onSubmit={handleSubmit}>
    <div>
        Title: <input value={newTitle} onChange={handleTitleChange}/>
      </div>
      <div>
        Author: <input value={newAuthor} onChange={handleAuthorChange}/>
      </div>
      <div>
        URL: <input value={newUrl} onChange={handleUrlChange}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
        </>
    )
}

export default BlogForm