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
  expandOnHover?: AppCardProps['expandOnHover']
  filledBackground?: AppCardProps['filledBackground']
  imageSize?: AppCardProps['imageSize']
  imageShape?: AppCardProps['imageShape']
  columns?: number
  readMoreText?: AppCardProps['readMoreText']
  readMoreLink?: AppCardProps['readMoreLink']
}

export const AppCards = ({
  items,
  buttonText,
  readMoreText,
  readMoreLink,
  variant,
  imageSize,
  imageShape,
  columns = 6,
  expandOnHover,
  filledBackground,
}: AppCardsProps) => {
  const settings = {
    variant,
    buttonText,
    readMoreText,
    readMoreLink,
    imageSize,
    imageShape,
    expandOnHover,
    filledBackground,
  }
  const { spacing } = useTheme()

  return (
    <Box
      sx={{
        display: 'grid',
        gap: spacing(8, 4),
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {items?.map((item) => (
        <AppCard {...settings} {...item} key={uniqueId('AppCards')} />
      ))}
    </Box>
  )
}
