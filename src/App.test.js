import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Visit Ferocious Flirting link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Visit Ferocious Flirting/i);
  expect(linkElement).toBeInTheDocument();
});
