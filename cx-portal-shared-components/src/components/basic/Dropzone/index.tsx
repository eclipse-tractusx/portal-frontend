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

import React from 'react'
import Layout from './components/Layout'
import Preview from './components/Preview'
import Input from './components/Input'

import {
  formatBytes,
  formatDuration,
  accepts,
  resolveValue,
  mergeStyles,
  defaultClassNames,
  getFilesFromEvent as defaultGetFilesFromEvent,
} from './utils'

import {
  IDropzoneProps,
  IExtra,
  IExtraLayout,
  IFileWithMeta,
  IInputProps,
  IUploadParams,
} from './DropzoneTypes'

class Dropzone extends React.Component<
  IDropzoneProps,
  { active: boolean; dragged: (File | DataTransferItem)[] }
> {
  static defaultProps: IDropzoneProps
  protected files: IFileWithMeta[]
  protected mounted: boolean
  protected dropzone: React.RefObject<HTMLDivElement>
  protected dragTimeoutId?: number

  constructor(props: IDropzoneProps) {
    super(props)
    this.state = {
      active: false,
      dragged: [],
    }
    this.files = []
    this.mounted = true
    this.dropzone = React.createRef()
  }

  componentDidMount() {
    if (this.props.initialFiles) this.handleFiles(this.props.initialFiles)
  }

  componentDidUpdate(prevProps: IDropzoneProps) {
    const { initialFiles } = this.props
    if (prevProps.initialFiles !== initialFiles && initialFiles)
      this.handleFiles(initialFiles)
  }

  componentWillUnmount() {
    this.mounted = false
    for (const fileWithMeta of this.files) this.handleCancel(fileWithMeta)
  }

  forceUpdate = () => {
    if (this.mounted) super.forceUpdate()
  }

  getFilesFromEvent = () => {
    return this.props.getFilesFromEvent || defaultGetFilesFromEvent
  }

  getDataTransferItemsFromEvent = () => {
    return this.props.getDataTransferItemsFromEvent || defaultGetFilesFromEvent
  }

  handleDragEnter = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const dragged = (await this.getDataTransferItemsFromEvent()(
      e
    )) as DataTransferItem[]
    this.setState({ active: true, dragged })
  }

  handleDragOver = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    clearTimeout(this.dragTimeoutId)
    const dragged = await this.getDataTransferItemsFromEvent()(e)
    this.setState({ active: true, dragged })
  }

  handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragTimeoutId = window.setTimeout(
      () => this.setState({ active: false, dragged: [] }),
      150
    )
  }

  handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ active: false, dragged: [] })
    const files = (await this.getFilesFromEvent()(e)) as File[]
    this.handleFiles(files)
  }

  handleDropDisabled = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ active: false, dragged: [] })
  }

  handleChangeStatus = (fileWithMeta: IFileWithMeta) => {
    if (!this.props.onChangeStatus) return
    const { meta = {} } =
      this.props.onChangeStatus(
        fileWithMeta,
        fileWithMeta.meta.status,
        this.files
      ) || {}
    if (meta) {
      delete meta.status
      fileWithMeta.meta = { ...fileWithMeta.meta, ...meta }
      this.forceUpdate()
    }
  }

  handleCancel = (fileWithMeta: IFileWithMeta) => {
    if (fileWithMeta.meta.status !== 'uploading') return
    fileWithMeta.meta.status = 'aborted'
    if (fileWithMeta.xhr) fileWithMeta.xhr.abort()
    this.handleChangeStatus(fileWithMeta)
    this.forceUpdate()
  }

  handleRemove = (fileWithMeta: IFileWithMeta) => {
    const index = this.files.findIndex((f) => f === fileWithMeta)
    if (index !== -1) {
      URL.revokeObjectURL(fileWithMeta.meta.previewUrl || '')
      fileWithMeta.meta.status = 'removed'
      this.handleChangeStatus(fileWithMeta)
      this.files.splice(index, 1)
      this.forceUpdate()
    }
  }

  handleRestart = (fileWithMeta: IFileWithMeta) => {
    if (!this.props.getUploadParams) return

    if (fileWithMeta.meta.status === 'ready')
      fileWithMeta.meta.status = 'started'
    else fileWithMeta.meta.status = 'restarted'
    this.handleChangeStatus(fileWithMeta)

    fileWithMeta.meta.status = 'getting_upload_params'
    fileWithMeta.meta.percent = 0
    this.handleChangeStatus(fileWithMeta)
    this.forceUpdate()
    this.uploadFile(fileWithMeta)
  }

  // expects an array of File objects
  handleFiles = (files: File[]) => {
    files.forEach((f, i) => this.handleFile(f, `${new Date().getTime()}-${i}`))
    const { current } = this.dropzone
    if (current)
      setTimeout(
        () => current.scroll({ top: current.scrollHeight, behavior: 'smooth' }),
        150
      )
  }

  handleFile = async (file: File, id: string) => {
    const { name, size, type, lastModified } = file
    const {
      minSizeBytes,
      maxSizeBytes,
      maxFiles,
      accept,
      getUploadParams,
      autoUpload,
      validate,
    } = this.props

    const uploadedDate = new Date().toISOString()
    const lastModifiedDate =
      lastModified && new Date(lastModified).toISOString()
    const fileWithMeta = {
      file,
      meta: {
        name,
        size,
        type,
        lastModifiedDate,
        uploadedDate,
        percent: 0,
        id,
      },
    } as IFileWithMeta

    if (file.type !== 'application/x-moz-file' && !accepts(file, accept)) {
      fileWithMeta.meta.status = 'rejected_file_type'
      this.handleChangeStatus(fileWithMeta)
      return
    }
    if (this.files.length >= maxFiles) {
      fileWithMeta.meta.status = 'rejected_max_files'
      this.handleChangeStatus(fileWithMeta)
      return
    }

    fileWithMeta.cancel = () => this.handleCancel(fileWithMeta)
    fileWithMeta.remove = () => this.handleRemove(fileWithMeta)
    fileWithMeta.restart = () => this.handleRestart(fileWithMeta)

    fileWithMeta.meta.status = 'preparing'
    this.files.push(fileWithMeta)
    this.handleChangeStatus(fileWithMeta)
    this.forceUpdate()

    if (size < minSizeBytes || size > maxSizeBytes) {
      fileWithMeta.meta.status = 'error_file_size'
      this.handleChangeStatus(fileWithMeta)
      this.forceUpdate()
      return
    }

    if (validate) {
      const error = validate(fileWithMeta)
      if (error) {
        fileWithMeta.meta.status = 'error_validation'
        fileWithMeta.meta.validationError = error
        this.handleChangeStatus(fileWithMeta)
        this.forceUpdate()
        return
      }
    }

    if (getUploadParams) {
      if (autoUpload) {
        this.uploadFile(fileWithMeta)
        fileWithMeta.meta.status = 'getting_upload_params'
      } else {
        fileWithMeta.meta.status = 'ready'
      }
    } else {
      fileWithMeta.meta.status = 'done'
    }
    this.handleChangeStatus(fileWithMeta)
    this.forceUpdate()
  }

  uploadFile = async (fileWithMeta: IFileWithMeta) => {
    const { getUploadParams } = this.props
    if (!getUploadParams) return
    let params: IUploadParams | null = null
    try {
      params = await getUploadParams(fileWithMeta)
    } catch (e) {
      console.error('Error Upload Params', e)
    }
    if (params === null) return
    const {
      url,
      method = 'POST',
      body,
      fields = {},
      headers = {},
      meta: extraMeta = {},
    } = params
    delete extraMeta.status

    if (!url) {
      fileWithMeta.meta.status = 'error_upload_params'
      this.handleChangeStatus(fileWithMeta)
      this.forceUpdate()
      return
    }

    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    xhr.open(method, url, true)

    for (const field of Object.keys(fields))
      formData.append(field, fields[field])
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    for (const header of Object.keys(headers))
      xhr.setRequestHeader(header, headers[header])
    fileWithMeta.meta = { ...fileWithMeta.meta, ...extraMeta }

    // update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      fileWithMeta.meta.percent = (e.loaded * 100.0) / e.total || 100
      this.forceUpdate()
    })

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 2 && xhr.readyState !== 4) return

      if (xhr.status === 0 && fileWithMeta.meta.status !== 'aborted') {
        fileWithMeta.meta.status = 'exception_upload'
        this.handleChangeStatus(fileWithMeta)
        this.forceUpdate()
      }

      if (xhr.status > 0 && xhr.status < 400) {
        fileWithMeta.meta.percent = 100
        if (xhr.readyState === 2) fileWithMeta.meta.status = 'headers_received'
        if (xhr.readyState === 4) fileWithMeta.meta.status = 'done'
        this.handleChangeStatus(fileWithMeta)
        this.forceUpdate()
      }

      if (xhr.status >= 400 && fileWithMeta.meta.status !== 'error_upload') {
        fileWithMeta.meta.status = 'error_upload'
        this.handleChangeStatus(fileWithMeta)
        this.forceUpdate()
      }
    })

    formData.append('file', fileWithMeta.file)
    if (this.props.timeout) xhr.timeout = this.props.timeout
    xhr.send(body || formData)
    fileWithMeta.xhr = xhr
    fileWithMeta.meta.status = 'uploading'
    this.handleChangeStatus(fileWithMeta)
    this.forceUpdate()
  }

  render() {
    const {
      accept,
      multiple,
      maxFiles,
      minSizeBytes,
      maxSizeBytes,
      getUploadParams,
      disabled,
      classNames,
      styles,
      addClassNames,
      PreviewComponent,
      inputContentSubTitle,
      inputContentTitle,
      errorStatus,
      statusText,
    } = this.props

    const { active, dragged } = this.state

    const reject = dragged.some(
      (file) =>
        file.type !== 'application/x-moz-file' && !accepts(file as File, accept)
    )
    const extra = {
      active,
      reject,
      dragged,
      accept,
      multiple,
      minSizeBytes,
      maxSizeBytes,
      maxFiles,
    } as IExtra
    const files = [...this.files]
    const dropzoneDisabled = resolveValue(disabled, files, extra)

    const {
      classNames: {
        dropzone: dropzoneClassName,
        dropzoneActive: dropzoneActiveClassName,
        dropzoneReject: dropzoneRejectClassName,
        dropzoneDisabled: dropzoneDisabledClassName,
        input: inputClassName,
      },
      styles: {
        dropzone: dropzoneStyle,
        dropzoneActive: dropzoneActiveStyle,
        dropzoneReject: dropzoneRejectStyle,
        dropzoneDisabled: dropzoneDisabledStyle,
        input: inputStyle,
      },
    } = mergeStyles(classNames, styles, addClassNames, files, extra)

    let previews = null

    if (PreviewComponent !== null) {
      previews = files.map((f) => {
        return (
          <Preview
            key={f.meta.id}
            fileWithMeta={f}
            meta={f.meta}
            isUpload={Boolean(getUploadParams)}
            files={files}
            errorStatus={errorStatus}
            extra={extra}
            statusText={statusText}
          />
        )
      })
    }

    const input = (
      <Input
        inputClassName={inputClassName}
        inputContentTitle={inputContentTitle}
        inputContentSubTitle={inputContentSubTitle}
        multiple={multiple}
        disabled={dropzoneDisabled}
        accept={accept}
        style={inputStyle as React.CSSProperties}
        getFilesFromEvent={
          this.getFilesFromEvent() as IInputProps['getFilesFromEvent']
        }
        onFiles={this.handleFiles}
        files={files}
        extra={extra}
      />
    )

    let className = dropzoneClassName
    let style = dropzoneStyle

    if (dropzoneDisabled) {
      className = `${className} ${dropzoneDisabledClassName}`
      style = { ...(style || {}), ...(dropzoneDisabledStyle || {}) }
    } else if (reject) {
      className = `${className} ${dropzoneRejectClassName}`
      style = { ...(style || {}), ...(dropzoneRejectStyle || {}) }
    } else if (active) {
      className = `${className} ${dropzoneActiveClassName}`
      style = { ...(style || {}), ...(dropzoneActiveStyle || {}) }
    }

    return (
      <Layout
        input={input}
        previews={previews}
        dropzoneProps={{
          ref: this.dropzone,
          className,
          style: style as React.CSSProperties,
          onDragEnter: this.handleDragEnter,
          onDragOver: this.handleDragOver,
          onDragLeave: this.handleDragLeave,
          onDrop: dropzoneDisabled ? this.handleDropDisabled : this.handleDrop,
        }}
        files={files}
        extra={
          {
            ...extra,
            onFiles: this.handleFiles,
            onCancelFile: this.handleCancel,
            onRemoveFile: this.handleRemove,
            onRestartFile: this.handleRestart,
          } as IExtraLayout
        }
      />
    )
  }
}

Dropzone.defaultProps = {
  accept: '*',
  multiple: true,
  minSizeBytes: 0,
  maxSizeBytes: Number.MAX_SAFE_INTEGER,
  maxFiles: Number.MAX_SAFE_INTEGER,
  autoUpload: true,
  disabled: false,
  classNames: {},
  styles: {},
  addClassNames: {},
  inputContentTitle: 'Drag & drop your files here',
  inputContentSubTitle: 'or browse files on your computer.',
  errorStatus: [
    'error_upload_params',
    'exception_upload',
    'error_upload',
    'aborted',
    'ready',
  ],
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
}

export {
  Dropzone,
  formatBytes,
  formatDuration,
  accepts,
  defaultClassNames,
  defaultGetFilesFromEvent as getFilesFromEvent,
}
