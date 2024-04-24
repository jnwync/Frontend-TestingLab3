import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import AdminDashboard from '../src/components/AdminDashboard'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AdminDashboard', () => {
    beforeEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    });

    afterEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    });

    it('should render admin dashboard', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                token: 'token',
                userId: 'userId',
                userType: 'admin',
            },
        });

        const { getByText } = render(
            <Router>
                <AdminDashboard />
            </Router>
        );

        

    });
});