import appsMW from './apps/appsMW'

const rootMiddleware = (getDefaultMiddleware: any) => [
  ...getDefaultMiddleware(),
  appsMW,
]

export default rootMiddleware
