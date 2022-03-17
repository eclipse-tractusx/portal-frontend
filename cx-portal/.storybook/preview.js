import { SharedThemeProvider } from 'cx-portal-shared-components'
import React from 'react'
import { GlobalStyle } from '../src/components/Global'

export const decorators = [
  (Story) => (
    <SharedThemeProvider>
      <GlobalStyle />
      <Story />
    </SharedThemeProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
