import { useNavigate } from 'react-router-dom'
import { AppMarketplaceApp } from 'state/features/appMarketplace/types'
import { getAssetBase } from 'utils/EnvUtil'

export const useAppCards = (apps: AppMarketplaceApp[]) => {
  const navigate = useNavigate()

  return apps.map((app) => ({
    ...app,
    image: app.leadPictureUri
      ? {
          src: app.leadPictureUri,
          alt: app.title,
        }
      : {
          src: `${getAssetBase() || ''}/images/apps/default/lead.png`,
          alt: app.title,
        },
    onButtonClick: () => {
      navigate(`/appdetail/demo`)
    },
  }))
}
