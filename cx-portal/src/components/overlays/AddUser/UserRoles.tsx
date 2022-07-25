import { useTranslation } from 'react-i18next'
import { Checkbox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'

interface UserRolesProps {
  headline?: string
}

export const UserRoles = ({ headline }: UserRolesProps) => {
  const { t } = useTranslation()
  const userRoles = [
    {
      id: 'itAdmin',
      title: t('global.userRoles.itAdmin'),
    },
    {
      id: 'businessAdmin',
      title: t('global.userRoles.businessAdmin'),
    },
    {
      id: 'cxUser',
      title: t('global.userRoles.cxUser'),
    },
    {
      id: 'dataSpecialist',
      title: t('global.userRoles.dataSpecialist'),
    },
    {
      id: 'appDeveloper',
      title: t('global.userRoles.appDeveloper'),
    },
    {
      id: 'appAdmin',
      title: t('global.userRoles.appAdmin'),
    },
  ]

  return (
    <Box
      sx={{
        '.checkbox-section': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        label: {
          fontSize: '16px',
        },
      }}
    >
      {headline && (
        <div className="add-user-title">
          <SubHeaderTitle title={headline} variant="body1" />
        </div>
      )}

      <div className="checkbox-section">
        {userRoles.map(({ title, id }) => (
          <Checkbox label={title} key={id} />
        ))}
      </div>
    </Box>
  )
}
