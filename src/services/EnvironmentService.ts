/********************************************************************************
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

import {
  PORTAL_BETA_ENVIRONMENT_URL,
  PORTAL_PRODUCTION_ENVIRONMENT_URL,
  PORTAL_INTEGRATION_ENVIRONMENT_URL,
  PORTAL_TEST_ENVIRONMENT_URL,
  PORTAL_DEVELOPMENT_ENVIRONMENT_URL,
} from '../types/cfx/Constants'

declare const ENV: Record<string, string>

export const isRequireHttpsUrlPattern = () =>
  ENV.REQUIRE_HTTPS_URL_PATTERN !== 'false'

export const isClearinghouseConnectDisabled = () =>
  ENV.CLEARINGHOUSE_CONNECT_DISABLED === 'true'

export const getRealm = () => ENV.REALM ?? ''

export const getClientId = () => ENV.CLIENT_ID ?? ''

export const getClientIdRegistration = () => ENV.CLIENT_ID_REGISTRATION ?? ''

export const getClientIdSemantic = () => ENV.CLIENT_ID_SEMANTIC ?? ''

export const getClientIdBpdm = () => ENV.CLIENT_ID_BPDM ?? ''

export const getClientIdMiw = () => ENV.CLIENT_ID_MIW ?? ''

export const getClientIdSsiCredential = () => ENV.CLIENT_ID_SSI_CREDENTIAL ?? ''

export const getCentralIdp = () => ENV.CENTRALIDP_URL ?? ''

export const getApiBase = () => ENV.PORTAL_BACKEND_URL ?? ''

export const getSsiBase = () => ENV.SSI_CREDENTIAL_URL ?? ''

export const getAssetBase = () => ENV.PORTAL_ASSETS_URL ?? ''

export const getBpdmPoolApiBase = () => ENV.BPDM_POOL_API_URL ?? ''

export const getBpdmGateApiBase = () => ENV.BPDM_GATE_API_URL ?? ''

export const getSemanticApiBase = () => ENV.SEMANTICS_URL ?? ''

export const getMiwBase = () => ENV.MANAGED_IDENTITY_WALLETS_NEW_URL ?? ''

export const getSSICredentialBase = () => ENV.SSI_CREDENTIAL_URL ?? ''

export const getEnvironment = () => {
  switch (window.location.origin) {
    case PORTAL_PRODUCTION_ENVIRONMENT_URL:
      return 'PRODUCTION'
    case PORTAL_BETA_ENVIRONMENT_URL:
      return 'BETA'
    case PORTAL_INTEGRATION_ENVIRONMENT_URL:
      return 'INTEGRATION'
    case PORTAL_TEST_ENVIRONMENT_URL:
      return 'TEST'
    case PORTAL_DEVELOPMENT_ENVIRONMENT_URL:
      return 'DEVELOPMENT'
    default:
      return 'UNKNOWN'
  }
}

const EnvironmentService = {
  isRequireHttpsUrlPattern,
  isClearinghouseConnectDisabled,
  getRealm,
  getClientId,
  getClientIdRegistration,
  getClientIdSemantic,
  getClientIdBpdm,
  getClientIdMiw,
  getClientIdSsiCredential,
  getCentralIdp,
  getApiBase,
  getAssetBase,
  getBpdmPoolApiBase,
  getBpdmGateApiBase,
  getSemanticApiBase,
  getMiwBase,
  getSSICredentialBase,
  getEnvironment,
}

export default EnvironmentService
