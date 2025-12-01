import { usePopularProducts, useProductSearch } from '@shopify/shop-minis-react'
import { useMemo } from 'react'
import { useUserPreferences } from './useUserPreferences'

export interface DealProduct {
  id: string
  title: string
  vendor: string
  productType?: string
  featuredImage?: {
    url: string
  }
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice?: {
    amount: string
    currencyCode: string
  }
}

export interface Deal extends DealProduct {
  discountPercentage: number
  savingsAmount: number
}

export function useDailyDeals() {
  const { preferences } = useUserPreferences()
  const popular = usePopularProducts()
  
  // Construct a search query using 'product_type' which works with Category Names (e.g. "Apparel & Accessories")
  // This is more robust than 'filters.category' which requires strict GIDs and perfectly tagged products.
  const query = useMemo(() => {
    if (preferences.categories.length === 0) return ''
    
    // Create a query that looks for the category name in product_type OR tag
    // Example: (product_type:"Apparel & Accessories" OR tag:"Apparel & Accessories")
    return preferences.categories
      .map(cat => `(product_type:"${cat}" OR tag:"${cat}")`)
      .join(' OR ')
  }, [preferences.categories])

  const search = useProductSearch({ query })

  const hasPreferences = preferences.categories.length > 0
  
  const source = hasPreferences ? search : popular

  const { products, fetchMore, loading, hasNextPage } = source

  const deals = useMemo(() => {
    if (!products) return []

    const dealsList = products
      .filter((product: any) => {
        const price = parseFloat(product.price?.amount || product.price || '0')
        const compareAt = parseFloat(product.compareAtPrice?.amount || product.compareAtPrice || '0')
        return compareAt > price
      })
      .map((product: any) => {
        const price = parseFloat(product.price?.amount || product.price || '0')
        const compareAt = parseFloat(product.compareAtPrice?.amount || product.compareAtPrice || '0')
        const discountPercentage = Math.round(((compareAt - price) / compareAt) * 100)
        const savingsAmount = compareAt - price
        
        return {
          ...product,
          discountPercentage,
          savingsAmount
        }
      })
      .sort((a: any, b: any) => b.discountPercentage - a.discountPercentage)

    return dealsList
  }, [products])

  const topDeal = deals.length > 0 ? deals[0] : null
  const otherDeals = deals.length > 1 ? deals.slice(1) : []

  return {
    topDeal,
    otherDeals,
    allDeals: deals,
    fetchMore,
    isLoading: loading,
    hasMore: hasNextPage,
    isPersonalized: hasPreferences
  }
}
