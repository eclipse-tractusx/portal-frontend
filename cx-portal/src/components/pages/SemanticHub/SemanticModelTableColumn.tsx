import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { SemanticModel } from 'features/semanticModels/types'

// Columns definitions of Digital Twin page Data Grid
export const SemanticModelTableColumns = (
  t: any,
  onDetailClick: (id: string) => void
): Array<GridColDef> => {
  const columnIds = ['name', 'status', 'type', 'version', 'src']
  return [
    ...columnIds.map((item) => {
      return {
        field: item,
        flex: item === 'name' || item ==='status' ? 3 : 2,
        headerName: t(`content.semantichub.table.columns.${item}`),
      }
    }),
    {
      field: 'detail',
      headerName: `Detail`,
      flex: 1,
      align: 'center',
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: { row: SemanticModel }) => (
        <IconButton
          onClick={() => onDetailClick(row.urn)}
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
