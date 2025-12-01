import { MinisRouter, useNavigateWithTransition, Skeleton } from '@shopify/shop-minis-react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { useUserPreferences } from './hooks/useUserPreferences'
import { useEffect } from 'react'

function Root() {
  const { preferences, loading } = useUserPreferences()
  const navigate = useNavigateWithTransition()

  console.log('Root: Render', { loading, hasOnboarded: preferences.hasOnboarded })

  useEffect(() => {
    if (!loading && !preferences.hasOnboarded) {
      console.log('Root: Navigating to onboarding')
      navigate('/onboarding', { replace: true })
    }
  }, [loading, preferences.hasOnboarded, navigate])

  if (loading) {
    console.log('Root: Show skeleton')
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    )
  }

  console.log('Root: Render Content', { hasOnboarded: preferences.hasOnboarded })
  return preferences.hasOnboarded ? <HomePage /> : null
}

export function App() {
  return (
    <MinisRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </MinisRouter>
  )
}
