import {
  PageHeader,
  Button,
  PageNotificationsProps,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { TechnicalUserDetailsGrid } from './TechnicalUserDetailsGrid'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { RemoveTechnicalUserOverlay } from './RemoveTechnicalUserOverlay'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from 'features/notification/actions'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export default function TechnicalUserDetails() {
  const { t } = useTranslation()
  const location = useLocation()
  const dispatch = useDispatch()
  const data: any = location.state
  const [open, setOpen] = useState(false)

  const openAddTechnicalUserOverlay = () => {
    setOpen(true)
  }
  const closeAddTechnicalUserOverlay = () => {
    setOpen(false)
  }

  const deleteUserIsSuccess = () => {
    // Add delete user logic:
    // If delete is success then show notification:
    const notification: PageNotificationsProps = {
      open: true,
      severity: 'success',
      title:
        'content.usermanagement.technicalUser.confirmDeleteNotificationTitle',
      description:
        'content.usermanagement.technicalUser.confirmDeleteNotificationDescription',
    }

    dispatch(setNotification(notification))
  }

  const removeTechnicalUser = () => {
    console.log('TODO: Remove technical user function!')
    openAddTechnicalUserOverlay()
  }

  const headerTitle = t('content.usermanagement.technicalUser.detailsHeader')
  return (
    <main className="technical-user-details">
      <RemoveTechnicalUserOverlay
        name={data.name}
        dialogOpen={open}
        handleClose={closeAddTechnicalUserOverlay}
        deleteUser={deleteUserIsSuccess}
      />

      <PageHeader
        title={headerTitle.replace('USER_NAME', data.name)}
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
            items={['Client ID', 'Auth Type', 'Client Secret']}
            title={t(
              'content.usermanagement.technicalUser.detailsPage.userDetails'
            )}
          />

          <TechnicalUserDetailsGrid
            items={[
              'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat',
            ]}
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
      </section>
    </main>
  )
}
