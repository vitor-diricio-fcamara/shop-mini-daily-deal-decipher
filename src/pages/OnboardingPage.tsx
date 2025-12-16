import { useState, useMemo, useEffect } from 'react'
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
  
  // Initialize state with current preferences if available
  const [selected, setSelected] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Sync selected state with preferences when they load
  useEffect(() => {
    if (preferences.categories && preferences.categories.length > 0) {
      setSelected(preferences.categories)
    }
  }, [preferences.categories])

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
    
    setLoading(true)
    await setCategories(selected)
    await completeOnboarding()
    setLoading(false)
    setSuccess(true)
    
    // Redirect after showing success state
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 1500)
  }

  const handleBack = () => {
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-6 pt-6 pb-2 border-b border-gray-100 shadow-sm">
        {preferences.hasOnboarded && (
          <button 
            onClick={handleBack}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors z-30"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 mb-4"
          >
            <div className="w-12 h-12 bg-white rounded-full flex-shrink-0 shadow-sm overflow-hidden border border-gray-100">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-left">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                {preferences.hasOnboarded ? 'Update Interests' : 'Personalize Deals'}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Select categories to decipher the best drops for you.
              </p>
            </div>
          </motion.div>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-wrap gap-2 w-full content-start justify-center pb-24">
            {/* Selected items appear first */}
            {selected.length > 0 && searchQuery === '' && (
              <div className="w-full text-center mb-2">
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Selected</span>
              </div>
            )}
            
            {/* Render selected items first */}
            {filteredCategories
              .sort((a, b) => {
                const aSelected = selected.includes(a.id)
                const bSelected = selected.includes(b.id)
                if (aSelected && !bSelected) return -1
                if (!aSelected && bSelected) return 1
                return 0
              })
              .map((category: { id: string; label: string; full_name: string }, index: number) => {
              const isSelected = selected.includes(category.id)

              return (
                <motion.div
                  key={category.id}
                  layout // Animate layout changes when sorting
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.005 }}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-all text-sm ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium shadow-sm ring-1 ring-orange-200'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-orange-600" />}
                    <span className="whitespace-nowrap">{category.label}</span>
                  </button>
                </motion.div>
              )
            })}
          </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-20 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            className={`w-full font-semibold py-3 transition-colors ${
              success 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : loading 
                  ? 'bg-orange-400 hover:bg-orange-500 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
            size="lg"
            disabled={selected.length === 0 || loading || success}
            onClick={handleContinue}
          >
            {success 
              ? 'Preferences Saved!' 
              : loading 
                ? 'Saving...' 
                : (preferences.hasOnboarded ? 'Save Preferences' : 'Start Deciphering')}
          </Button>
          {selected.length === 0 && (
            <p className="text-xs text-center text-gray-400 mt-2">
              Select at least one category to continue
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
