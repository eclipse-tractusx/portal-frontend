import { OVERLAYS } from 'types/Constants'

export const name = 'control/overlay'

export type OverlayState = {
  type: OVERLAYS
  id: string
}

export const initialState = {
  type: OVERLAYS.NONE,
  id: '',
}
