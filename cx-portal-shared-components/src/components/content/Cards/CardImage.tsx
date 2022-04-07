import { Box, useTheme } from '@mui/material'

export type CardImageSize = 'normal' | 'medium' | 'small'

export type CardImageShape = 'round' | 'square'

export interface ICardImage {
  src: string
  alt?: string
}

export interface CardImageProps {
  image: ICardImage
  imageSize?: CardImageSize
  imageShape?: CardImageShape
  preview?: boolean
}

export const CardImage = ({
  image,
  imageSize = 'normal',
  imageShape = 'round',
  preview = false,
}: CardImageProps) => {
  const { transitions } = useTheme()
  const withPreview = (size: number) => (preview ? size + 18 : size)

  const sx = {
    container: {
      normal: {},
      medium: { paddingTop: 3, textAlign: 'center' },
      small: { paddingTop: 3, textAlign: 'center' },
    },
    image: {
      normal: { width: '100%', height: withPreview(144) },
      medium: { width: withPreview(156), height: withPreview(156) },
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
          ...(imageSize === 'medium' && sx.image[imageShape]),
        }}
      />
    </Box>
  )
}
