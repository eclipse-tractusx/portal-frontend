import ReactDropzoneBasic from 'react-dropzone'
import { Box, useTheme } from '@mui/material'
import { Typography } from '../Typography'
import { CloudUploadIcon } from '../CustomIcons/CloudUploadIcon'
import { useState } from 'react'

interface DropzoneProps {
  fileTypes: string
  title: string
  subTitle: string
  maxFilesCount: number
  getUploadParams: any
  onSubmit?: any
  onChangeStatus: any
  statusText: any
  errorStatus: any
}

export const Dropzone = ({
  title,
  subTitle,
  fileTypes,
  maxFilesCount,
  getUploadParams,
  onSubmit,
  onChangeStatus,
  statusText,
  errorStatus,
}: DropzoneProps) => {
  const { spacing } = useTheme()
  const theme = useTheme()
  const { icon01 } = theme.palette.icon

  const [fileNames, setFileNames] = useState([])
  const handleDrop = (acceptedFiles: any) =>
    setFileNames(acceptedFiles.map((file: any) => file.name))

  return (
    <Box className="basic">
      <div>
        <strong>Files:</strong>
        <ul>
          {fileNames.map((fileName: string) => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>

      <ReactDropzoneBasic
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          const additionalClass = isDragAccept
            ? 'active'
            : isDragActive
            ? 'accept'
            : isDragReject
            ? 'reject'
            : ''

          return (
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
                '&.active': {
                  backgroundColor: 'background.background02',
                },
                '&.accept': {
                  // backgroundColor: 'background.background02',
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
          )
        }}
      </ReactDropzoneBasic>
    </Box>
  )
}
