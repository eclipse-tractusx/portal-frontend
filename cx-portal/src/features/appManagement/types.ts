export const name = 'admin/appManagement'

export interface SearchInputState {
  open: boolean
  text: string
}

export const initialState: SearchInputState = {
  open: false,
  text: '',
}
