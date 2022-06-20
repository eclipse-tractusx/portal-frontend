export const name = 'admin/error'

export interface ErrorServiceState {
  hasError: boolean
  hasNavigation?: boolean
  header: string
  title?: string
  description?: string
  reloadPageLink?: string
  reloadButtonTitle?: string
  homePageLink?: string
  homeButtonTitle?: string
}

export const initialState: ErrorServiceState = {
  hasError: false,
  hasNavigation: false,
  header: '',
  title: '',
  description: '',
}
