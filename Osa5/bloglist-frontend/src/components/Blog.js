import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  const like = () => console.log('like this blog')
  console.log(blog.user.name)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>view</button>
      </div>
      <div style={showWhenVisible}>
        <ul style={listStyle}>
          <li>{blog.url}</li>
          <li>{blog.likes}
            <button onClick={like}>like</button>
          </li>
          <li>{blog.user.name}</li>
        </ul>
      </div>
    </div>
  )
}

export default Blog