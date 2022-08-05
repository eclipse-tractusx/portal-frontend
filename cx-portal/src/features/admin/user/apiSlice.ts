import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppUser, TenantUser } from 'features/admin/user/types'
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
    fetchAppUsers: builder.query<PaginResult<AppUser>, string>({
      query: (appId, page = 0) =>
        `/api/administration/user/owncompany/apps/${appId}/users?size=${PAGE_SIZE}&page=${page}`,
    }),
  }),
})

export const { useFetchUsersQuery, useFetchAppUsersQuery } = apiSlice
