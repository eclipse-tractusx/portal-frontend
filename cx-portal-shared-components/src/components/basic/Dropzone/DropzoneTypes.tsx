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

export type MethodValue =
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'

export interface IMeta {
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
  validationError?: any
}

export interface IFileWithMeta {
  file: File
  meta: IMeta
  cancel: () => void
  restart: () => void
  remove: () => void
  xhr?: XMLHttpRequest
}

export interface IExtra {
  active: boolean
  reject: boolean
  dragged: DataTransferItem[]
  accept: string
  multiple: boolean
  minSizeBytes: number
  maxSizeBytes: number
  maxFiles: number
}

export interface IUploadParams {
  url: string
  method?: MethodValue
  body?: string | FormData | ArrayBuffer | Blob | File | URLSearchParams
  fields?: { [name: string]: string | Blob }
  headers?: { [name: string]: string }
  meta?: { [name: string]: any }
}

export type CustomizationFunction<T> = (
  allFiles: IFileWithMeta[],
  extra: IExtra
) => T

export interface IStyleCustomization<T> {
  dropzone?: T | CustomizationFunction<T>
  dropzoneActive?: T | CustomizationFunction<T>
  dropzoneReject?: T | CustomizationFunction<T>
  dropzoneDisabled?: T | CustomizationFunction<T>
  input?: T | CustomizationFunction<T>
  inputLabel?: T | CustomizationFunction<T>
  inputLabelWithFiles?: T | CustomizationFunction<T>
  preview?: T | CustomizationFunction<T>
}

export interface IExtraLayout extends IExtra {
  onFiles(files: File[]): void
  onCancelFile(file: IFileWithMeta): void
  onRemoveFile(file: IFileWithMeta): void
  onRestartFile(file: IFileWithMeta): void
}

export interface ILayoutProps {
  files: IFileWithMeta[]
  extra: IExtraLayout
  input: React.ReactNode
  previews: React.ReactNode[] | null
  dropzoneProps: {
    ref: React.RefObject<HTMLDivElement>
    className: string
    style?: React.CSSProperties
    onDragEnter(event: React.DragEvent<HTMLElement>): void
    onDragOver(event: React.DragEvent<HTMLElement>): void
    onDragLeave(event: React.DragEvent<HTMLElement>): void
    onDrop(event: React.DragEvent<HTMLElement>): void
  }
}

interface ICommonProps {
  files: IFileWithMeta[]
  extra: IExtra
}

export interface IPreviewProps extends ICommonProps {
  meta: IMeta
  className?: string
  imageClassName?: string
  style?: React.CSSProperties
  imageStyle?: React.CSSProperties
  fileWithMeta: IFileWithMeta
  isUpload: boolean
  errorStatus: String[]
  statusText: Partial<statusText>
}

export interface IInputProps extends ICommonProps {
  inputClassName?: string
  labelClassName?: string
  labelWithFilesClassName?: string
  style?: React.CSSProperties
  labelStyle?: React.CSSProperties
  labelWithFilesStyle?: React.CSSProperties
  getFilesFromEvent: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<File[]>
  accept: string
  multiple: boolean
  disabled: boolean
  content?: React.ReactNode
  withFilesContent?: React.ReactNode
  onFiles: (files: File[]) => void
  inputContentSubTitle: string
  inputContentTitle: string
}

type ReactComponent<Props> = (
  props: Props
) => React.ReactNode | React.Component<Props>

type statusText = {
  [k in StatusValue]: string
}

export interface IDropzoneProps {
  onChangeStatus?(
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ): { meta: { [name: string]: any } } | void
  getUploadParams?(file: IFileWithMeta): IUploadParams | Promise<IUploadParams>

  getFilesFromEvent?: (
    event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
  ) => Promise<File[]> | File[]
  getDataTransferItemsFromEvent?: (
    event: React.DragEvent<HTMLElement>
  ) => Promise<DataTransferItem[]> | DataTransferItem[]

  accept: string
  multiple: boolean
  minSizeBytes: number
  maxSizeBytes: number
  maxFiles: number

  inputContentSubTitle: string
  inputContentTitle: string

  errorStatus: String[]
  statusText: Partial<statusText>

  validate?(file: IFileWithMeta): any // usually a string, but can be anything

  autoUpload: boolean
  timeout?: number

  initialFiles?: File[]

  /* component customization */
  disabled: boolean | CustomizationFunction<boolean>

  classNames: IStyleCustomization<string>
  styles: IStyleCustomization<React.CSSProperties>
  addClassNames: IStyleCustomization<string>

  /* component injection */
  PreviewComponent?: ReactComponent<IPreviewProps>
  InputComponent?: ReactComponent<IInputProps>
}
