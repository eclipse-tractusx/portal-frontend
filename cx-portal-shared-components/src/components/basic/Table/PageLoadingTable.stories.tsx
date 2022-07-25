import { ComponentStory } from '@storybook/react'

import { PageLoadingTable as Component } from './PageLoadingTable'
import {
  GridColDef,
} from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', flex: 2 },
  { field: 'value', flex: 5 },
]

export default {
  title: 'PageLoadingTable',
  component: Component,
  argTypes: {},
}

const SIZE = 12
const fetch = (page: number) => ({
  data: {
    meta: {
      totalElements: 115,
      totalPages: 10,
      page,
      contentSize: SIZE
    },
    content: [...Array(SIZE).keys()].map(n => ({id: page*SIZE+n, value: `value ${page*SIZE+n}`}))
  },
  isSuccess: true,
  isFetching: false,
})

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component<GridColDef> {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  columns,
  loadLabel: 'load more',
  fetch
}
