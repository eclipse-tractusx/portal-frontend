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

import { DropPreview as Component } from './components/DropPreview'
import { UploadStatus } from './types'

export default {
  title: 'Dropzone',
  component: Component,
  args: {
    uploadFiles: [
      { name: 'Test123.pdf', size: 44345000, status: UploadStatus.NEW },
      {
        name: 'Document.pdf',
        size: 65402,
        status: UploadStatus.UPLOADING,
        progressPercent: 45,
      },
      {
        name: 'Das ist ein sehr langer Name von einer Datei - der Name ist wirklich äußerst, äußerst lang...!.pdf',
        size: 32003,
        status: UploadStatus.NEW,
      },
      {
        name: 'My pretty PDF.pdf',
        size: 54676543,
        status: UploadStatus.UPLOAD_SUCCESS,
      },
      {
        name: 'Nix wars.xls',
        size: 543545,
        status: UploadStatus.UPLOAD_ERROR,
      },
    ],
    translations: {
      placeholder: 'Lorem Ipsum: Wieviele sachen willst du hochladen',
      uploadProgess: 'Uploaded % of % files',
      uploadSuccess: 'Uploaded',
      uploadError: 'Not Uploaded',
    },
    placeholder: false,
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} uploadFiles={args.placeholder ? [] : args.uploadFiles} />
)

export const DropPreview = Template.bind({})
