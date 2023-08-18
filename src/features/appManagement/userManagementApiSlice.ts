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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from 'utils/rtkUtil'

export type MultipleUsersRequest = {
  identityProviderId: string
  csvFile: any
}

export type MultipleUsersResponse = {
  technicalUserInfo: {
    technicalUserId: string
    technicalUserSecret: string
    technicalClientId: string
    technicalUserPermissions: string[]
  }
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/appManagement',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    addMutipleUsers: builder.mutation<
      MultipleUsersResponse,
      MultipleUsersRequest
    >({
      query: (data: MultipleUsersRequest) => {
        const formData = new FormData()
        formData.append('document', data.csvFile)
        return {
          url: `/api/administration/user/owncompany/identityprovider/${data.identityProviderId}/usersfile`,
          method: 'POST',
          body: formData,
          // headers: {
          //   Accept: 'text/csv; charset=utf-8',
          //   'Content-Type': 'text/csv; charset=utf-8'
          // }
        }
      },
    }),
  }),
})

export const { useAddMutipleUsersMutation } = apiSlice
