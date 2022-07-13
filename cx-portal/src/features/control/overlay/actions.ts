import { createAction } from '@reduxjs/toolkit'
import { name, Overlay } from './types'

const show = createAction(`${name}/show`, (type: Overlay, id?: string) => ({
  payload: {
    type,
    id,
  },
}))

const exec = createAction(`${name}/exec`, (id: string) => ({
  payload: {
    type: Overlay.NONE,
    id,
  },
}))

export { show, exec }
