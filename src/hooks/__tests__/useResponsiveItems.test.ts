import { renderHook } from '@testing-library/react'
import { act } from 'react'
import {
  getResponsiveItemsCount,
  useResponsiveItems,
} from '../useResponsiveItems'

vi.mock('@cofinity-x/shared-components', () => ({
  cfxTheme: {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  },
}))

const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('getResponsiveItemsCount', () => {
  it('returns 1 item for small screens (< 900px)', () => {
    expect(getResponsiveItemsCount(500)).toBe(1)
    expect(getResponsiveItemsCount(800)).toBe(1)
    expect(getResponsiveItemsCount(899)).toBe(1)
    expect(getResponsiveItemsCount(0)).toBe(1)
  })

  it('returns 2 items for medium screens (900px - 1199px)', () => {
    expect(getResponsiveItemsCount(900)).toBe(2)
    expect(getResponsiveItemsCount(1000)).toBe(2)
    expect(getResponsiveItemsCount(1199)).toBe(2)
  })

  it('returns 3 items for large screens (1200px - 1535px)', () => {
    expect(getResponsiveItemsCount(1200)).toBe(3)
    expect(getResponsiveItemsCount(1300)).toBe(3)
    expect(getResponsiveItemsCount(1535)).toBe(3)
  })

  it('returns 4 items for extra large screens (>= 1536px)', () => {
    expect(getResponsiveItemsCount(1536)).toBe(4)
    expect(getResponsiveItemsCount(1600)).toBe(4)
    expect(getResponsiveItemsCount(2000)).toBe(4)
    expect(getResponsiveItemsCount(3000)).toBe(4)
  })
})

describe('useResponsiveItems', () => {
  beforeEach(() => {
    mockInnerWidth(1200)
  })

  describe('initial state', () => {
    it('initializes itemsShown based on current window width', () => {
      mockInnerWidth(1000) // Should return 2 items (900-1199px range)
      const { result } = renderHook(() => useResponsiveItems())

      expect(result.current.itemsShown).toBe(2)
    })

    it('initializes with correct count for different screen sizes', () => {
      // Test small screen (< 900px)
      mockInnerWidth(500)
      const { result: smallResult } = renderHook(() => useResponsiveItems())
      expect(smallResult.current.itemsShown).toBe(1)

      // Test large screen (1200-1535px)
      mockInnerWidth(1300)
      const { result: largeResult } = renderHook(() => useResponsiveItems())
      expect(largeResult.current.itemsShown).toBe(3)

      // Test extra large screen (>= 1536px)
      mockInnerWidth(1600)
      const { result: xlResult } = renderHook(() => useResponsiveItems())
      expect(xlResult.current.itemsShown).toBe(4)
    })
  })

  describe('handleToggleItems', () => {
    it('expands to show all items when currently showing default count', () => {
      mockInnerWidth(1300) // Should show 3 items by default (lg breakpoint)
      const { result } = renderHook(() => useResponsiveItems())

      const itemsToShow = [1, 2, 3] // Currently showing 3 items
      const allItems = [1, 2, 3, 4, 5, 6, 7, 8] // Total 8 items

      act(() => {
        result.current.handleToggleItems(itemsToShow, allItems)
      })

      expect(result.current.itemsShown).toBe(8) // Should expand to show all
    })

    it('collapses to show default count when showing all items', () => {
      mockInnerWidth(1300) // Should show 3 items by default (lg breakpoint)
      const { result } = renderHook(() => useResponsiveItems())

      const allItems = [1, 2, 3, 4, 5, 6, 7, 8] // Total 8 items

      // First expand to show all items
      act(() => {
        result.current.setItemsShown(8)
      })
      expect(result.current.itemsShown).toBe(8)

      // Then toggle to collapse
      act(() => {
        result.current.handleToggleItems(allItems, allItems)
      })

      expect(result.current.itemsShown).toBe(3) // Should collapse to default
    })

    it('handles edge case when itemsToShow equals allItems length', () => {
      mockInnerWidth(1300) // 3 items default (lg breakpoint)
      const { result } = renderHook(() => useResponsiveItems())

      const allItems = [1, 2, 3]

      act(() => {
        result.current.handleToggleItems(allItems, allItems)
      })

      // When showing all items (3) and total is 3, should collapse to default (3)
      expect(result.current.itemsShown).toBe(3)
    })
  })

  describe('return values', () => {
    it('returns all expected functions and values', () => {
      const { result } = renderHook(() => useResponsiveItems())

      expect(result.current).toHaveProperty('itemsShown')
      expect(result.current).toHaveProperty('setItemsShown')
      expect(result.current).toHaveProperty('handleToggleItems')
      expect(result.current).toHaveProperty('getResponsiveItemsCount')

      expect(typeof result.current.itemsShown).toBe('number')
      expect(typeof result.current.setItemsShown).toBe('function')
      expect(typeof result.current.handleToggleItems).toBe('function')
      expect(typeof result.current.getResponsiveItemsCount).toBe('function')
    })

    it('getResponsiveItemsCount function works correctly', () => {
      const { result } = renderHook(() => useResponsiveItems())

      expect(result.current.getResponsiveItemsCount(500)).toBe(1)
      expect(result.current.getResponsiveItemsCount(900)).toBe(2)
      expect(result.current.getResponsiveItemsCount(1200)).toBe(3)
      expect(result.current.getResponsiveItemsCount(1536)).toBe(4)
    })
  })

  describe('real-world usage scenarios', () => {
    it('simulates typical expand/collapse workflow', () => {
      mockInnerWidth(1038) // 2 items default
      const { result } = renderHook(() => useResponsiveItems())

      // Initial state - showing default count
      expect(result.current.itemsShown).toBe(2)

      // Simulate clicking "More" button
      const visibleItems = [1, 2]
      const totalItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      act(() => {
        result.current.handleToggleItems(visibleItems, totalItems)
      })

      // Should expand to show all items
      expect(result.current.itemsShown).toBe(10)

      // Simulate clicking "Collapse" button
      act(() => {
        result.current.handleToggleItems(totalItems, totalItems)
      })

      // Should collapse back to default
      expect(result.current.itemsShown).toBe(2)
    })
  })
})
