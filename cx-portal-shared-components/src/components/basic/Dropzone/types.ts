export enum UploadStatus {
  NEW = 'new',
  UPLOADING = 'uploading',
  UPLOAD_SUCCESS = 'upload_success',
  UPLOAD_ERROR = 'upload_error',
}

export type UploadFileStatus =
  | UploadStatus.NEW
  | UploadStatus.UPLOADING
  | UploadStatus.UPLOAD_SUCCESS
  | UploadStatus.UPLOAD_ERROR

export type UploadFile = {
  id?: string
  name: string
  size?: number
  status: UploadFileStatus
  progressPercent?: number
}

export type DropZoneDropAreaTranslations = {
  title: string | JSX.Element
  subTitle: string | JSX.Element
  errorTitle: string | JSX.Element
}

export type DropZonePreviewTranslations = {
  placeholder: string | JSX.Element
  uploadProgess: string
  uploadSuccess: string | JSX.Element
  uploadError: string | JSX.Element
}

export type deleteConfirmOverlayTranslation = {
  title: string
  content: string
  action_no: string
  action_yes: string
}
