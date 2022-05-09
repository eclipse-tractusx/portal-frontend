import {
  getApiBase,
  getAssetBase,
  getHostname,
  isLocal,
} from './EnvironmentService'

const ENV = [
  {
    name: 'localhost',
    hostname: 'localhost',
    origin: 'http://localhost',
    assets: 'https://portal.dev.demo.catena-x.net/assets',
    api: 'https://portal-backend.dev.demo.catena-x.net',
  },
  {
    name: 'dev',
    hostname: 'portal.dev.demo.catena-x.net',
    origin: 'https://portal.dev.demo.catena-x.net',
    assets: '/assets',
    api: 'https://portal-backend.dev.demo.catena-x.net',
  },
  {
    name: 'int',
    hostname: 'portal.int.demo.catena-x.net',
    origin: 'https://portal.int.demo.catena-x.net',
    assets: '/assets',
    api: 'https://portal-backend.int.demo.catena-x.net',
  },
  {
    name: 'prod',
    hostname: 'portal.catena-x.net',
    origin: 'https://portal.catena-x.net',
    assets: '/assets',
    api: 'https://portal-backend.catena-x.net',
  },
]

describe('EnvironmentService', () => {
  beforeAll(() => {
    global.window = Object.create(window)
  })

  ENV.forEach((env) =>
    it(`returns correct references for ${env.name}`, () => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: env,
      })
      expect(getHostname()).toEqual(env.hostname)
      expect(isLocal()).toEqual(env.hostname === 'localhost')
      expect(getApiBase()).toEqual(env.api)
      expect(getAssetBase()).toEqual(env.assets)
    })
  )
})
