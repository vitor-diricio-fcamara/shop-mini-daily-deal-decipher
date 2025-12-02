// @ts-ignore
import categoriesData from '../data/categories.json'

export interface CategoryNode {
  id: string
  level: number
  name: string
  full_name?: string
  parent_id?: string | null
  attributes?: any[]
  children?: CategoryNode[]
  ancestors?: any[]
}

export interface Vertical {
  name: string
  prefix: string
  categories: CategoryNode[]
}

export interface TaxonomyData {
  version: string
  verticals: Vertical[]
}

// Memoize the maps to avoid re-computation on every call
let keywordMap: Record<string, string[]> | null = null
let gidMap: Record<string, string[]> | null = null
let verticalGidMap: Record<string, string> | null = null

function buildKeywordMap() {
  if (keywordMap) return keywordMap

  const map: Record<string, string[]> = {}
  const data = categoriesData as TaxonomyData

  data.verticals.forEach((vertical) => {
    // Set ensuring uniqueness
    const keywords = new Set<string>()
    
    // Add the vertical name itself
    keywords.add(vertical.name)

    // Extract ALL category names from ALL levels in the categories array
    // The categories array contains a flattened list of all categories at all levels
    vertical.categories.forEach((category) => {
      keywords.add(category.name)
      
      // Also recursively traverse children if they exist (for nested structures)
      const traverseChildren = (children: any[]) => {
        children.forEach((child: any) => {
          if (child.name) {
            keywords.add(child.name)
          }
          // Some children might have their own children
          if (child.children && Array.isArray(child.children)) {
            traverseChildren(child.children)
          }
        })
      }
      
      if (category.children && Array.isArray(category.children)) {
        traverseChildren(category.children)
      }
    })

    map[vertical.name] = Array.from(keywords)
  })

  keywordMap = map
  return map
}

function buildGidMap() {
  if (gidMap) return gidMap

  const map: Record<string, string[]> = {}
  const verticalGid: Record<string, string> = {}
  const data = categoriesData as TaxonomyData

  data.verticals.forEach((vertical) => {
    // Set ensuring uniqueness for GIDs
    const gids = new Set<string>()
    
    // Find the root category (level 0) for this vertical
    const rootCategory = vertical.categories.find(cat => cat.level === 0)
    if (rootCategory) {
      // Store the root GID for this vertical
      verticalGid[vertical.name] = rootCategory.id
      gids.add(rootCategory.id)
    }

    // Extract ALL GIDs from ALL levels in the categories array
    // The categories array contains a flattened list of all categories at all levels
    vertical.categories.forEach((category) => {
      if (category.id && category.id.startsWith('gid://shopify/TaxonomyCategory/')) {
        gids.add(category.id)
      }
      
      // Also recursively traverse children if they exist (for nested structures)
      const traverseChildren = (children: any[]) => {
        children.forEach((child: any) => {
          if (child.id && child.id.startsWith('gid://shopify/TaxonomyCategory/')) {
            gids.add(child.id)
          }
          // Some children might have their own children
          if (child.children && Array.isArray(child.children)) {
            traverseChildren(child.children)
          }
        })
      }
      
      if (category.children && Array.isArray(category.children)) {
        traverseChildren(category.children)
      }
    })

    map[vertical.name] = Array.from(gids)
  })

  gidMap = map
  verticalGidMap = verticalGid
  return map
}

export function getKeywordsForCategory(categoryName: string): string[] {
  const map = buildKeywordMap()
  return map[categoryName] || [categoryName]
}

/**
 * Get all GIDs from all taxonomy levels for a given vertical name
 * @param verticalName - The name of the vertical (e.g., "Apparel & Accessories")
 * @returns Array of all GIDs from level 0 through level 5+
 */
export function getGidsForVertical(verticalName: string): string[] {
  const map = buildGidMap()
  return map[verticalName] || []
}

/**
 * Get the root GID (level 0) for a given vertical name
 * @param verticalName - The name of the vertical
 * @returns The root GID (e.g., "gid://shopify/TaxonomyCategory/aa")
 */
export function getRootGidForVertical(verticalName: string): string | null {
  buildGidMap() // Ensure the map is built
  return verticalGidMap?.[verticalName] || null
}

/**
 * Get all level 2 categories from all verticals
 * @returns Array of level 2 categories with id, name, full_name
 */
export function getLevel2Categories(): Array<{ id: string; name: string; full_name: string }> {
  const data = categoriesData as TaxonomyData
  const level2Categories: Array<{ id: string; name: string; full_name: string }> = []
  
  data.verticals.forEach((vertical) => {
    vertical.categories.forEach((category) => {
      if (category.level === 1 && category.full_name) {
        level2Categories.push({
          id: category.id,
          name: category.name,
          full_name: category.full_name
        })
      }
    })
  })
  
  return level2Categories
}

/**
 * Get robust query from category breadcrumb
 * Cleans the full_name breadcrumb and extracts keywords
 * @param category - Category object with full_name property
 * @returns Clean query string
 */
export function getRobustQuery(category: { full_name: string }): string {
  if (!category.full_name) return ''
  
  // 1. Get the full breadcrumb path
  let rawString = category.full_name
  
  // 2. Cleaning: Replace special chars (">", "&") with spaces
  let cleanString = rawString.replace(/[>&]/g, " ")
  
  // 3. Split by spaces, filter out empty strings and short words, then deduplicate
  let words = cleanString.split(/\s+/)
    .filter(word => word.length > 2) // Filter out short words like "&", ">", etc.
    .map(word => word.trim())
    .filter(word => word.length > 0)
  
  // 4. Deduplicate words to keep the query cleaner
  let uniqueKeywords = [...new Set(words)].join(" ")
  
  return uniqueKeywords
}

