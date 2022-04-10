import { ComponentStory } from '@storybook/react'

import { DropzoneBasic as Component } from '.'

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
    rejected_file_type: 'new rejected_file_type',
    rejected_max_files: 'new rejected_max_files',
    preparing: 'new preparing',
    error_file_size: 'new error_file_size',
    error_validation: 'new error_validation',
    ready: 'new ready',
    started: 'new started',
    getting_upload_params: 'new getting_upload_params',
    error_upload_params: 'new error_upload_params',
    uploading: 'new uploading',
    exception_upload: 'new exception_upload',
    aborted: 'new aborted',
    restarted: 'new restarted',
    removed: 'new removed',
    error_upload: 'new error_upload',
    headers_received: 'new headers_received',
    done: 'new done',
  },
  errorStatus: [
    'error_upload_params',
    'exception_upload',
    'error_upload',
    'aborted',
    'ready',
  ],
}
