export const name = 'control/overlay'

export enum Overlay {
  NONE = 'NONE',
  PARTNER = 'PARTNER',
  NEWS = 'NEWS',
  USER = 'USER',
  ADD_USER = 'ADD_USER',
  TECHUSER = 'TECHUSER',
  APP = 'APP',
  INVITE = 'INVITE',
  ADD_BPN = 'ADD_BPN',
}

export type OverlayState = {
  type: Overlay
  id: string
}

export const initialState = {
  type: Overlay.NONE,
  id: '',
}
