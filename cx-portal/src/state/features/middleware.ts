import appsMW from '../deprecated/apps/appsMW'

const rootMiddleware = (getDefaultMiddleware: any) => [
  ...getDefaultMiddleware(),
  appsMW,
]

export default rootMiddleware
