import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../state/store'
import I18nService from '../services/I18nService'
import { SharedThemeProvider } from 'cx-portal-shared-components'
import { AuthProvider } from './AuthProvider'
import AuthorizingRouter from './AuthorizingRouter'
import { IUser } from 'types/user/UserTypes'
import AccessService from 'services/AccessService'

const TestUser: IUser = {
  company: 'CX Test Access',
  email: 'gustav.gans@bmw.de',
  isAdmin: true,
  name: 'Test User CX Admin',
  parsedToken: '',
  roles: [
    'view_client_roles',
    'add_digitial_twin',
    'setup_connector',
    'add_semantic_model',
    'add_user_account',
    'delete_user_account',
    'add_app',
    'view_semantic_hub',
    'filter_apps',
    'CX Admin',
    'invite_new_partner',
    'view_user_management',
    'setup_idp',
    'view_digital_twins',
    'edit_apps',
    'view_apps',
    'delete_apps',
  ],
  token: '...',
  userName: 'cx-test-access.fd3525bc-e0aa-44c6-8446-c5a155c87335',
}

describe('testSuite', () => {
  beforeEach(() => {
    I18nService.init()
    AccessService.init()
  })

  it('renders the header', () => {
    const { container } = render(
      <Provider store={store}>
        <SharedThemeProvider>
          <AuthProvider user={TestUser}>
            <AuthorizingRouter />
          </AuthProvider>
        </SharedThemeProvider>
      </Provider>
    )
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('.Dashboard')).toBeInTheDocument()
    expect(container.querySelector('.Footer')).toBeInTheDocument()
    expect(container.querySelector('.Appstore')).not.toBeInTheDocument()
  })
})
