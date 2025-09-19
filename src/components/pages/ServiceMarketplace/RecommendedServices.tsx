import { CfxGrid, CircleProgress } from '@cofinity-x/shared-components'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'
import { AppCardWithImage } from 'components/AppCardImage'
import { getApiBase } from 'services/EnvironmentService'
import NoItems from 'components/pages/NoItems'
import { ToTitleCase } from 'utils/dataMapper'

export default function RecommendedServices({
  services,
}: {
  services?: ServiceRequest[]
}) {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/serviceMarketplaceDetail/${id}`)
  }

  if (services && services.length === 0) {
    return (
      <div className="recommended-section">
        <NoItems />
      </div>
    )
  }

  return (
    <>
      {services?.length ? (
        <CfxGrid data-testid="recommended-service-list" container spacing={3}>
          {services.map((item) => {
            const imageUrl =
              item?.leadPictureId &&
              `${getApiBase()}/api/services/${item.id}/serviceDocuments/${item.leadPictureId}`
            return (
              <CfxGrid
                key={item.id}
                size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
              >
                <AppCardWithImage
                  item={{
                    ...item,
                    name: item.title,
                    leadPictureId: imageUrl,
                  }}
                  tags={(item.serviceTypeIds ?? []).map((category) =>
                    ToTitleCase(category)
                  )}
                  onClick={handleClick}
                />
              </CfxGrid>
            )
          })}
        </CfxGrid>
      ) : (
        <div className="loading-progress">
          <CircleProgress
            variant="indeterminate"
            colorVariant="primary"
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      )}
    </>
  )
}
