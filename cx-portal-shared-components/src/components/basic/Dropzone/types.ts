export type UploadFileStatus =
  | 'new'
  | 'uploading'
  | 'upload_success'
  | 'upload_error'

export type UploadFile = {
  name: string
  size: number
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
