import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import PogForm from "../src/components/PogForm";

// Mock the onSubmit function
const mockSubmit = jest.fn();

describe('PogForm', () => {
  it('should submit form data successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<PogForm onSubmit={mockSubmit} />);

    // Fill in the form fields
    fireEvent.change(getByPlaceholderText('Pogs Name'), { target: { value: 'Test Pog' } });
    fireEvent.change(getByPlaceholderText('Ticker Symbol'), { target: { value: 'TPG' } });
    fireEvent.change(getByPlaceholderText('Color'), { target: { value: 'Red' } });
    fireEvent.change(getByPlaceholderText('Current Price'), { target: { value: '10' } });
    fireEvent.change(getByPlaceholderText('Previous Price'), { target: { value: '5' } });

    // Submit the form
    fireEvent.click(getByText('Add Pog'));

    // Wait for the form submission to be called
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

    // Check if the onSubmit function was called with the correct form data
    expect(mockSubmit).toHaveBeenCalledWith({
      pogs_name: 'Test Pog',
      ticker_symbol: 'TPG',
      color: 'Red',
      current_price: '10',
      previous_price: '5',
    });
  });

  it('should display error messages for invalid form data', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<PogForm onSubmit={mockSubmit} />);
  
    // Fill in the form fields with invalid data
    fireEvent.change(getByPlaceholderText('Pogs Name'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('Ticker Symbol'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('Color'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('Current Price'), { target: { value: 'abc' } });
    fireEvent.change(getByPlaceholderText('Previous Price'), { target: { value: 'def' } });
  
    // Submit the form
    fireEvent.click(getByText('Add Pog'));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

    // Check if error messages are displayed
    expect(queryByText('Pogs Name is required')).toBeInTheDocument();
    expect(queryByText('Ticker Symbol is required')).toBeInTheDocument();
    expect(queryByText('Color is required')).toBeInTheDocument();
    expect(queryByText('Current Price must be a valid positive number')).toBeInTheDocument();
    expect(queryByText('Previous Price must be a valid positive number')).toBeInTheDocument();
  
    // Ensure that the onSubmit function is not called
  });
  
});
