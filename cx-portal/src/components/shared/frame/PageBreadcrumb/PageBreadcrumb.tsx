import { Breadcrumb } from 'cx-portal-shared-components'
import { Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// This hardcoded Breadcrumbs array have to be replaced with generated array from:
// 1- per adding breadcrumb items in store und read theme in this component with useSelector!
// 2- Or read the router path and add theme as breadcrumb items.
const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    sx={{ cursor: 'pointer', fontSize: '14px' }}
    onClick={() => console.log('navigate to home')}
  >
    Home
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    sx={{ cursor: 'pointer', fontSize: '14px' }}
    onClick={() => console.log('navigate to Breackcrumb 1')}
  >
    Breadcrumb 1
  </Link>,
  <Typography key="3" color="text.primary" sx={{ fontSize: '14px' }}>
    Breadcrumb 2
  </Typography>,
]

export const PageBreadcrumb = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Breadcrumb
      backButton={true}
      backButtonLabel={t('global.actions.breadcrumbBack')}
      backButtonVariant="text"
      onBackButtonClick={() => navigate(-1)}
      breadcrumbs={breadcrumbs}
    />
  )
}
