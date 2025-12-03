import { usePopularProducts, useProductSearch } from '@shopify/shop-minis-react'
import { useMemo } from 'react'
import { useUserPreferences } from './useUserPreferences'
import { getRobustQuery } from '../utils/taxonomyUtils'
// @ts-ignore
import categoriesData from '../data/categories.json'

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
  
  // Build query from selected level 2 categories using breadcrumb paths
  const searchQuery = useMemo(() => {
    if (preferences.categories.length === 0) {
      console.log('[useDailyDeals] No categories selected, using popular products')
      return ''
    }
    
    // Find categories by their IDs and build queries from their breadcrumbs
    const queries: string[] = []
    
    preferences.categories.forEach(categoryId => {
      // Search through all verticals to find the category
      let foundCategory: any = null
      ;(categoriesData as any).verticals.forEach((vertical: any) => {
        const category = vertical.categories?.find((cat: any) => cat.id === categoryId)
        if (category && category.full_name) {
          foundCategory = category
        }
      })
      
      if (foundCategory) {
        const robustQuery = getRobustQuery(foundCategory)
        if (robustQuery) {
          queries.push(robustQuery)
          console.log(`[useDailyDeals] Category "${foundCategory.name}" -> Query: "${robustQuery}"`)
        }
      }
    })
    
    if (queries.length === 0) {
      console.warn('[useDailyDeals] No valid categories found, using popular products')
      return ''
    }
    
    // Combine all queries with OR
    const combinedQuery = queries.join(' OR ')
    console.log(`[useDailyDeals] Combined query: ${combinedQuery.substring(0, 200)}...`)
    return combinedQuery
  }, [preferences.categories])

  const selectedCategoryNames = useMemo(() => {
    const names: string[] = []
    preferences.categories.forEach(categoryId => {
      let foundCategory: any = null
      ;(categoriesData as any).verticals.forEach((vertical: any) => {
        const category = vertical.categories?.find((cat: any) => cat.id === categoryId)
        if (category) {
          foundCategory = category
        }
      })
      
      if (foundCategory) {
        names.push(foundCategory.name)
      }
    })
    return names
  }, [preferences.categories])

  const search = useProductSearch({ 
    query: searchQuery,
    skip: !searchQuery
  })

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
    isPersonalized: hasPreferences,
    selectedCategoryNames,
    // Debug info
    debugInfo: {
      searchTerms: searchQuery ? searchQuery.split(' OR ').slice(0, 20) : [],
      selectedCategories: preferences.categories,
      rawProductCount: products?.length || 0,
      dealsCount: deals.length,
      query: searchQuery || 'No query (using popular products)',
      isUsingSearch: hasPreferences,
      searchMethod: hasPreferences ? 'Breadcrumb Query' : 'Popular Products'
    }
  }
}
