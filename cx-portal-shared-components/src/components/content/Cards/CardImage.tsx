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

export const CXDefault =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zIC0zIDU4LjUgNjEuNiI+PHBhdGggZD0iTTQwIDI4LjY5di02YTEgMSAwIDAwLTEuNTUtLjgyTDE0LjY5IDM4LjMxYTQuMTEgNC4xMSAwIDAxLTYuNDUtMy4zOFYyN2E4LjIzIDguMjMgMCAwMTMuNTUtNi43Nmw3LjA4LTQuODlBNC4wNyA0LjA3IDAgMDAyMC42MyAxMlYuOTlBMSAxIDAgMDAxOS4xLjE4bC01IDMuNDJBNC4wOCA0LjA4IDAgMDAxMi4zOCA3djIuODRMNi4zIDE0QTE0LjU3IDE0LjU3IDAgMDAwIDI2djguODlhMTIuMzYgMTIuMzYgMCAwMDE5LjM4IDEwLjJsMTguOS0xM2E0LjA5IDQuMDkgMCAwMDEuNzItMy40eiIgZmlsbD0iI2I0YjRiNCIvPjxwYXRoIGQ9Ik0zMyAxMC42M2wtMTguOSAxM0E0LjA5IDQuMDkgMCAwMDEyLjM1IDI3djZhMSAxIDAgMDAxLjU1LjgxbDIzLjgxLTE2LjRhNC4xMSA0LjExIDAgMDE2LjQ0IDMuMzh2Ny45YTguMjUgOC4yNSAwIDAxLTMuNTUgNi43N2wtNi4zMyA0LjM2LS43Mi41YTQuMDYgNC4wNiAwIDAwLTEuNzUgMy4zNHYxMS4wMmExIDEgMCAwMDEuNTUuODFsNS0zLjQzQTQuMDUgNC4wNSAwIDAwNDAgNDguNzJ2LTIuODVsNi4wNi00LjE4YTE0LjU4IDE0LjU4IDAgMDA2LjI5LTEyVjIwLjhBMTIuMzUgMTIuMzUgMCAwMDMzIDEwLjYzeiIgZmlsbD0iI2ExYTFhMSIvPjwvc3ZnPg=='

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
        src={image?.src || CXDefault}
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
