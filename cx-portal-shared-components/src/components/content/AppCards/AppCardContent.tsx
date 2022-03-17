import { Box } from '@mui/material'
import { Typography } from '../../basic/Typography'
import { AppCardRating, AppCardRatingProps } from './AppCardRating'

export interface AppCardContentProps extends Partial<AppCardRatingProps> {
  title: string
  subtitle: string
  price?: string
  description?: string
}

export const AppCardContent = ({
  title,
  subtitle,
  rating,
  price,
  description,
}: AppCardContentProps) => {
  return (
    <Box>
      <Typography variant="label3" sx={{ color: 'text.tertiary' }}>
        {subtitle}
      </Typography>
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
          <AppCardRating rating={rating} />
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
