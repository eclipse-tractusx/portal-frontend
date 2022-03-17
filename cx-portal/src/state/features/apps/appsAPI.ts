import { createAction } from '@reduxjs/toolkit'

export const appsCallBegan = createAction('apps/callBegan')
export const appsCallSuccess = createAction('apps/callSuccess')
export const appsCallFailed = createAction('apps/callFailed')
