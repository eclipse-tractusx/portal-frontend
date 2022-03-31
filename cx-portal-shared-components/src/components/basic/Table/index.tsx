import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'

export { StatusTag }

export interface TableProps extends DataGridProps {
  title: string
  numberOfColumns?: number
  toolbar?: ToolbarProps
}

export const Table = ({
  columns,
  rows,
  autoHeight = true,
  headerHeight = 76, // Default header height from base design
  rowHeight = 76, // Default row height from base design
  title,
  numberOfColumns,
  toolbar,
  ...props
}: TableProps) => {
  return (
    <DataGrid
      components={{
        Toolbar: () => (
          <Toolbar
            title={title}
            numberOfColumns={numberOfColumns}
            {...toolbar}
          />
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
