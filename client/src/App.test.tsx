import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
  render(<App />);

  const appTitle = screen.getByText('Ingles');
  expect(appTitle).toBeInTheDocument();
});
