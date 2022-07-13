import { createAction } from '@reduxjs/toolkit'
import { OVERLAYS } from 'types/Constants'
import { name } from './types'

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

export { show, exec }
