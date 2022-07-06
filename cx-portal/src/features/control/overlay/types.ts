export const name = 'control/overlay'

export enum Overlay {
  NONE = 'NONE',
  COMPANY = 'COMPANY',
  USER = 'USER',
  ADD_USER = 'ADD_USER',
  TECHUSER = 'TECHUSER',
  APP = 'APP',
  INVITE = 'INVITE',
}

export type OverlayState = {
  type: Overlay
  id: string
}

export const initialState = {
  type: Overlay.NONE,
  id: '',
}
