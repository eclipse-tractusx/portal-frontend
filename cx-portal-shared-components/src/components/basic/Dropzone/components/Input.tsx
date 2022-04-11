import React from 'react'
import { IInputProps } from '../DropzoneTypes'
import { Box } from '@mui/material'
import { Typography } from '../../Typography'
import { CloudUploadIcon } from '../../CustomIcons/CloudUploadIcon'

class Input extends React.PureComponent<IInputProps> {
  render() {
    const {
      inputClassName,
      style,
      accept,
      inputContentTitle,
      inputContentSubTitle,
      multiple,
      disabled,
      getFilesFromEvent,
      onFiles,
    } = this.props

    return (
      <Box
        sx={{
          backgroundColor: 'background.background01',
          borderRadius: '40px',
          border: 'none',
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='%23B6B6B6FF' stroke-width='2' stroke-dasharray='16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          padding: '48px 0',
          textAlign: 'center',
          minHeight: 33,
        }}
      >
        <CloudUploadIcon fillColor={'#939393'} size={64} />
        <Typography
          variant="h4"
          sx={{
            display: 'block',
            fontFamily: 'LibreFranklin-Light',
            marginTop: '24px',
          }}
        >
          {inputContentTitle}
        </Typography>
        <Typography variant="body1" sx={{ display: 'block' }}>
          {inputContentSubTitle}
        </Typography>
        <input
          className={inputClassName}
          style={style}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={async (e) => {
            const target = e.target
            const chosenFiles = await getFilesFromEvent(e)
            onFiles(chosenFiles)
            target.value = ''
          }}
        />
      </Box>
    )
  }
}
export default Input
