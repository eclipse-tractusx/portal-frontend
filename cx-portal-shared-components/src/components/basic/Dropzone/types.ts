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
