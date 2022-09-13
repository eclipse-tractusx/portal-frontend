import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { BusinessPartner } from 'features/newPartnerNetwork/types'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksBPNTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'names',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) =>
        row.names ? row.names[0].value : null,
    },
    {
      field: 'bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) => row.bpn,
    },
    {
      field: 'cxmember', // Temporary field, doesnt exists yet
      headerName: t('content.partnernetwork.columns.cxparticipant'),
      flex: 1.5,
      sortable: false,
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1.5,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) =>
        row ? row.country?.name : '',
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
