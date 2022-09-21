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

import { ComponentStory } from '@storybook/react'

import { Table as Component } from '.'
import {
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import Link from '@mui/material/Link'
import TestRows from '../../../assets/data/TableRows.json'

const rows: GridRowsProp = TestRows

const columns: GridColDef[] = [
  { field: 'id', hide: true },
  {
    field: 'name',
    headerName: 'Name',
    description: 'Name of the user',
    flex: 2,
  },
  { field: 'company', headerName: 'Company', flex: 2 },
  {
    field: 'email',
    headerName: 'Email address',
    renderCell: (params: GridRenderCellParams<string>) => (
      <div>
        <Link href="#">{params.value}</Link>
      </div>
    ),
    flex: 4,
  },
  { field: 'note', headerName: 'Note', flex: 5 },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    renderCell: (params: GridRenderCellParams<string>) => <>{params.value}</>,
  },
]

export default {
  title: 'Table',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

const basicArgs = {
  autoHeight: true,
  headerHeight: 76,
  rowHeight: 76,
  hideFooter: true,
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableColumnSelector: true,
  disableDensitySelector: true,
  disableSelectionOnClick: true,
  checkboxSelection: true,
  loading: false,
  columnHeadersBackgroundColor: '#fff',
  searchPlaceholder: 'Search by username',
  rows,
  columns,
  hasBorder: true,
}

export const Table = Template.bind({})
Table.args = {
  ...basicArgs,
  title: 'Basic table',
  toolbarVariant: 'basic',
}

export const TableToolbar = Template.bind({})
TableToolbar.args = {
  ...basicArgs,
  title: 'Table with toolbar',
  toolbarVariant: 'premium',
  toolbar: {
    buttonLabel: 'Add user',
    onButtonClick: () => console.log('on button click'),
    onSearch: (value) => console.log(`search: "${value}"`),
    onFilter: (selectedFilter) => console.log('filter:', selectedFilter),
    filter: [
      {
        name: 'role',
        values: [
          { value: 'admin', label: 'Admin' },
          { value: 'editor', label: 'Editor' },
          { value: 'manager', label: 'Manager' },
        ],
      },
    ],
  },
}
