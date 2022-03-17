import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../theme'
import '../../../scss/fonts.scss'

interface SharedThemeProviderProps {
  children: React.ReactNode
}

export const SharedThemeProvider = ({ children }: SharedThemeProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
