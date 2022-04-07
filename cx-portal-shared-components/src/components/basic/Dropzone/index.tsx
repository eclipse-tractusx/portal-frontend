import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { Box, useTheme } from '@mui/material'
import { Typography } from '../Typography'
import { CloudUploadIcon } from '../CustomIcons/CloudUploadIcon'
import React, { useState, useCallback } from 'react'
import { Preview } from './components/Preview'
import { StatusValue, FileWithMeta } from './DropzoneServices'

type statusText = {
  [k in StatusValue]: string
}
export interface DropzoneProps extends DropzoneOptions {
  fileTypes: string
  title: string
  subTitle: string
  file: FileWithMeta
  allFiles: FileWithMeta[]
  status: StatusValue
  statusText?: statusText
  errorStatus?: any
  getUploadParams?: any
  event: React.DragEvent<HTMLElement>
}

export const Dropzone = ({
  title,
  subTitle,
  fileTypes,
  statusText,
  errorStatus,
  getUploadParams,
}: DropzoneProps) => {
  const { spacing } = useTheme()
  const theme = useTheme()
  const { icon01 } = theme.palette.icon

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles, 'acceptedFiles')
  }, [])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: fileTypes,
    multiple: false,
    onDrop,
  })

  const additionalClass = isDragAccept
    ? 'accept'
    : isDragReject
    ? 'reject'
    : isDragActive
    ? 'active'
    : ''

  return (
    <Box>
      <Preview
        statusText={statusText}
        errorStatus={errorStatus}
        files={acceptedFiles}
      />

      {isDragReject &&
        fileRejections.map(({ file, errors }) => (
          <div key={file.name}>
            {errors.map((e) => (
              <Typography
                key={e.code}
                variant="body1"
                sx={{ color: 'danger.danger' }}
              >
                {e.message}
              </Typography>
            ))}
          </div>
        ))}
      <Box
        {...getRootProps({
          className: `dropzone ${additionalClass}`,
        })}
        sx={{
          backgroundColor: 'background.background01',
          borderRadius: '40px',
          border: 'none',
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='%23B6B6B6FF' stroke-width='2' stroke-dasharray='16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          padding: spacing(6, 0),
          textAlign: 'center',
          minHeight: 33,
          cursor: 'pointer',
          '&.active': {
            backgroundColor: 'background.background02',
          },
          '&.accept': {
            backgroundColor: 'background.background02',
          },
          '&.reject': {
            backgroundColor: 'background.background02',
          },
        }}
      >
        <input {...getInputProps()} />

        <CloudUploadIcon fillColor={icon01} size={64} />
        <Typography
          variant="h4"
          sx={{
            display: 'block',
            fontFamily: theme.typography.body1.fontFamily,
            marginTop: 4,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ display: 'block' }}>
          {subTitle}
        </Typography>
      </Box>
    </Box>
  )
}
