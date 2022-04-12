import { Box } from '@mui/material'
import { Button } from '../Button'
import React from 'react'

export interface view {
  buttonText: string
  buttonValue: string
  onButtonClick?: React.MouseEventHandler
}

export interface ViewSelectorProps {
  views: view[]
  activeView: string
}

export const ViewSelector = ({ views, activeView }: ViewSelectorProps) => {
  return (
    <Box sx={{ textAlign: 'right' }}>
      {views?.map(({ buttonText, buttonValue, onButtonClick }) => (
        <Button
          color={'secondary'}
          variant={
            activeView.toLowerCase() === buttonValue.toLowerCase()
              ? 'contained'
              : 'text'
          }
          value={buttonValue}
          key={buttonText}
          sx={{ marginRight: '16px' }}
          size={'small'}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      ))}
    </Box>
  )
}
