import { Box, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Button, ButtonProps } from '../Button'
import { CircleProgress } from '../Progress/CircleProgress'
import { Typography } from '../Typography'

interface LoadingButtonProps extends ButtonProps {
  label: string
  loadIndicator: string
  loading: boolean
  helperText?: string
  helperTextColor?: 'success' | 'error'
  onButtonClick: React.MouseEventHandler
}

export const LoadingButton = ({ label, loadIndicator, loading, onButtonClick, helperText, size, color, helperTextColor, ...props }: LoadingButtonProps) => {
  const theme = useTheme()
  const [tagStyle, setTagStyle] = useState({
    padding: '10px 24px',
    fontSize: '18px',
  })

  function handleClick(e: any) {
    onButtonClick(e)
  }

  useEffect(() => {
    switch (size) {
      case 'small':
        setTagStyle({ padding: '10px 18px', fontSize: '14px' })
        break
      case 'medium':
        setTagStyle({ padding: '10px 24px', fontSize: '18px' })
        break
      case 'large':
        setTagStyle({ padding: '10px 28px', fontSize: '18px' })
    }
  }, [size])

  return (
    <Box>
      {!loading ?
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Button
            size={size}
            color={color}
            onClick={handleClick}
            sx={{width: 'fit-content'}}
            {...props}
          >
            {label}
          </Button>
          {helperText &&
            <Typography variant="label2"
              sx={{
                padding: tagStyle.padding,
                fontSize: tagStyle.fontSize,
                color: helperTextColor === 'error' ? theme.palette.danger.danger : theme.palette.success.main
              }}>
              {helperText}
            </Typography>
          }
        </Box>
      :
        <Button
          size={size}
          color={color}
          startIcon={<CircleProgress
            thickness={5}
            size={20}
            variant='indeterminate'
            colorVariant='secondary'
          />}
          {...props}
        >
          {loadIndicator}
        </Button>
      }
    </Box>
  )
}
