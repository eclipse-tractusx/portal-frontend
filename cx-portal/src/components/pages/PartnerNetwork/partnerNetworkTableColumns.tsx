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
      flex: 2.5,
    },
    {
      field: 'bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1.5,
    },
    {
      field: 'city',
      headerName: t('content.partnernetwork.columns.city'),
      flex: 1.5,
    },
    {
      field: 'detail',
      headerName: `Detail`,
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
