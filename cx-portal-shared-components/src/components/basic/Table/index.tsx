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
  toolbar?: ToolbarProps
  columnHeadersBackgroundColor?: string
  toolbarVariant?: toolbarType
  searchPlaceholder?: string
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
  toolbar,
  checkboxSelection,
  columnHeadersBackgroundColor = '#E9E9E9',
  toolbarVariant = 'basic',
  searchPlaceholder,
  ...props
}: TableProps) => {
  const toolbarView = () => {
    switch (toolbarVariant) {
      case 'basic':
        return <Toolbar title={title} {...{ rowsCount, rowsCountMax }} />
      case 'premium':
        return (
          <Toolbar
            title={title}
            {...toolbar}
            {...{ rowsCount, rowsCountMax }}
          />
        )
      case 'ultimate':
        return (
          <UltimateToolbar
            title={title}
            {...toolbar}
            {...{ rowsCount, rowsCountMax }}
            placeholder={searchPlaceholder}
          />
        )
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
