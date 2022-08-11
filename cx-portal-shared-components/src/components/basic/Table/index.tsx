import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'

export { StatusTag }

export interface TableProps extends DataGridProps {
  title: string
  rowsCount?: number
  rowsCountMax?: number
  toolbar?: ToolbarProps
}

export const Table = ({
  columns,
  rows,
  autoHeight = true,
  headerHeight = 57, // Default header height from base design
  rowHeight = 57, // Default row height from base design
  rowsCount = 0,
  rowsCountMax,
  title,
  toolbar,
  checkboxSelection,
  ...props
}: TableProps) => (
  <DataGrid
    getRowId={(row) => row.id}
    components={{
      Toolbar: () => (
        <Toolbar title={title} {...toolbar} {...{ rowsCount, rowsCountMax }} />
      ),
    }}
    {...{
      rows,
      columns,
      autoHeight,
      headerHeight,
      rowHeight,
      checkboxSelection,
    }}
    {...props}
  />
)
