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
