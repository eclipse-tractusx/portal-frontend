import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TenantUser } from 'features/admin/user/types'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { PaginResult } from 'types/MainTypes'
import { PAGE_SIZE } from 'types/Constants'

export const apiSlice = createApi({
  reducerPath: 'rtk/admin/users',
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
