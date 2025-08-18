import { useState, useEffect } from 'react'
import { cfxLightTheme } from '@cofinity-x/shared-components'

export const getResponsiveItemsCount = (width: number): number => {
  if (width >= cfxLightTheme.breakpoints.values.xl) {
    return 4
  } else if (width >= cfxLightTheme.breakpoints.values.lg) {
    return 3
  } else if (width >= cfxLightTheme.breakpoints.values.md) {
    return 2
  } else {
    return 1
  }
}

export const useResponsiveItems = (dependencies?: unknown[]) => {
  const [itemsShown, setItemsShown] = useState(() => {
    return getResponsiveItemsCount(window.innerWidth)
  })

  useEffect(
    () => {
      const handleResize = () => {
        setItemsShown(getResponsiveItemsCount(window.innerWidth))
      }
      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    dependencies ? [...dependencies, setItemsShown] : [setItemsShown]
  )

  const handleToggleItems = (itemsToShow: unknown[], allItems: unknown[]) => {
    const currentWidth = window.innerWidth
    const defaultItems = getResponsiveItemsCount(currentWidth)

    setItemsShown(
      itemsToShow.length >= allItems.length ? defaultItems : allItems.length
    )
  }

  return {
    itemsShown,
    setItemsShown,
    handleToggleItems,
    getResponsiveItemsCount,
  }
}
