import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  userEvent.type(inputTitle, 'Form Test')
  userEvent.type(inputAuthor, 'Form Author')
  userEvent.type(inputUrl, 'formtesturl')

  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Form Test')
  expect(createBlog.mock.calls[0][0].author).toBe('Form Author')
  expect(createBlog.mock.calls[0][0].url).toBe('formtesturl')
})