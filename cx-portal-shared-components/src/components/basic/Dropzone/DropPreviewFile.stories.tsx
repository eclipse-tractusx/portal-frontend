/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { DropPreviewFile as Component } from './components/DropPreviewFile'

export default {
  title: 'Dropzone',
  component: Component,
  args: {
    fileName: 'Document.pdf',
    fileSize: 65402,
    status: 'new',
    progressPercent: 45,
    translations: {
      placeholder: 'Lorem Ipsum: Wieviele sachen willst du hochladen',
      uploadProgess: 'Uploaded % of % files',
      uploadSuccess: 'Uploaded',
      uploadError: 'Not Uploaded',
    },
    placeholder: false,
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['new', 'uploading', 'upload_success', 'upload_error'],
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => {
  const { fileName, fileSize, status, progressPercent, ...props } = args
  return (
    <Component
      {...props}
      uploadFile={{ fileName, fileSize, status, progressPercent }}
    />
  )
}

export const DropPreviewFile = Template.bind({})
