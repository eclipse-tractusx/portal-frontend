export type StatusValue =
  | 'rejected_file_type'
  | 'rejected_max_files'
  | 'preparing'
  | 'error_file_size'
  | 'error_validation'
  | 'ready'
  | 'started'
  | 'getting_upload_params'
  | 'error_upload_params'
  | 'uploading'
  | 'exception_upload'
  | 'aborted'
  | 'restarted'
  | 'removed'
  | 'error_upload'
  | 'headers_received'
  | 'done'

export type Meta = {
  id: string
  status: StatusValue
  type: string // MIME type, example: `image/*`
  name: string
  uploadedDate: string // ISO string
  percent: number
  size: number // bytes
  lastModifiedDate: string // ISO string
  previewUrl?: string // from URL.createObjectURL
  duration?: number // seconds
  width?: number
  height?: number
  videoWidth?: number
  videoHeight?: number
  validationError?: any
}

export type FileWithMeta = {
  file: File
  meta: Meta
  cancel?: () => void
  restart?: () => void
  remove?: () => void
  xhr?: XMLHttpRequest
}

export const restart = () => {
  console.log('restart')
}

export const cancel = () => {
  console.log('cancel')
}
