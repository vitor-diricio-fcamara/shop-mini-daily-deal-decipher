import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// We need to mock the window object because some components/libraries might try to access it
// immediately when imported, and jsdom doesn't always provide everything perfectly in the way some libs expect.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock the Shop Minis SDK completely to avoid any real code execution that might touch window
vi.mock('@shopify/shop-minis-react', () => {
  return {
    useAsyncStorage: vi.fn(() => ({
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockResolvedValue(undefined),
      removeItem: vi.fn().mockResolvedValue(undefined),
    })),
    useNavigateWithTransition: vi.fn(() => vi.fn()),
    usePopularProducts: vi.fn(() => ({
      products: [],
      fetchMore: vi.fn(),
      loading: false,
      hasNextPage: false,
    })),
    useProductSearch: vi.fn(() => ({
        products: [],
        fetchMore: vi.fn(),
        loading: false,
        hasNextPage: false,
    })),
    useCreateImageContent: vi.fn(() => ({
        createImageContent: vi.fn(),
        loading: false
    })),
    // Mock Components
    MinisRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Button: ({ children, onClick, disabled }: any) => (
      <button onClick={onClick} disabled={disabled} data-testid="shop-button">
        {children}
      </button>
    ),
    Badge: ({ children, onClick }: any) => (
        <span onClick={onClick} data-testid="shop-badge">{children}</span>
    ),
    List: ({ items, renderItem }: any) => (
        <div data-testid="shop-list">
            {items.map((item: any, index: number) => (
                <div key={item.id || index}>{renderItem(item, index)}</div>
            ))}
        </div>
    ),
    ProductCard: ({ product }: any) => (
        <div data-testid="shop-product-card">{product.title}</div>
    ),
    Skeleton: () => <div data-testid="shop-skeleton" />,
    Toaster: () => <div data-testid="shop-toaster" />,
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
  }
})

// Mock Lucide Icons
vi.mock('lucide-react', () => {
    return {
        Check: () => <span data-testid="icon-check" />,
        Zap: () => <span data-testid="icon-zap" />,
        Shirt: () => <span data-testid="icon-shirt" />,
        Home: () => <span data-testid="icon-home" />,
        Dumbbell: () => <span data-testid="icon-dumbbell" />,
        Gamepad: () => <span data-testid="icon-gamepad" />,
        Heart: () => <span data-testid="icon-heart" />,
        Star: () => <span data-testid="icon-star" />,
        Timer: () => <span data-testid="icon-timer" />,
        TrendingDown: () => <span data-testid="icon-trending-down" />,
        Tag: () => <span data-testid="icon-tag" />,
        Percent: () => <span data-testid="icon-percent" />,
        Lock: () => <span data-testid="icon-lock" />,
        Unlock: () => <span data-testid="icon-unlock" />,
        Clock: () => <span data-testid="icon-clock" />,
        Fire: () => <span data-testid="icon-fire" />,
        Share2: () => <span data-testid="icon-share2" />,
        RefreshCw: () => <span data-testid="icon-refresh-cw" />,
    }
})

// Mock React Router
const mockedNavigate = vi.fn()
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
        ...actual,
        useNavigate: () => mockedNavigate
    }
})
