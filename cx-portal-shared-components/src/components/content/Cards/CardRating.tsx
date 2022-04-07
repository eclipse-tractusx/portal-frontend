import { Box, useTheme } from '@mui/material'
import { Typography } from '../../basic/Typography'
import StarRateIcon from '@mui/icons-material/StarRate'

export interface CardRatingProps {
  rating: number
}

export const CardRating = ({ rating }: CardRatingProps) => {
  const { palette } = useTheme()

  return (
    <Typography variant="caption3">
      <Box
        component="span"
        sx={{ display: 'inline-block', verticalAlign: 'sub', marginRight: 0.5 }}
      >
        <StarRateIcon sx={{ fill: palette.accent.accent09 }} />
      </Box>
      {rating}
    </Typography>
  )
}
