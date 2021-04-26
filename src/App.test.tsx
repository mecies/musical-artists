import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './App';

test('renders siema', () => {
  render(<App />);
  const siemaLement = screen.getByText(/siema/i);
  expect(siemaLement).toBeInTheDocument();
});
