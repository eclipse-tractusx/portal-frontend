import {
  StatusTag,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import { userHasPortalRole } from 'services/AccessService'
import { ROLES, PAGES } from 'types/Constants'

export default function MyCompanyInfoComponent({
  editable = true,
}: {
  readonly editable?: boolean
}) {
  const { t } = useTranslation()
  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery('')

  const companyData = [
    {
      key: t('content.organization.companyDetails.companyName'),
      value: companyDetails?.shortName ?? 'N/A',
    },
    {
      key: t('content.organization.companyDetails.bpn'),
      value: companyDetails?.bpn ?? 'N/A',
    },
    {
      key: t('content.organization.companyDetails.street'),
      value: companyDetails
        ? companyDetails.streetName + ' ' + companyDetails.streetNumber
        : 'N/A',
    },
    {
      key: t('content.organization.companyDetails.postal'),
      value: companyDetails
        ? companyDetails.zipCode + ' ' + companyDetails.city
        : 'N/A',
    },
    {
      key: t('content.organization.companyDetails.region'),
      value:
        companyDetails?.countryAlpha2Code +
        (companyDetails?.region ? ', ' + companyDetails?.region : ''),
    },
  ]

  const companyRoleData = [
    {
      key: '',
      value: (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {companyDetails?.companyRole.map((item: string) => (
            <StatusTag
              key={item}
              color="label"
              label={t(`content.companyRolesUpdate.${item}`)}
            />
          ))}
        </Box>
      ),
    },
  ]

  return (
    <>
      <Typography variant="h2" className="main-title">
        {t('pages.organization')}
      </Typography>

      <div className="table-section">
        <Box
          sx={{
            width: '50%',
            '@media (max-width: 1200px)': {
              order: 1,
              width: '50%',
            },
          }}
        >
          <KeyValueView
            cols={1.5}
            title={t('content.organization.companyDetails.title')}
            items={companyData}
          />
        </Box>
        <Box
          sx={{
            width: '50%',
            '@media (max-width: 1200px)': {
              order: 1,
              width: '50%',
            },
          }}
        >
          <KeyValueView
            cols={1.5}
            title={t('content.organization.companyRoles.title')}
            items={companyRoleData}
            editLink={
              editable && userHasPortalRole(ROLES.UPDATE_COMPANY_ROLE)
                ? `/${PAGES.COMPANY_ROLE}`
                : ''
            }
          />
        </Box>
      </div>
    </>
  )
}
