import { Box, Divider, Typography } from '@mui/material'
import { ComponentStory } from '@storybook/react'
import { CustomAccordion as Component } from '.'
import { Table } from '../StaticTable/StaticTable.stories'
import { CustomAccordionProps } from './Item'

export default {
  title: 'CustomAccordion',
  component: Component,
  argTypes: {
    children: {},
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

const item_1_open: CustomAccordionProps = {
  expanded: true,
  id: 'panel-1',
  title: 'First Item',
  children: <Typography>Content of the first item</Typography>,
}

const item_1_open_colored: CustomAccordionProps = {
  expanded: false,
  id: 'panel-1',
  title: 'First Item',
  color: 'background.background09',
  children: 
    <Box>
      <Typography variant="h4">Content of the first item</Typography>
      <Divider sx={{m: 2}} />
      <Typography mb={2}>You can add any complex content into the accordion item. For example a table:</Typography>
      <Table 
        data={{
          head: ['Header 1', 'Header 2', 'Header 3'], 
          body: [['data 1', 'data 2', 'data 3'], ['data 1', 'data 2', 'data 3'], ['data 1', 'data 2', 'data 3']]
        }}
        />
    </Box>,
}
const item_2_closed: CustomAccordionProps = {
  expanded: false,
  id: 'panel-2',
  title: 'Second Item',
  children: <Typography>Content of the second item</Typography>,
}
const item_3_closed: CustomAccordionProps = {
  expanded: false,
  id: 'panel-3',
  title: 'Third Item',
  children: <Typography>Content of the third item</Typography>,
}

export const BasicAccordion = Template.bind({})
BasicAccordion.args = {
  items: [item_1_open, item_2_closed, item_3_closed]
};

export const ColoredAccordion = Template.bind({})
ColoredAccordion.args = {
  items: [item_1_open_colored, item_2_closed, item_3_closed]
};
