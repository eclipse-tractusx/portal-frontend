import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TenantUser } from 'features/admin/user/types'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { PAGE_SIZE, PaginResult } from 'types/MainTypes'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBase(),
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${UserService.getToken()}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<PaginResult<TenantUser>, number | void>({
      query: (page = 0) =>
        `/api/administration/user/owncompany/users?status=ACTIVE&size=${PAGE_SIZE}&page=${page}`,
    }),
  }),
})

export const { useFetchUsersQuery } = apiSlice
