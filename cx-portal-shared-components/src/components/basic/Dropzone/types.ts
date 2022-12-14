export type UploadFileStatus =
  | 'new'
  | 'rejected'
  | 'uploading'
  | 'upload_success'
  | 'upload_error'

export interface UploadFile {
  fileName: string
  fileSize: number
  status: UploadFileStatus
  progressPercent?: number
}

export interface DropZoneTranslations {
  dropzoneTitle: string | JSX.Element
  dropzoneSubTitle: string | JSX.Element
  placeholder: string | JSX.Element
  uploadProgess: string
  uploadSuccess: string | JSX.Element
  uploadError: string | JSX.Element
}
