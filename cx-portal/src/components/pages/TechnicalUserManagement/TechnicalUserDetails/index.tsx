import { PageHeader, Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TechnicalUserDetailsGrid } from './TechnicalUserDetailsGrid'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function TechnicalUserDetails() {
  const { t } = useTranslation()
  const location = useLocation()
  const data: any = location.state

  const removeTechnicalUser = () => {
    console.log('TODO: Remove technical user function!')
  }

  const headerTitle = t('content.usermanagement.technicalUser.detailsHeader')

  return (
    <main className="technical-user-details">
      <PageHeader
        title={headerTitle.replace('USER_NAME', data.username)}
        spacingTop={-84}
        headerHeight={314}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>

      <section>
        <Button
          size="small"
          variant="outlined"
          startIcon={<HighlightOffIcon />}
          onClick={removeTechnicalUser}
        >
          {t('content.usermanagement.technicalUser.delete')}
        </Button>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '130px',
          marginBottom: '92px',
          width: '100%'
        }}>
          <TechnicalUserDetailsGrid
            items={['Client ID', 'Auth Type', 'Client Secret']}
            title= {t('content.usermanagement.technicalUser.detailsPage.userDetails')}
          />

          <TechnicalUserDetailsGrid
            items={['Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat']}
            title= {t('content.usermanagement.technicalUser.detailsPage.description')}
          />

          <TechnicalUserDetailsGrid
            items={['Organisation name', 'User Name', 'admin@gmail.com']}
            title= {t('content.usermanagement.technicalUser.detailsPage.spoc')}
          />

          <TechnicalUserDetailsGrid
            items={['load registry data', 'view registry data', 'access_xy']}
            title= {t('content.usermanagement.technicalUser.detailsPage.permission')}
          />
        </Box>
        
      </section>
    </main>
  )
}
