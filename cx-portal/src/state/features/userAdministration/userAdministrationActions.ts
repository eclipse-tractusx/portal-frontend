import { createAsyncThunk } from '@reduxjs/toolkit'
import { store } from 'state/store'
import { api } from 'state/api'

const fetchTenantUsers = createAsyncThunk(
  'userAdministration/fetchTenantUsers',
  async () => {
    try {
      // Call axios instance to get values
      if (store.getState().user?.token) {
        const tenant = store.getState().user?.tenant
        const userAdministrationApi = api.UserAdministrationApi.getInstance(
          store.getState().user?.token
        )
        return await userAdministrationApi.getTenantUsers(tenant)
      }
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchTenantUsers api call error')
    }
  }
)

export { fetchTenantUsers }
