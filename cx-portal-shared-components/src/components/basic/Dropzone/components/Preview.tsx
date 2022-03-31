import { Box, useTheme } from '@mui/material'
import { FileIcon } from '../../CustomIcons/FileIcon'
import { Typography } from '../../Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { IPreviewProps, StatusValue } from 'react-dropzone-uploader'

type statusText = {
  [k in StatusValue]: string
}

export interface previewProps {
  errorStatus: String[]
  statusText: Partial<statusText>
}
export interface allPreviewProps extends IPreviewProps, previewProps {}

export const Preview = ({
  meta,
  statusText,
  fileWithMeta,
  canCancel,
  canRemove,
  canRestart,
  errorStatus,
}: allPreviewProps) => {
  const { name, percent, status } = meta
  const { cancel, remove, restart } = fileWithMeta
  const { spacing, palette } = useTheme()
  const { icon01 } = palette.icon
  const newStatusValue = statusText[status] ?? status

  return (
    <Box
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
          {name}
        </Typography>
        <Typography
          className={errorStatus.includes(status) ? 'error' : ''}
          variant="helper"
          sx={{ display: 'block', '&.error': { color: 'danger.danger' } }}
        >
          {newStatusValue}
        </Typography>
        <progress
          max={100}
          value={
            status === 'done' || status === 'headers_received' ? 100 : percent
          }
          className={errorStatus.includes(status) ? 'error' : ''}
        />
      </Box>

      {status === 'uploading' && canCancel && (
        <Box onClick={cancel}>
          <RestartAltOutlinedIcon sx={{ color: icon01 }} fontSize="small" />
        </Box>
      )}
      {errorStatus.includes(status) && canRestart && (
        <Box onClick={restart}>
          <RestartAltOutlinedIcon sx={{ color: icon01 }} fontSize="small" />
        </Box>
      )}
      {status !== 'preparing' &&
        status !== 'getting_upload_params' &&
        status !== 'uploading' &&
        canRemove && (
          <Box onClick={remove}>
            <DeleteOutlineIcon sx={{ color: icon01 }} fontSize="small" />
          </Box>
        )}
    </Box>
  )
}
