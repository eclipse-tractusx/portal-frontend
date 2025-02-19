/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import Keycloak, { type KeycloakResourceAccess } from 'keycloak-js'
import { getCentralIdp, getClientId, getRealm } from './EnvironmentService'
import { type LogData, error, info } from './LogService'
import { store } from 'features/store'
import { setLoggedUser } from 'features/user/slice'

const keycloakConfig: Keycloak.KeycloakConfig = {
  url: getCentralIdp(),
  realm: getRealm(),
  clientId: getClientId(),
}

const KC = new Keycloak(keycloakConfig)

const update = () => {
  KC.updateToken(600)
    .then((refreshed: boolean) => {
      info(`${getUsername()} token refreshed ${refreshed}`)
    })
    .catch(() => {
      error(`${getUsername()} token refresh failed`)
    })
}

const init = (onAuthenticatedCallback: () => void) => {
  KC.init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
  })
    .then((authenticated: boolean) => {
      if (authenticated) {
        info(`${getUsername()} authenticated`)
        onAuthenticatedCallback()
      } else {
        error(`${getUsername()} authentication failed`)
      }
    })
    .catch((err: LogData | undefined) => {
      error('Keycloak initialization failed', err)
    })
}

KC.onTokenExpired = () => {
  info(`${getUsername()} token expired`)
  update()
}

const doLogin = KC.login

const doLogout = KC.logout

const getToken = () => KC.token

const getParsedToken = () => KC.tokenParsed

const getUsername = () => KC.tokenParsed?.preferred_username

const getName = () => KC.tokenParsed?.name

const getCompany = () => KC.tokenParsed?.organisation

const getAccess = (): KeycloakResourceAccess =>
  KC.tokenParsed?.resource_access ?? {}

const UserService = {
  doLogin,
  doLogout,
  getAccess,
  getToken,
  getParsedToken,
  getName,
  getUsername,
  getCompany,
  init,
}

export default UserService
