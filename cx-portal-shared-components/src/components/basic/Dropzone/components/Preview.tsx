import { Box, useTheme } from '@mui/material'
import { FileIcon } from '../../CustomIcons/FileIcon'
import { Typography } from '../../Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { DropzoneProps } from '../'
import { Meta, restart, cancel } from '../DropzoneServices'
import uniqueId from 'lodash/uniqueId'
import { useState } from 'react'

export interface previewProps {
  errorStatus: String[]
  statusText: DropzoneProps['statusText']
  files?: any
  file?: any
  meta?: Meta
}

export const Preview = ({ files, statusText, errorStatus }: previewProps) => {
  //const { name, percent, status } = file?.meta
  const { spacing, palette } = useTheme()
  const { icon01 } = palette.icon
  const newStatusValue = 'text' // statusText[status] ?? status

  const [myFiles, setMyFiles] = useState([])

  const remove = (file: any) => {
    const newFiles = [...myFiles]
    files.splice(file, 1)
    setMyFiles(newFiles)
  }

  return files?.map((file: any) => (
    <Box
      key={uniqueId('file')}
      sx={{
        display: 'flex',
        margin: spacing(4, 0),
        progress: {
          width: ' 100%',
          height: '4px',
          backgroundColor: 'textField.backgroundHover',
          '&::-webkit-progress-bar': {
            borderRadius: '40px',
          },
          '&::-webkit-progress-value': {
            backgroundColor: 'support.success',
            borderRadius: '40px',
          },
          '&.error::-webkit-progress-value': {
            backgroundColor: 'danger.danger',
          },
        },
      }}
    >
      <FileIcon fillColor={icon01} size={80} />

      <Box sx={{ width: '100%', margin: spacing(1, 4) }}>
        <Typography
          variant="caption2"
          sx={{ display: 'block', color: 'common.black' }}
        >
          {file.name}
        </Typography>
        <Typography
          variant="helper"
          sx={{ display: 'block', '&.error': { color: 'danger.danger' } }}
        >
          {newStatusValue}
        </Typography>
      </Box>

      <DeleteOutlineIcon
        sx={{ color: icon01 }}
        fontSize="small"
        onClick={() => remove(file)}
      />
    </Box>
  ))
}
