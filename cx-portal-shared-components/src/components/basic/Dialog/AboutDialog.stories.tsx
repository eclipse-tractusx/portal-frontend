import { ComponentStory } from '@storybook/react'

import { AboutDialog as Component } from './AboutDialog'

export default {
  title: 'Modal',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const AboutDialogs = Template.bind({})
AboutDialogs.args = {
  title: 'Your product name',
  subtitles: [
    'License: Apache-2.0',
    'Copyright: https://www.eclipse.org/legal/copyright.php',
    'Licence Path: https://www.eclipse.org/legal',
    'Commit ID: 12376123618263187',
  ],
  links: [
    {
      text: 'NOTICE: eclipse-tractusx',
      url: 'https://github.com/eclipse-tractusx/portal-frontend',
    },
    {
      text: 'Source URL: eclipse-tractusx',
      url: 'https://github.com/eclipse-tractusx/portal-frontend',
    },
  ],
  footerText: 'Close',
}
