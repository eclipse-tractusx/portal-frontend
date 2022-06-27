// Note: The global.scss import must be the first in this file for the library to be build correctly!
import '../../../scss/global.scss'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../theme'
import '../../../scss/fonts.scss'

interface SharedThemeProviderProps {
  children: React.ReactNode
}

export const SharedThemeProvider = ({ children }: SharedThemeProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
