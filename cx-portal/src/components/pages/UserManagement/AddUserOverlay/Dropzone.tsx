import ReactDropzone, {
  IFileWithMeta,
  StatusValue,
  IUploadParams,
} from 'react-dropzone-uploader'
import {
  DropzoneLayout,
  DropzoneInputContent,
  DropzonePreview,
} from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { Box } from '@mui/material'
export interface DropzoneProps {
  fileTypes: string
  title: string
  subTitle: string
  maxFilesCount: number
  errorStatus: string[]
  statusText: {
    rejected_file_type: string
    rejected_max_files: string
    preparing: string
    error_file_size: string
    error_validation: string
    ready: string
    started: string
    getting_upload_params: string
    error_upload_params: string
    uploading: string
    exception_upload: string
    aborted: string
    restarted: string
    removed: string
    error_upload: string
    headers_received: string
    done: string
  }
  getUploadParams?(file: IFileWithMeta): IUploadParams | Promise<IUploadParams>
  onChangeStatus?(
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ): { meta: { [name: string]: any } } | void
}

export const Dropzone = ({
  title,
  subTitle,
  fileTypes,
  maxFilesCount,
  getUploadParams,
  onChangeStatus,
  statusText,
  errorStatus,
}: DropzoneProps) => {
  return (
    <Box
      sx={{
        '.dzu-dropzone': {
          backgroundColor: 'background.background01',
          borderRadius: '40px',
          border: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='%23B6B6B6FF' stroke-width='2' stroke-dasharray='16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
          padding: '48px 0',
          textAlign: 'center',
        },
        '.dzu-inputLabelWithFiles': {
          margin: 'auto',
          backgroundColor: 'transparent',
        },
      }}
    >
      <ReactDropzone
        LayoutComponent={DropzoneLayout}
        PreviewComponent={(props) => (
          <DropzonePreview
            {...props}
            statusText={statusText}
            errorStatus={errorStatus}
          />
        )}
        maxFiles={maxFilesCount}
        accept={fileTypes}
        getUploadParams={getUploadParams}
        onChangeStatus={onChangeStatus}
        inputContent={
          <DropzoneInputContent
            key={uniqueId('inputContent')}
            title={title}
            subTitle={subTitle}
          />
        }
        inputWithFilesContent={
          <DropzoneInputContent
            key={uniqueId('inputWithFilesContent')}
            title={title}
            subTitle={subTitle}
          />
        }
      />
    </Box>
  )
}
