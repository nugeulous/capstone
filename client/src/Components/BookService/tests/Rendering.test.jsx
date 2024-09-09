import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../redux/actions/store/store';
import React from 'react';
import BookingForm from '../BookingForm';

describe('BookingForm component', () => {
  it('renders the booking form', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap component with MemoryRouter */}
          <BookingForm token="valid-token" />
        </MemoryRouter>
      </Provider>
    );

    // Check for form elements
    expect(screen.getByLabelText(/Day/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});