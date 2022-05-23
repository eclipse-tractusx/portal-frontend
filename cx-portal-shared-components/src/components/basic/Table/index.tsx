import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'

export { StatusTag }

export interface TableProps extends DataGridProps {
  title: string
  rowsCount?: number
  toolbar?: ToolbarProps
}

export const Table = ({
  columns,
  rows,
  autoHeight = true,
  headerHeight = 76, // Default header height from base design
  rowHeight = 76, // Default row height from base design
  rowsCount = 0,
  title,
  toolbar,
  checkboxSelection,
  ...props
}: TableProps) => {
  console.log('xxx')
  console.log(rows)
  return (
    <DataGrid
      getRowId={(row) => row.id}
      components={{
        Toolbar: () => (
          <Toolbar title={title} {...toolbar} {...{ rowsCount }} />
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
      sx={{
        '.MuiDataGrid-columnHeaderCheckbox': {
          width: '64px !important',
          minWidth: '64px !important',
          maxWidth: '64px !important',
          paddingLeft: '10px !important',
          paddingRight: '10px !important',
          height: '76px !important',
        },
      }}
    />
  )
}
