import { ComponentStory } from '@storybook/react'
import { Carousel as Component } from '.'
import { theme } from '../../../theme'
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
    { itemsArray.map((item: string) => {
        return (
          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
              height: '220px',
              width: '200px',
              border: '1px',
              borderStyle: 'solid',
              borderColor: theme.palette.border.border01,
            }}
            key={uniqueId('carousel-item')}>
            {item}
          </div>
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
}
