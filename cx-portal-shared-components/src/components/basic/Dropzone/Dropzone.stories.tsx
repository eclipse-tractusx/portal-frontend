/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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
  <Component {...args} />
)

export const Dropzone = Template.bind({})
Dropzone.args = {
  inputContentTitle: 'Drag & drop your files here',
  inputContentSubTitle: 'or browse files on your computer.',
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
