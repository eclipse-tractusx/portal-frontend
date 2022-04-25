import React from 'react'
import { IPreviewProps } from '../DropzoneTypes'
import { Box } from '@mui/material'
import { Typography } from '../../Typography'
import { FileIcon } from '../../CustomIcons/FileIcon'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
class Preview extends React.PureComponent<IPreviewProps> {
  render() {
    const {
      fileWithMeta: { cancel, remove, restart },
      meta,
      errorStatus,
      statusText,
    } = this.props

    const newStatusValue = statusText[meta.status] ?? meta.status

    return (
      <Box
        sx={{
          display: 'flex',
          margin: '32px 0',
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
        key={meta.id}
      >
        <FileIcon fillColor={'#939393'} size={80} />

        <Box sx={{ width: '100%', margin: '8px 32px' }}>
          <Typography
            variant="caption2"
            sx={{ display: 'block', color: 'common.black' }}
          >
            {meta.name}
          </Typography>
          <Typography
            variant="helper"
            sx={{ display: 'block', '&.error': { color: 'danger.danger' } }}
            className={errorStatus.includes(meta.status) ? 'error' : ''}
          >
            {newStatusValue}
          </Typography>
          <progress
            max={100}
            value={
              meta.status === 'done' || meta.status === 'headers_received'
                ? 100
                : meta.percent
            }
            className={errorStatus.includes(meta.status) ? 'error' : ''}
          />
        </Box>

        {meta.status === 'uploading' && (
          <Box onClick={cancel}>
            <RestartAltOutlinedIcon
              sx={{ color: '#939393' }}
              fontSize="small"
            />
          </Box>
        )}
        {meta.status !== 'preparing' &&
          meta.status !== 'getting_upload_params' &&
          meta.status !== 'uploading' && (
            <Box onClick={remove}>
              <DeleteOutlineIcon sx={{ color: '#939393' }} fontSize="small" />
            </Box>
          )}
        {errorStatus.includes(meta.status) && (
          <Box onClick={restart}>
            <RestartAltOutlinedIcon
              sx={{ color: '#939393' }}
              fontSize="small"
            />
          </Box>
        )}
      </Box>
    )
  }
}
export default Preview
