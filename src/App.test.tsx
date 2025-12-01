import { render, screen, waitFor } from '@testing-library/react'
import { App } from './App'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router'

// Mock the custom hook
vi.mock('./hooks/useUserPreferences', () => ({
    useUserPreferences: vi.fn()
}))

// Mock pages to isolate App logic
vi.mock('./pages/HomePage', () => ({
    HomePage: () => <div>Mocked Home Page</div>
}))
vi.mock('./pages/OnboardingPage', () => ({
    OnboardingPage: () => <div>Mocked Onboarding Page</div>
}))

// Mock SDK hooks used in App.tsx
const mockNavigate = vi.fn()
vi.mock('@shopify/shop-minis-react', async (importOriginal) => {
    const actual: any = await importOriginal()
    return {
        ...actual,
        useNavigateWithTransition: () => mockNavigate,
        MinisRouter: ({ children }: any) => <div>{children}</div>,
        Skeleton: () => <div>Loading...</div>
    }
})

import { useUserPreferences } from './hooks/useUserPreferences'

describe('App Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show loading initially', () => {
    (useUserPreferences as any).mockReturnValue({
        preferences: { hasOnboarded: false },
        loading: true
    })

    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should redirect to onboarding if user has not onboarded', async () => {
    (useUserPreferences as any).mockReturnValue({
        preferences: { hasOnboarded: false },
        loading: false
    })

    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/onboarding', { replace: true })
    })
  })

  it('should render HomePage if user has onboarded', async () => {
    (useUserPreferences as any).mockReturnValue({
        preferences: { hasOnboarded: true },
        loading: false
    })

    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )

    expect(screen.getByText('Mocked Home Page')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
