import { useTranslation } from 'react-i18next'
import { Button, Typography } from '@cofinity-x/shared-components'
import { useNavigate } from 'react-router-dom'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import { Box, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootState } from 'features/store'
import { GRID_STYLES } from '../sharedStyles'
import { AppCardWithImage } from 'components/AppCardImage'
import { getApiBase } from 'services/EnvironmentService'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const isHeaderNote = useSelector((state: RootState) => state.home.headerNote)

  const appCards =
    data &&
    data.length > 0 &&
    data
      .slice(0, 4)
      .map(CommonService.appToCard)
      .map((i) => (
        <AppCardWithImage
          key={i.id}
          item={{
            ...i,
            leadPictureId: `${getApiBase()}/api/apps/${i.id}/appDocuments/${i.leadPictureId}`,
          }}
          fullWidth={false}
          onClick={() => {
            navigate(`/appdetail/${i.id}`)
          }}
        />
      ))

  return (
    <section className="app-store-section" data-testid="new-apps-section">
      <Typography variant="h2" className="section-title">
        {t('content.home.appStoreSection.title')}
      </Typography>
      <Box data-testid="new-apps-cards" sx={GRID_STYLES}>
        {appCards}
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
      >
        <div>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            size="small"
            disabled={isHeaderNote}
            onClick={() => {
              navigate('/cfxAppMarketplace')
            }}
          >
            {t('pages.cfxAppMarketplace')}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            size="small"
            disabled={isHeaderNote}
            onClick={() => {
              navigate('/serviceMarketplace')
            }}
          >
            {t('pages.serviceMarketplace')}
          </Button>
        </div>
      </Stack>
    </section>
  )
}
