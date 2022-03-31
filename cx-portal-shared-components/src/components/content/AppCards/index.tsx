import { Box } from '@mui/material'
import { AppCard, AppCardProps } from './AppCard'
import uniqueId from 'lodash/uniqueId'

export type AppCardItems = Omit<
  AppCardProps,
  'variant' | 'imageSize' | 'imageShape' | 'buttonText'
>

interface AppCardsProps {
  items: AppCardItems[]
  buttonText: AppCardProps['buttonText']
  variant?: AppCardProps['variant']
  imageSize?: AppCardProps['imageSize']
  imageShape?: AppCardProps['imageShape']
  columns?: number
}

export const AppCards = ({
  items,
  buttonText,
  variant,
  imageSize,
  imageShape,
  columns = 6,
}: AppCardsProps) => {
  const settings = {
    variant,
    buttonText,
    imageSize,
    imageShape,
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {items?.map((item) => (
        <AppCard {...settings} {...item} key={uniqueId('AppCards')} />
      ))}
    </Box>
  )
}
