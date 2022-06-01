const LOCAL_SERVICES_FRONTEND = 'https://portal.dev.demo.catena-x.net'
const LOCAL_SERVICES_BACKEND = 'https://portal-backend.dev.demo.catena-x.net'
//const LOCAL_SERVICES_CENTRALIDP = 'https://centralidp.dev.demo.catena-x.net'
//const LOCAL_SERVICES_BPDM = 'https://bpdm.dev.demo.catena-x.net'

export const getHostname = () => window.location.hostname

export const isLocal = () => getHostname() === 'localhost'

export const getApiBase = () =>
  isLocal()
    ? LOCAL_SERVICES_BACKEND
    : window.location.origin.replace('portal', 'portal-backend')

export const getAssetBase = () =>
  `${isLocal() ? LOCAL_SERVICES_FRONTEND : ''}/assets`

//TODO: remove hard coded url and activate after setup of centralidp
export const getCentralIdp = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.catena-x.net')
    return 'https://centralidp.demo.catena-x.net/auth'
  return 'https://centralidp.dev.demo.catena-x.net/auth'
}
//export const getCentralIdp = () =>
//  isLocal()
//    ? LOCAL_SERVICES_CENTRALIDP
//    : window.location.origin.replace('portal', 'centralidp')

export const getClientId = () => 'Cl2-CX-Portal'

//TODO: remove hard coded url and activate after setup of BPDM Api
export const getBpdmApiBase = () =>
  'https://catenax-bpdm-dev.demo.catena-x.net/api'
//export const getBpdmApiBase = () =>
//  isLocal()
//    ? LOCAL_SERVICES_BPDM
//    : window.location.origin.replace('portal', 'bpdm')

export const getSemanticApiBase = () =>
  'https://semantics.int.demo.catena-x.net/'

const EnvironmentService = {
  isLocal,
  getHostname,
  getApiBase,
  getAssetBase,
  getBpdmApiBase,
  getCentralIdp,
  getSemanticApiBase,
  getClientId,
}

export default EnvironmentService
