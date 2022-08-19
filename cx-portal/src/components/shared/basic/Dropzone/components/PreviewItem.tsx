import { Box } from '@mui/material'
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
//import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { Typography, FileIcon } from 'cx-portal-shared-components'

export const PreviewItem = ({ children }: { children: JSX.Element }) => {
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
    >
      {children}
    </Box>
  )
}
