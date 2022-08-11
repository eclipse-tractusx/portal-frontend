import { Box, useTheme } from '@mui/material'
import { Typography } from '../../Typography'
import { TagSizeType } from '..'
import { useEffect, useState } from 'react'

interface SelectedTagProps {
  title: string
  size?: TagSizeType
}

export const SelectedTag = ({ title, size }: SelectedTagProps) => {
  const theme = useTheme()
  const [tagStyle, setTagStyle] = useState({
    padding: '10px 18px',
    fontSize: '14px',
  })

  useEffect(() => {
    switch (size) {
      case 'small' :
        setTagStyle({ padding: '10px 18px', fontSize: '14px'})
        break
      case 'medium' :
      setTagStyle({ padding: '14px', fontSize: '18px'})
        break
      case 'large' :
      setTagStyle({ padding: '16px 28px', fontSize: '18px'})
    }
  }, [size])

  return (
    <Box>
      <Typography
        sx={{
          width: 'fit-content',
          padding: tagStyle.padding,
          marginRight: '10px',
          marginBottom: '10px',
          borderRadius: '10px',
          fontWeight: 'bold',
          fontSize: tagStyle.fontSize,
          color: theme.palette.accent.accent03,
          backgroundColor: theme.palette.accent.accent02,
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
