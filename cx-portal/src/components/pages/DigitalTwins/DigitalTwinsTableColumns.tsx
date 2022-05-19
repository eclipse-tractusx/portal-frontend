import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ShellDescriptor } from 'state/features/digitalTwins/types'

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
      flex: 2,
    },
    {
      field: 'sm_count',
      headerName: t('content.digitaltwin.table.columns.sm_count'),
      flex: 1,
      align: 'center',
      renderCell: ({ row }: { row: ShellDescriptor }) => (
        <>{row.submodelDescriptors.length}</>
      ),
    },
    {
      field: '',
      headerName: t('content.digitaltwin.table.columns.asset_count'),
      flex: 1,
      align: 'center',
      renderCell: ({ row }: { row: ShellDescriptor }) => (
        <>{row.specificAssetIds.length}</>
      ),
    },
    {
      field: 'detail',
      headerName: `Detail`,
      flex: 1,
      align: 'center',
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
