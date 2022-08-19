import { Box } from '@mui/material'
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
//import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { Typography, FileIcon } from 'cx-portal-shared-components'

export const FilePreviewItem = ({ file }: { file: File }) => {
  return (
    <>
      <FileIcon fillColor={'#939393'} size={80} />

      <Box sx={{ width: '100%', margin: '8px 32px' }}>
        <Typography
          variant="h6"
          sx={{ display: 'block', color: 'common.black' }}
        >
          {file.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'block', '&.error': { color: 'danger.danger' } }}
        >
          {file.type}, {file.size} bytes
        </Typography>
        <progress max={100} value={0} />
      </Box>
    </>
  )
}
