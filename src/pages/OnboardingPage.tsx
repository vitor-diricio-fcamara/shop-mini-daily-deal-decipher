import { useState, useMemo } from 'react'
import { Button, useNavigateWithTransition, Input } from '@shopify/shop-minis-react'
import { Check, Search, X } from 'lucide-react'
import { useUserPreferences } from '../hooks/useUserPreferences'
import { motion } from 'framer-motion'
import { getLevel2Categories } from '../utils/taxonomyUtils'
import logo from '../assets/daily_deal_decipher_logo.jpg'

// Get all level 2 categories
const CATEGORIES = getLevel2Categories().map(cat => ({
  id: cat.id,
  label: cat.name,
  full_name: cat.full_name
}))

export function OnboardingPage() {
  const navigate = useNavigateWithTransition()
  const { preferences, setCategories, completeOnboarding } = useUserPreferences()
  const [selected, setSelected] = useState<string[]>(preferences.categories || [])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CATEGORIES
    const lowerQuery = searchQuery.toLowerCase()
    return CATEGORIES.filter(cat => 
      cat.label.toLowerCase().includes(lowerQuery) || 
      cat.full_name.toLowerCase().includes(lowerQuery)
    )
  }, [searchQuery])

  const toggleCategory = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleContinue = async () => {
    if (selected.length === 0) return
    
    await setCategories(selected)
    await completeOnboarding()
    navigate('/', { replace: true })
  }

  const handleBack = () => {
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col relative">
      {preferences.hasOnboarded && (
        <button 
          onClick={handleBack}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <div className="flex-1 flex flex-col items-center text-center mb-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 w-full max-w-md"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm overflow-hidden">
            <img src={logo} alt="Daily Deal Decipher Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {preferences.hasOnboarded ? 'Update Interests' : 'Personalize Your Deals'}
          </h1>
          <p className="text-gray-500 mb-6">
            Select the categories you're interested in to help us decipher the best drops for you.
          </p>

          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 w-full max-h-[50vh] overflow-y-auto content-start justify-center p-1">
          {filteredCategories.map((category: { id: string; label: string; full_name: string }, index: number) => {
            const isSelected = selected.includes(category.id)

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                  <span className="font-medium text-sm whitespace-nowrap">{category.label}</span>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          className="w-full"
          size="lg"
          disabled={selected.length === 0}
          onClick={handleContinue}
        >
          {preferences.hasOnboarded ? 'Save Preferences' : 'Start Deciphering'}
        </Button>
        {selected.length === 0 && (
          <p className="text-xs text-center text-gray-400 mt-3">
            Select at least one category to continue
          </p>
        )}
      </motion.div>
    </div>
  )
}
