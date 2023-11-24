/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

// Add an ESLint exception until there is a solution
// eslint-disable-next-line
declare const ENV: any

export const getApiBase = () =>
  typeof ENV === 'undefined' ? '' : (ENV.PORTAL_BACKEND_URL as string)

export const getAssetBase = () =>
  typeof ENV === 'undefined' ? '' : (ENV.PORTAL_ASSETS_URL as string)

export const getCentralIdp = () =>
  typeof ENV === 'undefined' ? '' : (ENV.CENTRALIDP_URL as string)

export const getClientId = () => 'Cl2-CX-Portal' as string

export const getBpdmApiBase = () =>
  typeof ENV === 'undefined' ? '' : (ENV.BPDM_API_URL as string)

export const getSemanticApiBase = () =>
  typeof ENV === 'undefined' ? '' : (ENV.SEMANTICS_URL as string)

export const getClientIdSemantic = () => 'Cl3-CX-Semantic' as string

export const getManagedIdentityWalletsNewBase = () =>
  typeof ENV === 'undefined'
    ? ''
    : (ENV.MANAGED_IDENTITY_WALLETS_NEW_URL as string)

const EnvironmentService = {
  getApiBase,
  getAssetBase,
  getBpdmApiBase,
  getCentralIdp,
  getSemanticApiBase,
  getClientId,
  getClientIdSemantic,
  getManagedIdentityWalletsNewBase,
}

export default EnvironmentService
