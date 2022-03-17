import { Box, SxProps, useTheme } from '@mui/material'

export type AppCardImageSize = 'normal' | 'small'

export type AppCardImageShape = 'round' | 'square'

export interface AppCardImage {
  src: string
  alt?: string
}

export interface AppCardImageProps {
  image: AppCardImage
  imageSize?: AppCardImageSize
  imageShape?: AppCardImageShape
  preview?: boolean
}

export const AppCardImage = ({
  image,
  imageSize = 'normal',
  imageShape = 'round',
  preview = false,
}: AppCardImageProps) => {
  const { transitions } = useTheme()
  const withPreview = (size: number) => (preview ? size + 18 : size)

  const sx = {
    container: {
      normal: {},
      small: { paddingTop: 3, textAlign: 'center' },
    },
    image: {
      normal: { width: '100%', height: withPreview(144) },
      small: { width: withPreview(80), height: withPreview(80) },
      round: { borderRadius: '50%' },
      square: { borderRadius: 6 },
    },
  }

  return (
    <Box sx={sx.container[imageSize]}>
      <Box
        component="img"
        src={image?.src}
        alt={image?.alt}
        sx={{
          objectFit: 'cover',
          transition: transitions.create(['all'], {
            duration: transitions.duration.shorter,
          }),
          ...sx.image[imageSize],
          ...(imageSize === 'small' && sx.image[imageShape]),
        }}
      />
    </Box>
  )
}
