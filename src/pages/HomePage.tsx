import { ProductCard, List, Badge, Button, Skeleton } from '@shopify/shop-minis-react'
import { Timer, TrendingDown, Percent, Lock, Unlock, Clock, Settings } from 'lucide-react'
import { useDailyDeals } from '../hooks/useDailyDeals'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserPreferences } from '../hooks/useUserPreferences'
import { useNavigate } from 'react-router'

// --- Components ---

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      
      const diff = tomorrow.getTime() - now.getTime()
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center text-xs font-mono bg-black text-white px-2 py-1 rounded">
      <Clock className="w-3 h-3 mr-1" />
      {timeLeft}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="pb-8 bg-gray-50 min-h-screen">
      <div className="px-4 py-6 bg-white border-b border-gray-100">
        <Skeleton className="h-8 w-48 rounded mb-2" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>
      <div className="p-4">
        <Skeleton className="h-[400px] w-full rounded-xl mb-6" />
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const { resetPreferences } = useUserPreferences()
  const { topDeal, otherDeals, fetchMore, isLoading, isPersonalized, selectedCategoryNames } = useDailyDeals()
  const [isMysteryRevealed, setIsMysteryRevealed] = useState(false)

  const handleReset = async () => {
      await resetPreferences()
      navigate('/onboarding') // Force reload/redirect
  }

  if (isLoading && !topDeal) {
    return <LoadingSkeleton />
  }

  return (
    <div className="pb-8 bg-gray-50 min-h-screen relative">
      
      {/* Glassy Header */}
      <div className="px-4 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all">
        <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight truncate">Daily Deal Decipher</h1>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                    {isPersonalized ? 'Curated for you' : 'Top drops'}
                  </p>
                  {selectedCategoryNames.length > 0 && (
                     <>
                      <span className="text-gray-300 text-xs">•</span>
                      <div className="flex items-center gap-1 overflow-hidden mask-linear-fade">
                         <span className="text-xs text-gray-600 font-medium truncate">
                           {selectedCategoryNames.join(', ')}
                         </span>
                      </div>
                     </>
                  )}
                </div>
            </div>
            <div className="flex gap-2 items-center flex-shrink-0">
                <button 
                  onClick={handleReset}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Reset Preferences"
                >
                  <Settings className="w-5 h-5 text-gray-500" />
                </button>
            </div>
        </div>
      </div>

      {/* Hero: Mystery Deal of the Day */}
      <div className="p-4 mb-2">
        <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse shadow-sm">
                        <Timer className="w-3 h-3 mr-1" /> Expires Soon
                    </Badge>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Daily Mystery</span>
                </div>
                <CountdownTimer />
            </div>
        </div>
        
        <AnimatePresence mode="wait">
            {topDeal ? (
                !isMysteryRevealed ? (
                    <motion.div 
                        key="mystery"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        onClick={() => setIsMysteryRevealed(true)}
                        className={`bg-gray-900 rounded-xl overflow-hidden shadow-xl border-2 border-gray-800 h-[400px] relative group touch-manipulation cursor-pointer`}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-6 text-center bg-black/40 group-active:bg-black/50 transition-colors">
                            <motion.div 
                                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
                            >
                                <Lock className={`w-16 h-16 mb-4 text-yellow-400`} />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">
                                Decipher Today's Top Drop
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Tap to reveal the biggest savings of the day.
                            </p>
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-mono text-sm border border-white/10">
                                ???????
                            </div>
                        </div>
                        {/* Blurred background hint */}
                        <div className="absolute inset-0 opacity-30 blur-xl">
                             <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600"></div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="revealed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                         <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-md flex items-center gap-1">
                           <Unlock className="w-3 h-3" /> -{topDeal.discountPercentage}%
                         </div>
                         <ProductCard product={topDeal} />
                    </motion.div>
                )
            ) : (
                <div className="h-[400px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    No Deal Found
                </div>
            )}
        </AnimatePresence>
      </div>

      {/* List: Top Drops */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-lg font-bold flex items-center text-gray-900">
            <Percent className="w-5 h-5 mr-2 text-blue-600" />
            {isPersonalized ? 'For You' : 'More Top Drops'}
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium border border-gray-200">Updated Daily</span>
        </div>

        {otherDeals.length > 0 ? (
          <List
            items={otherDeals}
            useWindowScroll={true}
            fetchMore={fetchMore}
            renderItem={(product, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 relative group" 
                key={product.id}
              >
                 <div className="absolute top-2 left-2 z-10">
                    <Badge variant="secondary" className="shadow-sm border-white/50 backdrop-blur-sm">-{product.discountPercentage}%</Badge>
                 </div>
                 <ProductCard product={product} />
              </motion.div>
            )}
          />
        ) : (
           <div className="text-center py-10 text-gray-500">
             <p>No other major drops found right now.</p>
             <Button variant="secondary" onClick={() => fetchMore()} className="mt-4">Check for more</Button>
           </div>
        )}
      </div>
    </div>
  )
}
