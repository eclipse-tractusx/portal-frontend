/********************************************************************************
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
  name: 'Example product name',
  repositoryPath: 'https://github.com/eclipse-tractusx/example-product',
  license: 'Example license',
  licensePath:
    'https://github.com/eclipse-tractusx/example-product/blob/v1.0.0-example/LICENSE',
  noticePath:
    'https://github.com/eclipse-tractusx/example-product/blob/v1.0.0-example/NOTICE.md',
  sourcePath:
    'https://github.com/eclipse-tractusx/example-product/tree/v1.0.0-example',
  commitId: '67e82n0637d585239c72eda374a17b8cb24046ec',
}
