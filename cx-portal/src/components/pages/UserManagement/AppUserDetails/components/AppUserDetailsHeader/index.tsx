import { Typography } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UserRole } from '../../../AppUserDetails';
import './AppUserDetailsHeader.scss'

export interface AppUserDetailsHeaderProps {
  roles: UserRole[];
}

export default function AppUserDetailsHeader({ roles }: AppUserDetailsHeaderProps) {
  const { t } = useTranslation()

  return (
    <section className="app-user-details-header">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light', marginBottom: '40px !important' }}
        variant="h3"
        className="section-title"
      >
        {t('content.usermanagement.appUserDetails.header.title')}
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        {t('content.usermanagement.appUserDetails.header.subtitle')}
      </Box>

      <div className="app-user-details-header-roles-section">
        {roles.map((role) => {
          return (
            <div className="app-user-details-header-role">
              <Typography variant="h5">
                {role.name}
              </Typography>
              <Typography
                variant="h6"
                className="app-user-details-header-description"
              >
                {role.description}
              </Typography>
            </div>
          )
        })}
      </div>
    </section>
  )
}
