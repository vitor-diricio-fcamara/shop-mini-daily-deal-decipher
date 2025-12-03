import { useState, useEffect, useCallback } from 'react'
import { useAsyncStorage } from '@shopify/shop-minis-react'

export interface UserPreferences {
  categories: string[]
  hasOnboarded: boolean
}

const STORAGE_KEYS = {
  CATEGORIES: 'user_categories',
  HAS_ONBOARDED: 'user_has_onboarded',
}

export function useUserPreferences() {
  const { getItem, setItem } = useAsyncStorage()
  const [preferences, setPreferences] = useState<UserPreferences>({
    categories: [],
    hasOnboarded: false,
  })
  const [loading, setLoading] = useState(true)

  const loadPreferences = useCallback(async () => {
    try {
      const [categories, hasOnboarded] = await Promise.all([
        getItem({ key: STORAGE_KEYS.CATEGORIES }),
        getItem({ key: STORAGE_KEYS.HAS_ONBOARDED }),
      ])

      setPreferences({
        categories: categories ? JSON.parse(categories) : [],
        hasOnboarded: hasOnboarded === 'true',
      })
    } catch (error) {
      console.error('Failed to load preferences:', error)
    } finally {
      setLoading(false)
    }
  }, []) // Removed getItem dependency to prevent infinite loops

  useEffect(() => {
    loadPreferences()
  }, [loadPreferences])

  const setCategories = async (categories: string[]) => {
    try {
      await setItem({ key: STORAGE_KEYS.CATEGORIES, value: JSON.stringify(categories) })
      setPreferences((prev) => ({ ...prev, categories }))
    } catch (error) {
      console.error('Failed to set categories:', error)
    }
  }

  const completeOnboarding = async () => {
    try {
      await setItem({ key: STORAGE_KEYS.HAS_ONBOARDED, value: 'true' })
      setPreferences((prev) => ({ ...prev, hasOnboarded: true }))
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }

  const resetPreferences = async () => {
    try {
        await setItem({ key: STORAGE_KEYS.CATEGORIES, value: JSON.stringify([]) })
        await setItem({ key: STORAGE_KEYS.HAS_ONBOARDED, value: 'false' })
        setPreferences(prev => ({ ...prev, categories: [], hasOnboarded: false }))
    } catch (error) {
        console.error('Failed to reset preferences:', error)
    }
  }

  return {
    preferences,
    loading,
    setCategories,
    completeOnboarding,
    resetPreferences
  }
}

