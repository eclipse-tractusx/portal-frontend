export const name = 'admin/appManagement'

export type SearchInputState = {
  open: boolean
  text: string
}

export interface AppManagementState {
  searchInput: SearchInputState
  currentActiveStep: number
  appId: string
}

export const initialState: AppManagementState = {
  searchInput: {
    open: false,
    text: '',
  },
  currentActiveStep: 1,
  appId: '',
}
