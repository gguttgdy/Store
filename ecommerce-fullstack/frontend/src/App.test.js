import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const AppWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

test('renders app without crashing', () => {
  render(<AppWithProviders />);
  // Since the app has routing, we just check that it renders without errors
  expect(document.body).toBeInTheDocument();
});
