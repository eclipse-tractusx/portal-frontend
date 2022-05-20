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
  if (hostname === 'portal.catena-x.net')
    return 'https://centralidp.catena-x.net/auth'
  return 'https://catenaxdev003akssrv.germanywestcentral.cloudapp.azure.com/iamcentralidp/auth'
}
//export const getCentralIdp = () =>
//  isLocal()
//    ? LOCAL_SERVICES_CENTRALIDP
//    : window.location.origin.replace('portal', 'centralidp')

//TODO: remove once migration to ng keycloak is wrapped up one only Cl2-CX-Portal is relevant any longer
export const getClientId = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.catena-x.net') return 'Cl2-CX-Portal'
  if (hostname === 'portal.catena-x.net') return 'Cl2-CX-Portal'
  return 'catenax-portal'
}

//TODO: remove hard coded url and activate after setup of BPDM Api
export const getBpdmApiBase = () =>
  'https://catenax-bpdm-dev.demo.catena-x.net/api'
//export const getBpdmApiBase = () =>
//  isLocal()
//    ? LOCAL_SERVICES_BPDM
//    : window.location.origin.replace('portal', 'bpdm')

export const getSemanticApiBase = () =>
  'https://catenaxintakssrv.germanywestcentral.cloudapp.azure.com/semantics'

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
