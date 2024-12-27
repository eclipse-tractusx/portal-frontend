import { getAssetBase } from 'services/EnvironmentService'

export const ImageReferences = {
  logo: {
    url: `${getAssetBase()}/images-cfx/logos/CofinityX-logo-gray-colored-Cfx.svg`,
    alt: 'Cofinity-X Logo',
  },
  logoMobile: {
    url: `${getAssetBase()}/images-cfx/logos/CofinityX-favicon-gradient-Cfx.svg`,
    alt: 'Cofinity-X Logo',
  },
}
