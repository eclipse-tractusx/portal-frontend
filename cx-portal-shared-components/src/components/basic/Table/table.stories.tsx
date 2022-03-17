import { ComponentStory } from '@storybook/react'

import { Table as Component } from '.'
import {
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import Link from '@mui/material/Link'
import RoleChip from './components/RoleChip'

const rows: GridRowsProp = [
  {
    id: Math.floor(Math.random() * 100),
    name: 'Fatih Ayyildiz',
    company: 'Mercedes-Benz AG',
    email: 'fatih_hikmet.ayyildiz@mercedes-benz.com',
    note: 'Lorep ipsum Dolores',
    role: 'Admin',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Julia Jeroch',
    company: 'BMW',
    email: 'julia.jeroch@bmw.de',
    note: 'Lorep ipsum Dolores',
    role: 'Admin',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Dutton John',
    company: 'SAP',
    email: 'john.dutton@sap.de',
    note: 'Lorep ipsum Dolores',
    role: 'Editor',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Mueller Rudolf',
    company: 'Bosch',
    email: 'mueller.rudi@bosch.de',
    note: 'Lorep ipsum Dolores mia dela culpa',
    role: 'Admin',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Dampf Hans',
    company: 'Henkel',
    email: 'dampf.hans@henkel.de',
    note: 'Lorep ipsum Dolores mia dela culpa',
    role: 'Editor',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Braun Heinrich',
    company: 'BMW',
    email: 'heinrich.braun@bmw.de',
    note: 'Lorep ipsum Dolores mi gela dio',
    role: 'Manager',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Mueller Rudolf',
    company: 'Bosch',
    email: 'mueller.rudi@bosch.de',
    note: 'Lorep ipsum Dolores mia dela culpa',
    role: 'Admin',
  },
  {
    id: Math.floor(Math.random() * 100),
    name: 'Schlarb Hans',
    company: 'Catena-X',
    email: 'hans.schlarb@catena-x.com',
    note: 'Lorep ipsum Dolores megari',
    role: 'User',
  },
]

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
    flex: 5,
  },
  { field: 'note', headerName: 'Note', flex: 5 },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    renderCell: (params: GridRenderCellParams<string>) => (
      <RoleChip role={params.value} />
    ),
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

export const Table = Template.bind({})
Table.args = {
  autoHeight: true,
  headerHeight: 76,
  rowHeight: 76,
  hideFooter: true,
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableColumnSelector: true,
  disableDensitySelector: true,
  disableSelectionOnClick: true,
  loading: false,
  rows,
  columns,
}
