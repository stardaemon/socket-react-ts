import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LEADERBOARD', () => {
  render(<App />);
  const tabElement = screen.getByText(/LEADERBOARD/i);
  expect(tabElement).toBeInTheDocument();
});
