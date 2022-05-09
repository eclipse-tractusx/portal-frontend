export const getApiBase = () =>
  `https://portal-backend.${
    document.location.hostname.includes('.int.') ? 'int' : 'dev'
  }.demo.catena-x.net/`

export const getAssetBase = () =>
  `https://portal.${
    document.location.hostname.includes('.int.') ? 'int' : 'dev'
  }.demo.catena-x.net/assets`

const EnvironmentService = {
  getApiBase,
  getAssetBase,
}

export default EnvironmentService
