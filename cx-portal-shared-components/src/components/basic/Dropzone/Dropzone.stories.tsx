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

import { Dropzone as Component } from '.'
import { Preview } from './components/Preview'

export default {
  title: 'Dropzone',
  component: Component,
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <div>
    <Component {...args} />
    <Preview
      translations={{
        placeholder: 'Lorem Ipsum: Wieviele sachen willst du hochladen',
        uploadProgess: 'Uploaded % of % files',
      }}
      uploadFiles={[
        { fileName: 'Test123.pdf', fileSize: 44345000, status: 'new' },
        {
          fileName: 'Document.pdf',
          fileSize: 65402,
          status: 'uploading',
          progressPercent: 45,
        },
        {
          fileName:
            'Das ist ein sehr langer Name von einer Datei - der Name ist wirklich äußerst, äußerst lang...!.pdf',
          fileSize: 32003,
          status: 'new',
        },
        {
          fileName: 'My pretty PDF.pdf',
          fileSize: 54676543,
          status: 'upload_success',
        },
        {
          fileName: 'Nix wars.xls',
          fileSize: 543545,
          status: 'upload_error',
        },
      ]}
      onDelete={() => {}}
    />
  </div>
)

export const Dropzone = Template.bind({})
Dropzone.args = {
  inputContentTitle: 'Drag & drop your files here',
  inputContentSubTitle: 'or %browse files% on your computer.',
  accept: 'image/*,audio/*,video/*',
  getUploadParams: () => ({ url: 'https://httpbin.org/post' }),
  statusText: {
    rejected_file_type: 'Rejected file type',
    rejected_max_files: 'Rejected max files',
    preparing: 'Preparing',
    error_file_size: 'Error file size',
    error_validation: 'Error validation',
    ready: 'Ready',
    started: 'Started',
    getting_upload_params: 'Getting upload_params',
    error_upload_params: 'Error_upload_params',
    uploading: 'Uploading',
    exception_upload: 'Exception_upload',
    aborted: 'Aborted',
    restarted: 'Restarted',
    removed: 'Removed',
    error_upload: 'Error_upload',
    headers_received: 'Headers_received',
    done: 'Done',
  },
  errorStatus: [
    'error_upload_params',
    'exception_upload',
    'error_upload',
    'aborted',
    'ready',
  ],
}
