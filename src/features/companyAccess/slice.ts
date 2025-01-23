import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'features/store'

type ICompany = string[]

const initialState: ICompany = []

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyRoles: (_state: ICompany, action: PayloadAction<ICompany>) => {
      return action.payload
    },
  },
})

export const { setCompanyRoles } = companySlice.actions
export const companySelector = (state: RootState): ICompany =>
  state.companyAccess

export default companySlice.reducer
