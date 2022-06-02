import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TechnicalUserDetailsGrid } from '../TechnicalUserDetails/TechnicalUserDetailsGrid'
import { Box } from '@mui/material'
import { ServiceAccountDetail } from 'features/admin/service/types'

export default function Render({ item }: { item: ServiceAccountDetail }) {
  const { t } = useTranslation()

  const removeTechnicalUser = () => {
    console.log('TODO: Remove technical user function!')
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        startIcon={<HighlightOffIcon />}
        onClick={removeTechnicalUser}
      >
        {t('content.usermanagement.technicalUser.delete')}
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '130px',
          marginBottom: '92px',
          width: '100%',
        }}
      >
        <TechnicalUserDetailsGrid
          items={[item.clientId, item.authenticationType, item.secret]}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.userDetails'
          )}
        />

        <TechnicalUserDetailsGrid
          items={[item.description]}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.description'
          )}
        />

        <TechnicalUserDetailsGrid
          items={['Organisation name', 'User Name', 'admin@gmail.com']}
          title={t('content.usermanagement.technicalUser.detailsPage.spoc')}
        />

        <TechnicalUserDetailsGrid
          items={['load registry data', 'view registry data', 'access_xy']}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.permission'
          )}
        />
      </Box>
    </>
  )
}
