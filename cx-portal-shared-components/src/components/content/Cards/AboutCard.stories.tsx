import { ComponentStory } from '@storybook/react'

import { AboutCard as Component } from './AboutCard'

export default {
  title: 'Cards',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const AboutCards = Template.bind({})
AboutCards.args = {
  name: 'Example product',
  repositoryPath: 'https://github.com/eclipse-tractusx/example-product',
  license: 'License: Apache-2.0',
  licensePath:
    'https://github.com/eclipse-tractusx/example-product/blob/v1.0.0-example/LICENSE',
  noticePath:
    'https://github.com/eclipse-tractusx/example-product/blob/v1.0.0-example/NOTICE.md',
  sourcePath:
    'https://github.com/eclipse-tractusx/example-product/tree/v1.0.0-example',
  commitId: '67e82n0637d585239c72eda374a17b8cb24046ec',
}
