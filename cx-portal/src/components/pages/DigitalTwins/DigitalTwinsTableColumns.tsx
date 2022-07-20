import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ShellDescriptor } from 'features/digitalTwins/types'


// Columns definitions of Digital Twin page Data Grid
export const DigitalTwinsTableColumns = (
  translationHook: any,
  onDetailClick: (id: string) => void
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'idShort',
      headerName: t('content.digitaltwin.table.columns.idShort'),
      flex: 3,
      filterable: false
    },
    {
      field: 'sm_count',
      headerName: t('content.digitaltwin.table.columns.sm_count'),
      flex: 2,
      type: 'number',
      filterable: false,
      sortable: false,
      renderCell: ({ row }: { row: ShellDescriptor }) => row.submodelDescriptors.length
    },
    {
      field: 'asset_count',
      headerName: t('content.digitaltwin.table.columns.asset_count'),
      flex: 2,
      type: 'number',
      filterable: false,
      sortable: false,
      renderCell: ({ row }: { row: ShellDescriptor }) => row.specificAssetIds.length,
    },
    {
      field: 'detail',
      headerName: `Detail`,
      flex: 1,
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: ({ row }: { row: ShellDescriptor }) => (
        <IconButton
          onClick={() => onDetailClick(row.identification)}
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
