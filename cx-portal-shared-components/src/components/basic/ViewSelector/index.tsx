import { Box } from '@mui/material'
import { Button } from '../Button'
import React from 'react'

export interface view {
  buttonText: string
  onButtonClick?: React.MouseEventHandler
}

export interface ViewSelectorProps {
  views: view[]
  activeView: string
}

export const ViewSelector = ({ views, activeView }: ViewSelectorProps) => {
  return (
    <Box sx={{ textAlign: 'right' }}>
      {views?.map(({ buttonText, onButtonClick }) => (
        <Button
          color={'secondary'}
          variant={
            activeView.toLowerCase() ===
            buttonText.toLowerCase().replace(/\s+/g, '')
              ? 'contained'
              : 'text'
          }
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
