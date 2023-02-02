/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { Dialog as Component } from '.'
import { Button } from '../Button'
import { DialogActions } from './DialogActions'
import { DialogContent } from './DialogContent'
import { DialogHeader } from './DialogHeader'

export default {
  title: 'Modal',
  component: Component,
  argTypes: {
    maxWidth: {
      control: 'inline-radio',
      options: [undefined, 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    open: true,
    maxWidth: undefined,
    fullWidth: false,
    title: 'Title',
    intro:
      'Optional intro. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    content: 'Content goes here.',
    helperText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
}

const DialogTemplate: ComponentStory<typeof Component> = (args: any) => {
  const { title, intro, content, helperText, ...componentArgs } = args

  return (
    <Component {...componentArgs}>
      <DialogHeader title={title} intro={intro} />
      <DialogContent>{content}</DialogContent>
      <DialogActions helperText={helperText}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </DialogActions>
    </Component>
  )
}

export const Dialog = DialogTemplate.bind({})
