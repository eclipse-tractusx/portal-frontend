import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ShellDescriptor } from 'state/features/digitalTwins/types'

// Columns definitions of Digital Twin page Data Grid
export const DigitalTwinsTableColumns = ( translationHook: any, onDetailClick: (id: string) => void ): Array<GridColDef> => {
  const { t } = translationHook()
  const columnIds = ['idShort', 'sm_count', 'asset_count']

  return [
    ...columnIds.map(item => {return {
      field: item,
      headerName: t(`content.digitaltwin.table.columns.${item}`),
      flex: 1,
    }}),
    {
      field: '',
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
