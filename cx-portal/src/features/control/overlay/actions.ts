import { createAction } from '@reduxjs/toolkit'
import { OVERLAYS } from 'types/Constants'
import { name } from './types'

const closeOverlay = createAction(`${name}/closeOverlay`, () => ({
  payload: {
    type: OVERLAYS.NONE,
    id: '',
  },
}))

const show = createAction(`${name}/show`, (type: OVERLAYS, id?: string) => ({
  payload: {
    type,
    id,
  },
}))

const exec = createAction(`${name}/exec`, (id: string) => ({
  payload: {
    type: OVERLAYS.NONE,
    id,
  },
}))

export { closeOverlay, show, exec }
