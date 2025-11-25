import { usePopularProducts } from '@shopify/shop-minis-react'
import { useMemo } from 'react'

export interface DealProduct {
  id: string
  title: string
  vendor: string
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
  // Add other fields as needed based on actual SDK return type
}

export interface Deal extends DealProduct {
  discountPercentage: number
  savingsAmount: number
}

export function useDailyDeals() {
  const { products, fetchMore } = usePopularProducts()

  const deals = useMemo(() => {
    if (!products) return []

    const dealsList = products
      .filter((product: any) => {
        // Check if product has price and compareAtPrice
        // Note: The actual shape might vary, assuming standard Shopify shape or flattened
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
      .sort((a, b) => b.discountPercentage - a.discountPercentage) // Sort by highest discount

    return dealsList
  }, [products])

  const topDeal = deals.length > 0 ? deals[0] : null
  const otherDeals = deals.length > 1 ? deals.slice(1) : []

  return {
    topDeal,
    otherDeals,
    allDeals: deals,
    fetchMore,
  }
}

