import { createAction } from '@reduxjs/toolkit'
import { name, Overlay } from './types'

const show = createAction(`${name}/show`, (type: Overlay, id?: string) => ({
  payload: {
    type,
    id,
  },
}))

export { show }
