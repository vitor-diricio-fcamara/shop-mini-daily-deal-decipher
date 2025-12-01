import { useState } from 'react'
import { Button, useNavigateWithTransition } from '@shopify/shop-minis-react'
import { 
  Check, Zap, Shirt, Home, Dumbbell, Gamepad, Heart, Star,
  PawPrint, Palette, Baby, Briefcase, Camera, Utensils, Gift, Hammer, 
  Luggage, EyeOff, Film, Paperclip, Sun, User, Disc, Car, Armchair
} from 'lucide-react'
import { useUserPreferences } from '../hooks/useUserPreferences'
import { motion } from 'framer-motion'
import categoriesData from '../data/categories.json'

const ICON_MAP: Record<string, any> = {
  'Animals & Pet Supplies': PawPrint,
  'Apparel & Accessories': Shirt,
  'Arts & Entertainment': Palette,
  'Baby & Toddler': Baby,
  'Business & Industrial': Briefcase,
  'Cameras & Optics': Camera,
  'Electronics': Zap,
  'Food, Beverages & Tobacco': Utensils,
  'Furniture': Armchair,
  'Gift Cards': Gift,
  'Hardware': Hammer,
  'Health & Beauty': Heart,
  'Home & Garden': Home,
  'Luggage & Bags': Luggage,
  'Mature': EyeOff,
  'Media': Film,
  'Office Supplies': Paperclip,
  'Patio & Garden': Sun,
  'Religious & Ceremonial': Star,
  'Services': User,
  'Software': Disc,
  'Sporting Goods': Dumbbell,
  'Toys & Games': Gamepad,
  'Vehicles & Parts': Car,
}

const CATEGORIES = (categoriesData as any).verticals.map((vertical: any) => ({
  id: vertical.name, // Testing Category Name for filter
  label: vertical.name,
  icon: ICON_MAP[vertical.name] || Star
}))

export function OnboardingPage() {
  const navigate = useNavigateWithTransition()
  const { setCategories, completeOnboarding } = useUserPreferences()
  const [selected, setSelected] = useState<string[]>([])

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

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Personalize Your Deals
          </h1>
          <p className="text-gray-500">
            Select the categories you're interested in to help us decipher the best drops for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {CATEGORIES.map((category, index) => {
            const isSelected = selected.includes(category.id)
            const Icon = category.icon

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-red-600' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{category.label}</span>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4 text-red-600" />
                    </div>
                  )}
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
          Start Deciphering
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
