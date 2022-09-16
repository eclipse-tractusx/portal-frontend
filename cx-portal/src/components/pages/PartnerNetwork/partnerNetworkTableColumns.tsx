import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { BusinessPartnerSearchResponse } from 'features/newPartnerNetwork/types'
import { Box } from '@mui/material'
import smallLogo from '../../../assets/logo/cx-logo-short.svg'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'legalEntity.names',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartnerSearchResponse }) =>
        row?.legalEntity && row?.legalEntity?.names
          ? row.legalEntity.names[0].value
          : '',
    },
    {
      field: 'legalEntity.bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartnerSearchResponse }) =>
        row?.legalEntity ? row.legalEntity.bpn : '',
    },
    {
      field: 'cxmember', // Temporary field, doesnt exists yet
      headerName: t('content.partnernetwork.columns.cxparticipant'),
      flex: 1.5,
      sortable: false,
      renderCell: (params) =>
        params &&
        params.row &&
        params.row.legalEntity &&
        params.row.legalEntity.member ? (
          <Box
            component="img"
            padding=".5rem"
            src={smallLogo}
            alt="membershipFlag"
            sx={{
              width: 40,
            }}
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
      valueGetter: ({ row }: { row: BusinessPartnerSearchResponse }) =>
        row?.legalEntity ? row.legalEntity.legalAddress?.country?.name : '',
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
