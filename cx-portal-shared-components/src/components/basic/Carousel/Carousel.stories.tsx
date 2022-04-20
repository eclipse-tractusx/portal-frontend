import { ComponentStory } from '@storybook/react'
import { Carousel as Component } from '.'
import { Box } from '@mui/material'
import uniqueId from 'lodash/uniqueId'

export default {
  title: 'Carousel',
  component: Component,
  argTypes: {
    children: {}
  }
}

const itemsArray = ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
      { itemsArray.map((item: string) =>{
          return (
            <Box sx={{padding: '28px'}} key={uniqueId('carousel-item')}>
              {item}
            </Box>
          )
        })
      }
  </Component>
)

export const Carousel = Template.bind({})
Carousel.args = {
  title: 'Carousel Title',
  dots: true,
  infinite: true,
  slidesToShow: 3,
  itemWidth: 256,
  itemHeight: 240,
  border: true,
}
