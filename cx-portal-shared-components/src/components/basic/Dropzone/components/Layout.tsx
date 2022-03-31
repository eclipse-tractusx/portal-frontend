import { ILayoutProps } from 'react-dropzone-uploader'
import { Box } from '@mui/material'

export const Layout = ({
  input,
  previews,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <Box
      sx={{
        '.dzu-input': {
          visibility: 'hidden',
        },
      }}
    >
      {previews}
      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
    </Box>
  )
}
