import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Columns definitions of Connector page Data Grid
export const ConnectorTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'name',
      headerName: t('content.connector.columns.name'),
      flex: 2.5,
      sortable: false,
    },
    {
      field: 'id',
      headerName: t('content.connector.columns.id'),
      flex: 2,
      sortable: false,
    },
    {
      field: 'type',
      headerName: t('content.connector.columns.type'),
      flex: 1,
      sortable: false,
    },
    {
      field: 'detail',
      headerName: t('content.connector.columns.details'),
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
