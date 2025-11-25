import { ProductCard, List, Badge, Button } from '@shopify/shop-minis-react'
import { Timer, TrendingDown, Tag, Percent } from 'lucide-react'
import { useDailyDeals } from '../hooks/useDailyDeals'

export function HomePage() {
  const { topDeal, otherDeals, fetchMore } = useDailyDeals()

  // Format currency helper
  const formatMoney = (amount: string | number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(typeof amount === 'string' ? parseFloat(amount) : amount)
  }

  if (!topDeal) {
    return <div className="flex justify-center items-center h-screen">Loading deals...</div>
  }

  return (
    <div className="pb-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="px-4 py-6 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown className="w-6 h-6 text-red-600" />
          <h1 className="text-xl font-bold text-gray-900">Daily Deal Decipher</h1>
        </div>
        <p className="text-sm text-gray-500">Biggest drops, tracked daily.</p>
      </div>

      {/* Hero: Deal of the Day */}
      {topDeal && (
        <div className="p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="destructive" className="animate-pulse">
              <Timer className="w-3 h-3 mr-1" /> Expires Soon
            </Badge>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Deal of the Day</span>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-red-100 ring-2 ring-red-50">
            <div className="relative">
               <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-md">
                 -{topDeal.discountPercentage}%
               </div>
               <ProductCard product={topDeal} />
            </div>
            <div className="px-4 pb-4 -mt-2">
               <div className="flex items-center justify-between text-sm text-gray-600 bg-red-50 p-2 rounded-lg">
                 <span className="flex items-center"><Tag className="w-4 h-4 mr-1"/> You save</span>
                 <span className="font-bold text-red-700">{formatMoney(topDeal.savingsAmount)}</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* List: Top Drops */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Percent className="w-5 h-5 mr-2 text-blue-600" />
            Top Drops
          </h2>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Today's picks</span>
        </div>

        {otherDeals.length > 0 ? (
          <List
            items={otherDeals}
            // height={600} // Let it flow naturally or use window height
            useWindowScroll={true}
            fetchMore={fetchMore}
            renderItem={(product) => (
              <div className="mb-4 relative" key={product.id}>
                 <div className="absolute top-2 left-2 z-10">
                    <Badge variant="secondary">-{product.discountPercentage}%</Badge>
                 </div>
                 <ProductCard product={product} />
              </div>
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

