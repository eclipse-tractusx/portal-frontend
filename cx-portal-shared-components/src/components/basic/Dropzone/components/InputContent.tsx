import { Box, useTheme } from '@mui/material'
import { CloudUploadIcon } from '../../CustomIcons/CloudUploadIcon'
import { Typography } from '../../Typography'

interface InputContentProps {
  title: string
  subTitle: string
}

export const InputContent = ({ title, subTitle }: InputContentProps) => {
  const theme = useTheme()
  const { icon01 } = theme.palette.icon

  return (
    <Box>
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
}
