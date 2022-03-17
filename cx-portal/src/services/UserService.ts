import Keycloak from 'keycloak-js'
import { IUser } from 'types/user/UserTypes'
import { ROLES } from 'types/MainTypes'
import AccessService from './AccessService'
import { error, info } from './LogService'

const keycloakConfig: Keycloak.KeycloakConfig = {
  url: process.env.REACT_APP_BASE_CENTRAL_IDP,
  realm: 'CX-Central',
  clientId: 'catenax-portal',
}

// TODO: add an ESLint exception until there is a solution
/* eslint @typescript-eslint/no-explicit-any: "off" */
const KC = new (Keycloak as any)(keycloakConfig)

const init = (onAuthenticatedCallback: (loggedUser: IUser) => any) => {
  KC.init({
    onLoad: 'login-required',
    silentCheckSsoRedirectUri:
      window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  }).then((authenticated: boolean) => {
    if (authenticated) {
      info(`${getUsername()} authenticated`)
      AccessService.init()
      onAuthenticatedCallback(getLoggedUser())
    } else {
      doLogin()
    }
  })
}

KC.onTokenExpired = () => {
  KC.updateToken(50)
    .then((refreshed: boolean) => {
      info(`${getUsername()} refreshed ${refreshed}`)
      //TODO: update token in redux store
      //store.dispatch(setLoggedUser(getLoggedUser()))
    })
    .catch(() => {
      error(`${getUsername()} refresh failed`)
    })
}

const doLogin = KC.login

const doLogout = KC.logout

const getToken = () => KC.token

const getParsedToken = () => KC.tokenParsed

const updateToken = () => KC.updateToken(5).catch(doLogin)

const getUsername = () => KC.tokenParsed.preferred_username

const getName = () => KC.tokenParsed?.name

const getEmail = () => KC.tokenParsed?.email

const getCompany = () => KC.tokenParsed?.organisation

const getRoles = () =>
  KC.tokenParsed?.resource_access[keycloakConfig.clientId]?.roles

const hasRole = (role: string) => getRoles()?.includes(role)

const isAdmin = () => hasRole(ROLES.CX_ADMIN)

const isLoggedIn = () => !!KC.token

const getLoggedUser = () => ({
  userName: getUsername(),
  name: getName(),
  email: getEmail(),
  company: getCompany(),
  roles: getRoles(),
  isAdmin: isAdmin(),
  token: getToken(),
  parsedToken: getParsedToken(),
})

const UserService = {
  doLogin,
  doLogout,
  getToken,
  getParsedToken,
  getEmail,
  getUsername,
  getName,
  getCompany,
  getRoles,
  hasRole,
  init,
  isAdmin,
  isLoggedIn,
  updateToken,
}

export default UserService
