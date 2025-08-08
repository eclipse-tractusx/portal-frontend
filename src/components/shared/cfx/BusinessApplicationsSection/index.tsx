import { useTranslation } from 'react-i18next'
import { Typography } from '@cofinity-x/shared-components'
import Box from '@mui/material/Box'
import { useFetchBusinessAppsQuery } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import { GRID_STYLES } from '../sharedStyles'
import { AppCardWithImage } from 'components/AppCardImage'
import { useNavigate } from 'react-router-dom'
import { getApiBase } from 'services/EnvironmentService'

const EMPTY_BOX_STYLES = {
  width: '310px',
  height: '154px',
  border: '3px dashed #f3f3f3',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
}

const EmptyBox = ({ text }: { text: string }) => (
  <Box sx={EMPTY_BOX_STYLES}>
    <Typography variant="body1" fontSize={18}>
      {text}
    </Typography>
  </Box>
)

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchBusinessAppsQuery()

  const appCards =
    data?.map(CommonService.appToCard).map((item) => (
      <Box className="ph-no-capture" key={item.id}>
        <AppCardWithImage
          item={{
            ...item,
            leadPictureId: `${getApiBase()}/api/apps/${item.id}/appDocuments/${item.leadPictureId}`,
          }}
          fullWidth={false}
          onClick={() => {
            navigate(`/appdetail/${item.id}`)
          }}
        />
      </Box>
    )) ?? []

  const emptyCards =
    data && data.length < 4
      ? Array.from({ length: 4 - data.length }, (_, i) => (
          <EmptyBox
            key={`empty-${i}`}
            text={t('content.home.emptyCards.title')}
          />
        ))
      : []

  return (
    <div className="orange-background-home">
      <section
        className="business-applications-section"
        data-testid="accessible-apps-section"
      >
        <Typography variant="h2" className="section-title">
          {t('content.home.businessApplicationsSection.title')}
        </Typography>
        <Box data-testid="accessible-apps-cards" sx={GRID_STYLES}>
          {appCards}
          {emptyCards}
        </Box>
      </section>
    </div>
  )
}
