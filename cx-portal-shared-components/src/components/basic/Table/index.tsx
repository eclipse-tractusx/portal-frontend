import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'

export { StatusTag }

export interface TableProps extends DataGridProps {
  title: string
  rowCount?: number
  toolbar?: ToolbarProps
}

export const Table = ({
  columns,
  rows,
  autoHeight = true,
  headerHeight = 76, // Default header height from base design
  rowHeight = 76, // Default row height from base design
  title,
  toolbar,
  ...props
}: TableProps) => {
  return (
    <DataGrid
      components={{
        Toolbar: () => (
          <Toolbar title={title} rowCount={rows?.length || 0} {...toolbar} />
        ),
      }}
      {...{
        rows,
        columns,
        autoHeight,
        headerHeight,
        rowHeight,
      }}
      {...props}
    />
  )
}
