import { Box, useTheme } from '@mui/material'
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
}

export const AppCards = ({
  items,
  buttonText,
  variant,
  imageSize,
  imageShape,
}: AppCardsProps) => {
  const { breakpoints } = useTheme()
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        [breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(6, 1fr)',
        },
      }}
    >
      {items?.map((item) => (
        <AppCard {...settings} {...item} key={uniqueId('AppCards')} />
      ))}
    </Box>
  )
}
