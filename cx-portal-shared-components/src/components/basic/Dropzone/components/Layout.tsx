import { ILayoutProps } from '../DropzoneTypes'
import { Box } from '@mui/material'

const Layout = (props: ILayoutProps) => {
  const {
    input,
    previews,
    dropzoneProps,
    files,
    extra: { maxFiles },
  } = props

  return (
    <Box
      sx={{
        '.input': {
          visibility: 'hidden',
        },
      }}
    >
      {previews}
      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
    </Box>
  )
}

export default Layout
