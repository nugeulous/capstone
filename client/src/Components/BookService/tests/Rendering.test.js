import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../redux/actions/store/store';
import BookService from '../BookService'; // Adjust the path as necessary

beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify([])); // Mock an empty response from fetch
  });
  
  test('updates state on input change', async () => {
    // Render the component with the token prop
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookService token="dummy-token" />
        </MemoryRouter>
      </Provider>
    );
  
    // Check if the "No Access" component or any error message is being rendered
    expect(screen.queryByText(/Please log in or create an account!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Loading petsitters.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/No Access/i)).not.toBeInTheDocument();
  
    // Wait for the start time input to appear
    const startTimeInput = await screen.findByLabelText(/Start Time:/i);
    fireEvent.change(startTimeInput, { target: { value: '12:00 PM' } });
    expect(startTimeInput.value).toBe('12:00 PM'); // Before conversion
  
    const endTimeInput = await screen.findByLabelText(/End Time:/i);
    fireEvent.change(endTimeInput, { target: { value: '01:00 PM' } });
    expect(endTimeInput.value).toBe('01:00 PM');
  });

