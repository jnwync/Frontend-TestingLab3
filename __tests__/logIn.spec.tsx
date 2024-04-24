import React from "react";
import Login from "../src/components/Login";
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Login', () => {

    beforeEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    });

    afterEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    });

    it('should login successfully as user', async () => {
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                token: 'token',
                userId: 'userId',
                userType: 'user'
            },
        })
        const { getByLabelText, getByRole } = render(
            <Router>
                <Login />
            </Router>
        )
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'wisdo@gmail.com' } })
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password1!' } })

        fireEvent.click(getByRole('button', { name: /Log in/i }))

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('token');
            expect(localStorage.getItem('userId')).toBe('userId');
            expect(localStorage.getItem('userType')).toBe('user');
        });

        expect(window.location.pathname).toBe('/user-dashboard');
    });

    it('should login successfully as admin', async () => {
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                token: 'token',
                userId: 'userId',
                userType: 'admin'
            },
        })
        const { getByLabelText, getByRole } = render(
            <Router>
                <Login />
            </Router>
        )
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'wisdo@gmail.com' } })
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password1!' } })

        fireEvent.click(getByRole('button', { name: /Log in/i }))

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('token');
            expect(localStorage.getItem('userId')).toBe('userId');
            expect(localStorage.getItem('userType')).toBe('admin');
        });

        expect(window.location.pathname).toBe('/admin-dashboard');
    });

    it('should show error message when login fails', async () => {
        mockedAxios.post.mockRejectedValueOnce({
            response: { status: 400, data: { message: 'Not found' } },
        });

        const { getByLabelText, getByRole } = render(
            <Router>
                <Login />
            </Router>
        )

        fireEvent.change(getByLabelText(/email/i), { target: { value: 'wisdo@gmail.com' } })
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password1!' } })

        fireEvent.click(getByRole('button', { name: /Log in/i }))
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

        expect(window.location.pathname).toBe('/Not-found');
    });
});