import { ProductCard, List, Badge, Button, Skeleton, Toaster, toast } from '@shopify/shop-minis-react'
import { Timer, TrendingDown, Tag, Percent, Lock, Unlock, Clock, Share2, Settings, Bug } from 'lucide-react'
import { useDailyDeals } from '../hooks/useDailyDeals'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserPreferences } from '../hooks/useUserPreferences'
import { useCreateImageContent } from '@shopify/shop-minis-react'
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

function DailyStreak({ streak }: { streak: number }) {
  return (
    <div className="flex items-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
      {streak} Day Streak
    </div>
  )
}

function DebugCard({ debugInfo }: { debugInfo: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!debugInfo) return null

  return (
    <div className="mx-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-900">Debug Info</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-blue-700">
            {debugInfo.rawProductCount} products → {debugInfo.dealsCount} deals
          </span>
          <span className="text-blue-500">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-blue-200 pt-3">
          <div>
            <div className="text-xs font-semibold text-blue-800 mb-1">Selected Categories:</div>
            <div className="flex flex-wrap gap-1">
              {debugInfo.selectedCategories.length > 0 ? (
                debugInfo.selectedCategories.map((cat: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">{cat}</Badge>
                ))
              ) : (
                <span className="text-xs text-gray-500">None (using popular products)</span>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-blue-800 mb-1">
              Search Terms ({debugInfo.searchTerms?.length || 0}):
            </div>
            <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
              {debugInfo.searchTerms && debugInfo.searchTerms.length > 0 ? (
                <>
                  {debugInfo.searchTerms.slice(0, 20).map((term: string, i: number) => (
                    <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {term}
                    </span>
                  ))}
                  {debugInfo.searchTerms.length > 20 && (
                    <span className="text-xs text-gray-500">
                      +{debugInfo.searchTerms.length - 20} more terms...
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs text-gray-500">No search terms (using popular products)</span>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-blue-800 mb-1">Results:</div>
            <div className="text-xs text-gray-700 space-y-1">
              <div>Raw products found: <strong>{debugInfo.rawProductCount}</strong></div>
              <div>Deals after filtering: <strong>{debugInfo.dealsCount}</strong></div>
              <div>Search Method: <strong className={debugInfo.searchMethod === 'Breadcrumb Query' ? 'text-green-600' : 'text-gray-600'}>{debugInfo.searchMethod || 'Popular Products'}</strong></div>
            </div>
          </div>
          
          {debugInfo.query && (
            <div>
              <div className="text-xs font-semibold text-blue-800 mb-1">Query (first 200 chars):</div>
              <div className="text-xs bg-gray-100 p-2 rounded font-mono text-gray-700 break-all">
                {debugInfo.query.substring(0, 200)}
                {debugInfo.query.length > 200 && '...'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const { preferences, updateStreak, resetPreferences } = useUserPreferences()
  const { topDeal, otherDeals, fetchMore, isLoading, isPersonalized, debugInfo } = useDailyDeals()
  const { createImageContent, loading: sharing } = useCreateImageContent()
  
  const [isMysteryRevealed, setIsMysteryRevealed] = useState(false)

  useEffect(() => {
    updateStreak()
  }, [])

  // Logic for Vault
  const isVaultUnlocked = preferences.streak >= 3

  // Format currency helper
  const formatMoney = (amount: string | number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(typeof amount === 'string' ? parseFloat(amount) : amount)
  }

  const handleShareDeal = async (product: any) => {
    try {
      if (!product.featuredImage?.url) return

      toast.success('Preparing to share...')
      
      // Fetch image as blob
      const response = await fetch(product.featuredImage.url)
      const blob = await response.blob()
      const file = new File([blob], "deal.jpg", { type: "image/jpeg" })

      await createImageContent({
        image: file,
        contentTitle: `Deciphered Deal: ${product.title}`,
        visibility: ['DISCOVERABLE', 'LINKABLE']
      })
      
      toast.success('Deal shared to your Shop feed!')
    } catch (error) {
      console.error('Share failed:', error)
      toast.error('Failed to share deal')
    }
  }

  const handleReset = async () => {
      await resetPreferences()
      navigate('/onboarding') // Force reload/redirect
  }

  if (isLoading && !topDeal) {
    return <LoadingSkeleton />
  }

  return (
    <div className="pb-8 bg-gray-50 min-h-screen relative">
      <Toaster />
      
      {/* Glassy Header */}
      <div className="px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all">
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">Daily Deal Decipher</h1>
                </div>
                <p className="text-xs text-gray-500">
                  {isPersonalized ? 'Curated for you.' : 'Biggest drops, tracked daily.'}
                </p>
            </div>
            <div className="flex gap-2 items-center">
                <DailyStreak streak={preferences.streak} />
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
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse shadow-sm">
                    <Timer className="w-3 h-3 mr-1" /> Expires Soon
                </Badge>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Daily Mystery</span>
            </div>
            <CountdownTimer />
        </div>
        
        <AnimatePresence mode="wait">
            {topDeal ? (
                !isMysteryRevealed ? (
                    <motion.div 
                        key="mystery"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        onClick={() => isVaultUnlocked && setIsMysteryRevealed(true)}
                        className={`bg-gray-900 rounded-xl overflow-hidden shadow-xl border-2 border-gray-800 h-[400px] relative group touch-manipulation ${isVaultUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-6 text-center bg-black/40 group-active:bg-black/50 transition-colors">
                            <motion.div 
                                animate={{ rotate: isVaultUnlocked ? [0, -10, 10, -5, 5, 0] : 0 }}
                                transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
                            >
                                <Lock className={`w-16 h-16 mb-4 ${isVaultUnlocked ? 'text-yellow-400' : 'text-gray-500'}`} />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">
                                {isVaultUnlocked ? "Decipher Today's Top Drop" : "Locked by Streak"}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {isVaultUnlocked 
                                    ? "Tap to reveal the biggest savings of the day." 
                                    : `Visit ${3 - preferences.streak} more days to unlock the Mystery Vault.`}
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
                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-red-100 ring-2 ring-red-50 relative"
                    >
                         <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-md flex items-center gap-1">
                           <Unlock className="w-3 h-3" /> -{topDeal.discountPercentage}%
                         </div>
                         <ProductCard product={topDeal} />
                         <div className="px-4 pb-4 -mt-2 space-y-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                <span className="flex items-center"><Tag className="w-4 h-4 mr-1"/> You save</span>
                                <span className="font-bold text-red-700 text-lg">{formatMoney(topDeal.savingsAmount)}</span>
                            </div>
                            <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => handleShareDeal(topDeal)}
                                disabled={sharing}
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                {sharing ? 'Sharing...' : 'Share Discovery'}
                            </Button>
                        </div>
                    </motion.div>
                )
            ) : (
                <div className="h-[400px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    No Deal Found
                </div>
            )}
        </AnimatePresence>
      </div>

      {/* Debug Card */}
      <DebugCard debugInfo={debugInfo} />

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
