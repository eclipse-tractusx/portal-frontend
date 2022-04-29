import { Typography } from 'cx-portal-shared-components'
import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { useTranslation } from 'react-i18next'
import './AppUserDetails.scss'

export type UserRole = {
  name: string,
  description: string,
}

export default function AppUserDetails(){
  const { t } = useTranslation()
  const roles: UserRole[] = [
    { name: 'Admin', description: 'role Description'},
    { name: 'User', description: 'role Description'},
    { name: 'Editor', description: 'role Description'},
  ]

  return (
    <div className="app-user-details">
      <div className="app-user-details-title-section">
        <Typography 
          sx={{ fontFamily: 'LibreFranklin-Light'}}
          variant="h4"
          className="app-user-details-title"
        >
          {t('content.usermanagement.appUserDetails.headline')}
        </Typography>
      </div>

      <AppUserDetailsHeader roles={roles}/>
    </div>
  )
}
