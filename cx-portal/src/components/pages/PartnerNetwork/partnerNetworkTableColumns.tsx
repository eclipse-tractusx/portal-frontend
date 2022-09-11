import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box } from '@mui/material'

import smallLogo from '../../../assets/logo/cx-logo-short.svg'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'name',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 2.5,
      sortable: false,
    },
    {
      field: 'bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
      sortable: false,
    },
    {
      field: 'cxmember', // Temporary field, doesnt exists yet
      headerName: t('content.partnernetwork.columns.cxparticipant'),
      flex: 1,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <Box
            component="img"
            padding=".5rem"
            src={smallLogo}
            alt="membershipFlag"
          />
        ) : (
          ''
        ),
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1.5,
      sortable: false,
    },
    {
      field: 'detail',
      headerName: `Detail`,
      headerAlign: 'center',
      flex: 0.8,
      align: 'center',
      renderCell: () => (
        <IconButton
          color="secondary"
          size="small"
          style={{ alignSelf: 'center' }}
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
  ]
}
