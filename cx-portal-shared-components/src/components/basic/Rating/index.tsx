import * as React from 'react'
import Box from '@mui/material/Box'
import RatingUI from '@mui/material/Rating'

interface RatingContentProps {
  defaultRating: number
}

export const Rating = ({ defaultRating }: RatingContentProps) => {
  const [value, setValue] = React.useState<number | null>(defaultRating)
  return (
    <Box
      sx={{
        '& > legend': { mt: defaultRating },
      }}
    >
      <RatingUI
        name="half-rating"
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      />
    </Box>
  )
}
