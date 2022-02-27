import React, { useState } from 'react'
// import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, user, removeHandler }) => {
  const [showInfo, setShowInfo] = useState(false)
  const showWhenVisible = { display: showInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const listStyle = {
    listStyle: 'none',
    paddingTop: 0,
    paddingLeft: 2,
    paddingBottom: 1
  }

  const toggleShow = () => setShowInfo(!showInfo)

  const like = (event) => {
    event.preventDefault()
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    likeHandler(updatedBlog, blog.id)
  }

  const remove = (event) => {
    event.preventDefault()
    removeHandler(blog)
  }

  return (
    <div className='blogInfo' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>view</button>
      </div>
      <div className='togglable' style={showWhenVisible}>
        <ul style={listStyle}>
          <li>{blog.url}</li>
          <li>likes {blog.likes}
            <button onClick={like}>like</button>
          </li>
          <li>{blog.user.name}</li>
          {user !== null ? <div><button style={{ backgroundColor: '#008CBA' }} onClick={remove}>remove</button></div> : <div></div>}
        </ul>
      </div>
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   likeHandler: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   removeHandler: PropTypes.func.isRequired
// }

export default Blog