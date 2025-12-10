import { renderHook, act, waitFor } from '@testing-library/react'
import { useUserPreferences } from './useUserPreferences'
import { useAsyncStorage } from '@shopify/shop-minis-react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Get the mocked version of useAsyncStorage
const mockUseAsyncStorage = useAsyncStorage as jest.Mock

describe('useUserPreferences', () => {
  const setItemMock = vi.fn()
  const getItemMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock implementation
    mockUseAsyncStorage.mockReturnValue({
      getItem: getItemMock.mockResolvedValue(null),
      setItem: setItemMock.mockResolvedValue(undefined),
    })
  })

  it('should load initial preferences with default values', async () => {
    const { result } = renderHook(() => useUserPreferences())

    // Initially loading
    expect(result.current.loading).toBe(true)

    // Wait for loading to finish
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.preferences).toEqual({
      categories: [],
      hasOnboarded: false,
      streak: 0,
      lastVisit: null,
    })
  })

  it('should load existing preferences from storage', async () => {
    getItemMock.mockImplementation(({ key }) => {
      switch (key) {
        case 'user_categories': return Promise.resolve('["Tech"]')
        case 'user_has_onboarded': return Promise.resolve('true')
        case 'user_streak': return Promise.resolve('5')
        case 'user_last_visit': return Promise.resolve('2023-01-01')
        default: return Promise.resolve(null)
      }
    })

    const { result } = renderHook(() => useUserPreferences())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.preferences).toEqual({
      categories: ['Tech'],
      hasOnboarded: true,
      streak: 5,
      lastVisit: '2023-01-01',
    })
  })

  it('should update categories', async () => {
    const { result } = renderHook(() => useUserPreferences())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.setCategories(['Fashion', 'Gaming'])
    })

    expect(setItemMock).toHaveBeenCalledWith({
      key: 'user_categories',
      value: JSON.stringify(['Fashion', 'Gaming']),
    })
    expect(result.current.preferences.categories).toEqual(['Fashion', 'Gaming'])
  })

  it('should complete onboarding', async () => {
    const { result } = renderHook(() => useUserPreferences())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.completeOnboarding()
    })

    expect(setItemMock).toHaveBeenCalledWith({
      key: 'user_has_onboarded',
      value: 'true',
    })
    expect(result.current.preferences.hasOnboarded).toBe(true)
  })
})

