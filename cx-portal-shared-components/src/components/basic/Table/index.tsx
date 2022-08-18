import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'
import { UltimateToolbar } from './components/Toolbar/UltimateToolbar'

export { StatusTag }
export type toolbarType = 'basic' | 'premium' | 'ultimate'

export interface TableProps extends DataGridProps {
  title: string
  rowsCount?: number
  rowsCountMax?: number
  toolbarVariant?: toolbarType
  toolbar?: ToolbarProps
  columnHeadersBackgroundColor?: string
  onSearch?: (value: string) => void
  searchExpr?: string
  searchPlaceholder?: string
  searchDebounce?: number
}

export const Table = ({
  columns,
  rows,
  autoHeight = true,
  headerHeight = 57, // Default header height from base design
  rowHeight = 57, // Default row height from base design
  rowsCount = 0,
  rowsCountMax = 0,
  title,
  toolbarVariant = 'basic',
  toolbar,
  checkboxSelection,
  columnHeadersBackgroundColor = '#E9E9E9',
  onSearch,
  searchExpr,
  searchPlaceholder,
  searchDebounce,
  ...props
}: TableProps) => {
  const toolbarProps = {
    rowsCount,
    rowsCountMax,
    onSearch,
    searchDebounce,
    searchPlaceholder,
  }
  const toolbarView = () => {
    switch (toolbarVariant) {
      case 'basic':
        return <Toolbar title={title} {...toolbarProps} />
      case 'premium':
        return <Toolbar title={title} {...toolbar} {...toolbarProps} />
      case 'ultimate':
        return <UltimateToolbar title={title} {...toolbar} {...toolbarProps} />
    }
  }

  return (
    <Box
      sx={{
        '.MuiDataGrid-columnHeaders': {
          backgroundColor: columnHeadersBackgroundColor,
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.id}
        components={{
          Toolbar: () => toolbarView(),
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
    </Box>
  )
}
