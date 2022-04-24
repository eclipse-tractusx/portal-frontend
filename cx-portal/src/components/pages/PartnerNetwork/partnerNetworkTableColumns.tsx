import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'name',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 4,
    },
    {
      field: 'bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2.5,
    },
    {
      field: 'taxId',
      headerName: t('content.partnernetwork.columns.taxid'),
      flex: 1,
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1,
    },

    {
      field: '',
      headerName: `Detail`,
      flex: 1,
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
