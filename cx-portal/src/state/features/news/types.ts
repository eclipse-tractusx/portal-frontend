import { CardItems } from 'cx-portal-shared-components'

export interface NewsInitialState {
  items: CardItems[]
  loading: boolean
  error: string
}
