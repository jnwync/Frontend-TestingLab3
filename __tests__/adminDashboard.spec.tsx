import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from '../src/components/AdminDashboard';
// import {fetchMock} from 'jest-fetch-mock';

jest.mock('axios')
const mockAlert = jest.spyOn(window, 'alert').mockImplementation();
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

    it('should randomize price token', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                token: 'token',
                userId: 'userId',
                userType: 'admin',
            },
        });

        const {getByRole } = render(
            <Router>
                <AdminDashboard />
            </Router>
        );

        
        fireEvent.click(getByRole('button', { name: /Randomize Prices/i }))

        await waitFor(() => expect(axios.patch).toHaveBeenCalledTimes(1));

        expect(mockAlert).toHaveBeenCalledWith("Prices randomized successfully");
    });

    it('should handle failure when randomizing prices', async () => {
        mockedAxios.patch.mockRejectedValueOnce(new Error('Failed to randomize prices'));
      
        const { getByRole } = render(
          <Router>
            <AdminDashboard />
          </Router>
        );
      
        fireEvent.click(getByRole('button', { name: /Randomize Prices/i }));
      
        await waitFor(() => expect(axios.patch).toHaveBeenCalledTimes(1));
      
        expect(mockAlert).toHaveBeenCalledWith('Failed to randomize prices');
      });
});