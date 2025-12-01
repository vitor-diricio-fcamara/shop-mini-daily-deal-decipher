import { useState, useEffect, useCallback } from 'react'
import { useAsyncStorage } from '@shopify/shop-minis-react'

export interface UserPreferences {
  categories: string[]
  hasOnboarded: boolean
  streak: number
  lastVisit: string | null
}

const STORAGE_KEYS = {
  CATEGORIES: 'user_categories',
  HAS_ONBOARDED: 'user_has_onboarded',
  STREAK: 'user_streak',
  LAST_VISIT: 'user_last_visit',
}

export function useUserPreferences() {
  const { getItem, setItem } = useAsyncStorage()
  const [preferences, setPreferences] = useState<UserPreferences>({
    categories: [],
    hasOnboarded: false,
    streak: 0,
    lastVisit: null,
  })
  const [loading, setLoading] = useState(true)

  const loadPreferences = useCallback(async () => {
    console.log('useUserPreferences: Loading preferences...')
    try {
      const [categories, hasOnboarded, streak, lastVisit] = await Promise.all([
        getItem({ key: STORAGE_KEYS.CATEGORIES }),
        getItem({ key: STORAGE_KEYS.HAS_ONBOARDED }),
        getItem({ key: STORAGE_KEYS.STREAK }),
        getItem({ key: STORAGE_KEYS.LAST_VISIT }),
      ])

      console.log('useUserPreferences: Raw values', { categories, hasOnboarded, streak, lastVisit })

      setPreferences({
        categories: categories ? JSON.parse(categories) : [],
        hasOnboarded: hasOnboarded === 'true',
        streak: streak ? parseInt(streak, 10) : 0,
        lastVisit: lastVisit || null,
      })
    } catch (error) {
      console.error('Failed to load preferences:', error)
    } finally {
      console.log('useUserPreferences: Finished loading')
      setLoading(false)
    }
  }, [getItem])

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

  const updateStreak = async () => {
    const today = new Date().toISOString().split('T')[0]
    const lastVisitDate = preferences.lastVisit ? preferences.lastVisit.split('T')[0] : null

    if (lastVisitDate === today) {
      return // Already visited today
    }

    let newStreak = 1
    if (lastVisitDate) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0]

      if (lastVisitDate === yesterdayString) {
        newStreak = preferences.streak + 1
      }
    }

    try {
      await Promise.all([
        setItem({ key: STORAGE_KEYS.STREAK, value: newStreak.toString() }),
        setItem({ key: STORAGE_KEYS.LAST_VISIT, value: new Date().toISOString() }),
      ])
      setPreferences((prev) => ({
        ...prev,
        streak: newStreak,
        lastVisit: new Date().toISOString(),
      }))
    } catch (error) {
      console.error('Failed to update streak:', error)
    }
  }

  const resetPreferences = async () => {
    try {
        await setItem({ key: STORAGE_KEYS.CATEGORIES, value: JSON.stringify([]) })
        await setItem({ key: STORAGE_KEYS.HAS_ONBOARDED, value: 'false' })
        // We might want to keep streak even if preferences are reset, but let's reset onboarding status.
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
    updateStreak,
    resetPreferences
  }
}

