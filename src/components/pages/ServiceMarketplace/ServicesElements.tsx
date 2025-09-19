import { CfxGrid, Typography } from '@cofinity-x/shared-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'
import { AppCardWithImage } from 'components/AppCardImage'
import { getApiBase } from 'services/EnvironmentService'
import { ToTitleCase } from 'utils/dataMapper'

export default function ServicesElements({
  services,
}: {
  services: ServiceRequest[]
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/serviceMarketplaceDetail/${id}`)
  }

  return (
    <div className="services-main" data-testid="all-services-container">
      <div className="mainContainer">
        <div className="mainRow">
          <div className="services-section-content">
            <Typography
              sx={{ fontFamily: 'LibreFranklin-Light' }}
              variant="h3"
              className="section-title"
            >
              {t('content.serviceMarketplace.allServices')}
            </Typography>
          </div>
          <CfxGrid data-testid="service-list" container spacing={3}>
            {services.map((service: ServiceRequest) => {
              const imageUrl =
                service?.leadPictureId &&
                `${getApiBase()}/api/services/${service.id}/serviceDocuments/${service.leadPictureId}`
              return (
                <CfxGrid
                  key={service.id}
                  size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
                >
                  <AppCardWithImage
                    item={{
                      ...service,
                      name: service.title,
                      leadPictureId: imageUrl,
                    }}
                    tags={(service.serviceTypeIds ?? []).map((category) =>
                      ToTitleCase(category)
                    )}
                    onClick={handleClick}
                  />
                </CfxGrid>
              )
            })}
          </CfxGrid>
        </div>
      </div>
    </div>
  )
}
