import { useTheme } from '@mui/material'
import { cfxTheme } from '@cofinity-x/shared-components'
import { cofinityTheme } from '../theme.override'

/**
 * Get the current theme from the theme provider (merged cofinityTheme)
 */
export const useCurrentTheme = () => {
  return useTheme()
}

/**
 * Get the CFX theme directly
 */
export const useCfxTheme = () => {
  return cfxTheme
}

/**
 * Get the combined Cofinity theme (includes CFX theme + custom overrides)
 */
export const useCofinityTheme = () => {
  return cofinityTheme
}

/**
 * Theme access utility for components that need both themes
 */
export const useThemes = () => {
  const currentTheme = useCurrentTheme()

  return {
    current: currentTheme,
    cfx: cfxTheme,
    cofinity: cofinityTheme,
  }
}
