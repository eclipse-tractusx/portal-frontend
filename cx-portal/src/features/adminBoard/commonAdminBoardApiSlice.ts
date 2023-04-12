/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'
import { Documents, ImageType } from 'features/apps/apiSlice'
import { PrivacyPolicyType } from './adminBoardApiSlice'
import i18next from 'i18next'

export interface ResponseType {
  id: string
  title: string
  serviceTypes?: string[]
  provider?: string
  descriptions?: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
  images?: string[]
  documents?: Documents
  longDescription?: string
  isSubscribed?: string
  tags?: string[]
  languages?: string[]
  leadPictureUri?: ImageType
  privacyPolicies: PrivacyPolicyType[]
  roles?: string[]
  description?: {
    languageCode: string
    longDescription: string
    shortDescription: string
  }[]
}

type RequestType = {
  id: string
  type: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/common/commonAdminBoardApiSlice',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchBoardDetails: builder.query<ResponseType, RequestType>({
      query: (obj: { id: string; type: string }) => {
        const typeSpecificPath =
          obj.type === 'serviceadminboarddetail'
            ? 'services/servicerelease'
            : 'apps/appreleaseprocess'
        return `/api/${typeSpecificPath}/inReview/${obj.id}?lang=${i18next.language}`
      },
    }),
  }),
})

export const { useFetchBoardDetailsQuery } = apiSlice
