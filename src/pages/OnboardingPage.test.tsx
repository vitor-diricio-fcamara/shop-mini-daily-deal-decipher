import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OnboardingPage } from './OnboardingPage'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useUserPreferences } from '../hooks/useUserPreferences'

// Mock the hook directly to control state without dealing with async storage internals in UI test
vi.mock('../hooks/useUserPreferences', () => ({
    useUserPreferences: vi.fn()
}))

const mockSetCategories = vi.fn()
const mockCompleteOnboarding = vi.fn()

describe('OnboardingPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        // Default hook implementation
        ;(useUserPreferences as any).mockReturnValue({
            setCategories: mockSetCategories,
            completeOnboarding: mockCompleteOnboarding,
        })
    })

    it('should render categories', () => {
        render(<OnboardingPage />)
        expect(screen.getByText('Tech & Gadgets')).toBeInTheDocument()
        expect(screen.getByText('Fashion')).toBeInTheDocument()
    })

    it('should toggle category selection', () => {
        render(<OnboardingPage />)
        
        const techButton = screen.getByText('Tech & Gadgets').closest('button')
        expect(techButton).not.toHaveClass('border-red-600')

        if (techButton) {
            fireEvent.click(techButton)
            expect(techButton).toHaveClass('border-red-600')
            
            fireEvent.click(techButton)
            expect(techButton).not.toHaveClass('border-red-600')
        } else {
            throw new Error('Button not found')
        }
    })

    it('should call save preferences on continue', async () => {
        render(<OnboardingPage />)
        
        const techButton = screen.getByText('Tech & Gadgets').closest('button')
        const startButton = screen.getByText('Start Deciphering').closest('button')

        // Button should be disabled initially
        expect(startButton).toBeDisabled()

        // Select a category
        if (techButton) fireEvent.click(techButton)
        
        // Button should be enabled
        expect(startButton).toBeEnabled()

        // Click start
        if (startButton) fireEvent.click(startButton)

        await waitFor(() => {
            expect(mockSetCategories).toHaveBeenCalledWith(['Tech'])
            expect(mockCompleteOnboarding).toHaveBeenCalled()
        })
    })
})

