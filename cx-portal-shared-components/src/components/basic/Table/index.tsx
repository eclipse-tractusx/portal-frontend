/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { StatusTag } from './components/StatusTag'
import { Toolbar, ToolbarProps } from './components/Toolbar'
import { UltimateToolbar } from './components/Toolbar/UltimateToolbar'
import { theme } from '../../../theme'

export { StatusTag }
export type toolbarType = 'basic' | 'premium' | 'ultimate'
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
  hasBorder?: boolean
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
  hasBorder = true,
  ...props
}: TableProps) => {
  const toolbarProps = {
    rowsCount,
    rowsCountMax,
    onSearch,
    searchDebounce,
    searchInputData,
    searchPlaceholder,
  }
  const toolbarView = () => {
    switch (toolbarVariant) {
      case 'basic':
        return <Toolbar title={title} {...toolbarProps} />
      case 'premium':
        return <Toolbar title={title} {...toolbar} {...toolbarProps} />
      case 'ultimate':
        return <UltimateToolbar title={title} {...toolbarProps} {...toolbar} />
    }
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
