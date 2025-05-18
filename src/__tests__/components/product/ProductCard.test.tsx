import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductCard from '../../../components/product/ProductCard';
import { useCartStore } from '../../../store/cartStore';

// Mock the cart store
vi.mock('../../../store/cartStore', () => ({
  useCartStore: vi.fn(),
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    storeId: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
    description: 'Test Description',
    category: 'Test Category',
    brand: 'Test Brand',
  };

  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Setup default mock implementation
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      addItem: mockAddToCart,
      removeItem: mockRemoveFromCart,
      items: [],
    }));
  });

  it('renders product card with all details', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    // Check if product card is visible
    expect(screen.getByTestId('product-card')).toBeInTheDocument();

    // Check if product details are displayed
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  it('shows add to cart button when item is not in cart', () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toHaveTextContent('Add to cart');

    // Click add to cart button
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows quantity controls when item is in cart', () => {
    // Mock cart store to return item in cart
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      addItem: mockAddToCart,
      removeItem: mockRemoveFromCart,
      items: [{ product: mockProduct, quantity: 1 }],
    }));

    renderWithTheme(<ProductCard product={mockProduct} />);

    // Check if quantity controls are visible
    const addToCartIconButton = screen.getByTestId('add-to-cart-icon-button');
    const removeFromCartIconButton = screen.getByTestId('remove-from-cart-icon-button');
    
    expect(addToCartIconButton).toBeInTheDocument();
    expect(removeFromCartIconButton).toBeInTheDocument();

    // Test add to cart icon button
    fireEvent.click(addToCartIconButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);

    // Test remove from cart icon button
    fireEvent.click(removeFromCartIconButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct);
  });
}); 