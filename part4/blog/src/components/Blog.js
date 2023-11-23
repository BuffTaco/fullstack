const Blog = ({blog, handleLike, handleDelete}) => {
  
    return <div>
      <p>
      Author: {blog.author}
      <br/>
      URL: <span className="link">{blog.url}</span>
      <br/>
      Likes: {blog.likes}
      <br/>
      {blog.user.username}
      <br/>
      <button onClick={handleLike}>Like</button>
      <br/>
      <button onClick={handleDelete}>Delete</button>
      <button>Edit</button>
      </p>  
    </div>
}

export default Blog