import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const testuser = {
    username: 'testuser',
    name: 'Test User',
    id: '12345'
  }

  const blog = {
    title: 'Testblog',
    author: 'Test Author',
    url: 'fakeurl.org',
    likes: 1,
    user: testuser.id
  }

  const { container } = render(<Blog blog={blog} />)

  const title = screen.getByText('Testblog', { exact: false })
  expect(title).toBeDefined()

  const author = screen.getByText('Test Author', { exact: false })
  expect(author).toBeDefined()

  const divHidden = container.querySelector('.togglable')
  expect(divHidden).toHaveStyle('display: none')
})

test('after clicking the button, url and likes are displayed', () => {
  const testuser = {
    username: 'testuser',
    name: 'Test User',
    id: '12345'
  }

  const blog = {
    title: 'Testblog',
    author: 'Test Author',
    url: 'fakeurl.org',
    likes: 1,
    user: testuser.id
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.togglable')
  expect(div).toHaveStyle('display: none')

  const button = screen.getByText('view')
  userEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
})

test('clicking like button twice will call likeHandler twice', () => {
  const testuser = {
    username: 'testuser',
    name: 'Test User',
    id: '12345'
  }

  const blog = {
    title: 'Testblog',
    author: 'Test Author',
    url: 'fakeurl.org',
    likes: 1,
    user: testuser.id
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} likeHandler={mockHandler} />)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})