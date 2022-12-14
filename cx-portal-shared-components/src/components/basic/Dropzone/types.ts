export type UploadFileStatus =
  | 'new'
  | 'rejected'
  | 'uploading'
  | 'upload_success'
  | 'upload_error'

export type UploadFile = {
  fileName: string
  fileSize: number
  status: UploadFileStatus
  progressPercent?: number
}

export type DropZoneDropAreaTranslations = {
  title: string | JSX.Element
  subTitle: string | JSX.Element
}

export type DropZonePreviewTranslations = {
  placeholder: string | JSX.Element
  uploadProgess: string
  uploadSuccess: string | JSX.Element
  uploadError: string | JSX.Element
}

export type DropZoneTranslations = DropZonePreviewTranslations &
  DropZoneDropAreaTranslations
