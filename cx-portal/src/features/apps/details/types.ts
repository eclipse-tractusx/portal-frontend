/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { AppMarketplaceApp } from 'features/apps/marketplaceDeprecated/types'

export const name = 'apps/details'

export type AppDetails = AppMarketplaceApp & {
  providerUri: string
  contactEmail: string
  contactNumber: string
  detailPictureUris: string[]
  longDescription: string
  isSubscribed: string
  tags: string[]
  languages: string[]
}

export type AppDetailsState = {
  item: AppDetails
  loading: boolean
  error: string
}

export const AppDetailInitial = {
  id: 'default',
  title: '',
  provider: '',
  leadPictureUri: 'trans.png',
  shortDescription: '',
  useCases: [''],
  price: '',
  providerUri: '',
  contactEmail: '',
  contactNumber: '',
  detailPictureUris: [''],
  longDescription: '',
  isSubscribed: '',
  tags: [''],
  languages: [''],
}

export const initialState: AppDetailsState = {
  item: AppDetailInitial,
  loading: true,
  error: '',
}
