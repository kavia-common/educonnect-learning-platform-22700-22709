import { render, screen } from '@testing-library/react';
import App from './App';

test('renders legacy app shell', () => {
  render(<App />);
  const text = screen.getByText(/Legacy App Shell/i);
  expect(text).toBeInTheDocument();
});
