import { DataGrid, DataGridProps } from '@mui/x-data-grid'

export const Table = ({
  columns,
  rows,
  autoHeight = true,
  headerHeight = 76, // Default header height from base design
  rowHeight = 76, // Default row height from base design
  ...props
}: DataGridProps) => {
  return (
    <DataGrid
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
