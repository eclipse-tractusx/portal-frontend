import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'features/store'
import I18nService from 'services/I18nService'
import UserService from 'services/UserService'
import { AuthProvider } from 'components/AuthProvider'
import AuthorizingRouter from 'components/AuthorizingRouter'
import ErrorRouter from 'components/ErrorRouter'
import {
  SharedThemeProvider,
  SharedCssBaseline,
} from 'cx-portal-shared-components'

I18nService.init()

UserService.init((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <SharedCssBaseline />
      <Provider store={store}>
        <SharedThemeProvider>
          <AuthProvider user={user}>
            <AuthorizingRouter />
          </AuthProvider>
        </SharedThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('app')
  )
})
