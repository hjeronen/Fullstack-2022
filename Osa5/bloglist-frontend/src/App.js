import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const ErrorNotification = ({ message }) => {
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }

  return (
    <div className="error" style={error} >
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }

  return (
    <div className="success" style={success} >
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = 'wrong username or password'
      showError({ message })
    }
  }

  const showSuccess = ({ message }) => {
    setSuccessMessage(message)
    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
    return timer
  }

  const showError = ({ message }) => {
    setErrorMessage(message)
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)
    return timer
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.removeToken()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <ErrorNotification message={errorMessage} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const showLoggedUser = () => (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  )

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='create new' ref={ blogFormRef }>
          <BlogForm createBlog={createNewBlog}/>
        </Togglable>
      </div>
    )
  }

  const createNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      
      const message = 'a new blog ' + newBlog.title + ' by ' + newBlog.author + ' added'
      showSuccess({ message })

    } catch (exception) {
      const message = exception.response.data.error
      showError({ message })
    }

  }

  const showBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : <div>
          <h2>blogs</h2>
          <SuccessNotification message={successMessage} />
          <ErrorNotification message={errorMessage} />
          {showLoggedUser()}
          {blogForm()}
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App