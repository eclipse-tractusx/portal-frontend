import { Box } from '@mui/material'
import { Button } from '../Button'
import React from 'react'

export interface filterView {
  buttonText: string
  onButtonClick?: React.MouseEventHandler
}

export interface FilterSelectorProps {
  filterViews: filterView[]
  activeFilter: string
}

export const FilterSelector = ({
  filterViews,
  activeFilter,
}: FilterSelectorProps) => {
  return (
    <Box sx={{ textAlign: 'right' }}>
      {filterViews?.map(({ buttonText, onButtonClick }) => (
        <Button
          color={'secondary'}
          variant={
            activeFilter.toLowerCase() ===
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
