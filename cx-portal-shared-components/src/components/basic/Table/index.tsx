/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useCallback } from 'react'
import { DataGrid, DataGridProps, GridRowId } from '@mui/x-data-grid'
import { Box, Stack } from '@mui/material'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'
import { UltimateToolbar } from './components/Toolbar/UltimateToolbar'
import { theme } from '../../../theme'
import { SearchAndFilterButtonToolbar } from './components/Toolbar/SearchAndFilterButtonToolbar'
import RefreshIcon from '@mui/icons-material/Refresh'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { Typography } from '../Typography'

export { StatusTag }
export type toolbarType = 'basic' | 'premium' | 'ultimate' | 'searchAndFilter'
export type SearchInputState = {
  open: boolean
  text: string
}

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
  searchInputData?: SearchInputState
  noRowsMsg?: string
  hasBorder?: boolean
  buttonLabel?: string
  onButtonClick?: React.MouseEventHandler
  onSelection?: (value: GridRowId[]) => void
  descriptionText?: string
  defaultFilter?: string
  filterViews?: any
  alignCell?: string
  error?: {
    status: number
  }
  reload?: () => void
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
  searchInputData,
  noRowsMsg,
  hasBorder = true,
  buttonLabel,
  onButtonClick,
  onSelection,
  descriptionText,
  defaultFilter,
  filterViews,
  alignCell = 'center',
  error,
  reload,
  ...props
}: TableProps) => {
  const toolbarProps = {
    rowsCount,
    rowsCountMax,
    onSearch,
    searchDebounce,
    searchInputData,
    searchPlaceholder,
    noRowsMsg,
    buttonLabel,
    onButtonClick,
    onSelection,
    searchExpr,
    descriptionText,
    defaultFilter,
    filterViews,
  }

  const flexColumn = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const flexRow = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: '20px',
  }

  const handleOnCellClick = useCallback(
    (selectedIds) => {
      const idsArr: Array<string> = []
      rows.map((row) => {
        return selectedIds.map(
          (selectedId: string) =>
            selectedId.indexOf(row.companyUserId) > -1 &&
            idsArr.push(row.companyUserId)
        )
      })
      onSelection && onSelection(idsArr)
    },
    [rows, onSelection]
  )

  const toolbarView = () => {
    switch (toolbarVariant) {
      case 'basic':
        return <Toolbar title={title} {...toolbarProps} />
      case 'premium':
        return <Toolbar title={title} {...toolbar} {...toolbarProps} />
      case 'ultimate':
        return <UltimateToolbar title={title} {...toolbarProps} {...toolbar} />
      case 'searchAndFilter':
        return <SearchAndFilterButtonToolbar {...toolbarProps} {...toolbar} />
    }
  }

  const Error400Overlay = () => (
    <Box
      sx={{
        ...flexRow,
      }}
    >
      <ReportProblemIcon
        sx={{ paddingRight: '20px', fontSize: 50 }}
        color="error"
      />
      <Box
        sx={{
          ...flexColumn,
          paddingTop: '20px',
        }}
      >
        <Typography variant="body2">
          Something went wrong. Please contact
        </Typography>
        <Typography variant="body2">your administrator</Typography>
      </Box>
    </Box>
  )

  const Error500Overlay = () => (
    <Box
      sx={{
        ...flexColumn,
        paddingTop: '10px',
      }}
    >
      <Typography
        sx={{
          paddingTop: '20px',
        }}
        variant="body2"
      >
        Load Failed. Reload
      </Typography>
      <div
        onClick={() => reload && reload()}
        style={{
          marginBottom: '20px',
          cursor: 'pointer',
        }}
      >
        <RefreshIcon sx={{ fontSize: 40 }} color="primary" />
      </div>
    </Box>
  )

  const NoRowsOverlay = () => {
    return (
      <Stack
        height="100%"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#fff', pointerEvents: 'auto' }}
      >
        {error && error.status === 500 && <Error500Overlay />}
        {error &&
          (error.status === 400 ||
            error.status === 404 ||
            error.status === 401) && <Error400Overlay />}
        {!error && (
          <Typography variant="body2">{noRowsMsg ?? 'No rows'}</Typography>
        )}
      </Stack>
    )
  }

  return (
    <Box
      sx={{
        '.MuiDataGrid-columnHeaders': {
          backgroundColor: columnHeadersBackgroundColor,
        },
        '.MuiDataGrid-root': {
          border: hasBorder
            ? `1px solid ${theme.palette.border.border01}`
            : 'none',
        },
      }}
    >
      <DataGrid
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-cell': {
            alignItems: alignCell,
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within':
            {
              outline: 'none',
            },
        }}
        getRowId={(row) => row.id}
        components={{
          Toolbar: () => toolbarView(),
          NoRowsOverlay,
        }}
        onSelectionModelChange={handleOnCellClick}
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
