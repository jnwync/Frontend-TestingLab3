import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Register from '../src/components/Register'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Register', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should register successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'token',
        userId: 'userId',
      },
    })

    const { getByLabelText, getByRole } = render(
      <Router>
        <Register />
      </Router>
    )

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'username' } })
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'wisdo@gmail.com' } })
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password1!' } })

    fireEvent.click(getByRole('button', { name: /Register/i }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
    })
  })
})