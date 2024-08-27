import { StaticTable, Typography } from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  type ActiveSubscriptionDetails,
  type SubscribeTechnicalUserData,
} from 'features/apps/types'
// import { Link } from 'react-router-dom'
import UserService from 'services/UserService'
import { PAGES, ROLES } from 'types/Constants'

export default function CompanySubscriptionTechnical({
  detail,
}: {
  detail: ActiveSubscriptionDetails
}) {
  const { t } = useTranslation()

  const tableData = {
    head: [
      t('content.companySubscriptions.connector'),
      t('content.companySubscriptions.technicalUser'),
    ],
    body: [
      [detail?.connectorData?.[0]?.name ?? ''],
      [
        //TODO : render link to below user only...
        !UserService.hasRole(ROLES.VIEW_USER_ACCOUNT)
          ? `
          <Link
            to={/${PAGES.USER_DETAILS}/${detail?.technicalUserData
              ?.map((userdata: SubscribeTechnicalUserData) => userdata.name)
              .toString()}} target="_blank"
          >Link.</Link>`
          : detail?.technicalUserData
              ?.map((userdata: SubscribeTechnicalUserData) => userdata.name)
              .toString() ?? '',
      ],
    ],
  }
  return (
    <Box sx={{ mt: '59px' }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {'Technical Details'}
      </Typography>
      <StaticTable data={tableData} horizontal={true} />
    </Box>
  )
}
