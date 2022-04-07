import { Box } from '@mui/material'
import { Typography } from '../../basic/Typography'
import { CardRating, CardRatingProps } from './CardRating'

export interface CardContentProps extends Partial<CardRatingProps> {
  title: string
  subtitle?: string
  price?: string
  description?: string
}

export const CardContent = ({
  title,
  subtitle,
  rating,
  price,
  description,
}: CardContentProps) => {
  return (
    <Box>
      {subtitle && (
        <Typography variant="label3" sx={{ color: 'text.tertiary' }}>
          {subtitle}
        </Typography>
      )}
      <Typography variant="h5" sx={{ marginTop: 0.5 }}>
        {title}
      </Typography>
      {rating && price && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 1,
          }}
        >
          <CardRating rating={rating} />
          <Typography variant="caption3">{price}</Typography>
        </Box>
      )}
      {description && (
        <Typography variant="body3" sx={{ marginTop: 1.5 }}>
          {description}
        </Typography>
      )}
    </Box>
  )
}
