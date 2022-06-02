import {
  getApiBase,
  getAssetBase,
  getCentralIdp,
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
    idp: 'https://centralidp.dev.demo.catena-x.net/auth',
  },
  {
    name: 'dev',
    hostname: 'portal.dev.demo.catena-x.net',
    origin: 'https://portal.dev.demo.catena-x.net',
    assets: '/assets',
    api: 'https://portal-backend.dev.demo.catena-x.net',
    idp: 'https://centralidp.dev.demo.catena-x.net/auth',
  },
  {
    name: 'int',
    hostname: 'portal.int.demo.catena-x.net',
    origin: 'https://portal.int.demo.catena-x.net',
    assets: '/assets',
    api: 'https://portal-backend.int.demo.catena-x.net',
    idp: 'https://centralidp.demo.catena-x.net/auth',
  },
  {
    name: 'prod',
    hostname: 'portal.catena-x.net',
    origin: 'https://portal.catena-x.net',
    assets: '/assets',
    api: 'https://portal-backend.catena-x.net',
    idp: 'https://centralidp.catena-x.net/auth',
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
      expect(getCentralIdp()).toEqual(env.idp)
    })
  )
})
