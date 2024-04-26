import axios from 'axios';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Market from '../src/components/Market';
import React from 'react';


const walletData = [
    {
        id: 1,
        pogsId: 1,
        userId: 1,
        quantity: 10,
        created: new Date(),
        updateTime: new Date(),
    },
];
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Market', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({
            data: walletData,
        });
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });
    const pogsData = [
        {
            id: 1,
            pogs_name: 'Bitcoin',
            ticker_symbol: 'BTC',
            price: 50000,
            color: '#ffcc00',
            previous_price: 48000,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];



    it("should render Market successfully", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: pogsData,
        });

        const { findByText } = render(
            <Router>
                <Market />
            </Router>
        );

        await waitFor(() => {
            pogsData.forEach((pog) => {
                expect(findByText(pog.pogs_name));
                expect(findByText(`Price: $${pog.price}`));
            });
        });
    });

    it('should buy pogs successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: pogsData,
        });


        const { findByRole } = render(
            <Router>
                <Market />
            </Router>
        );

        const button = await findByRole('button', { name: /Buy/i });
        button.click();

        await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
    });

    it('should sell pogs Successfully', async () => {
        const walletWithData = [
            {
                id: 1,
                pogsId: 1,
                userId: 1,
                quantity: 1, // Ensure that there is at least one item in the wallet
                created: new Date(),
                updateTime: new Date(),
            },
        ];
    
        mockedAxios.get
            .mockResolvedValueOnce({
                data: walletWithData,
            })
            .mockResolvedValueOnce({
                data: pogsData,
            });
    
        const { findByText } = render(
            <Router>
                <Market />
            </Router>
        );
    
        const button = await findByText("Sell");
        fireEvent.click(button);
    
        await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
    });
});
