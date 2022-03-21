import { Box, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { AppCardButtons, AppCardButtonsProps } from './AppCardButtons'
import { AppCardContent, AppCardContentProps } from './AppCardContent'
import { AppCardImage, AppCardImageProps } from './AppCardImage'

type Variants = 'minimal' | 'compact' | 'expanded' | 'preview'

export interface AppCardProps
  extends AppCardContentProps,
    AppCardButtonsProps,
    AppCardImageProps {
  variant?: Exclude<Variants, 'preview'>
}

export const AppCard = ({
  variant: variantProp = 'minimal',
  title,
  subtitle,
  rating,
  price,
  description,
  image,
  imageSize,
  imageShape,
  buttonText,
  onButtonClick,
  onSecondaryButtonClick,
}: AppCardProps) => {
  const { shape, shadows } = useTheme()
  const [variant, setVariant] = useState(variantProp as Variants)
  const [content, setContent] = useState({
    title,
    subtitle,
  } as AppCardContentProps)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    setVariant(variantProp)
  }, [variantProp])

  useEffect(() => {
    switch (variant) {
      case 'compact':
        setContent({ title, subtitle, rating, price })
        break
      case 'expanded':
      case 'preview':
        setContent({ title, subtitle, rating, price, description })
        break
      default:
        setContent({ title, subtitle })
    }
  }, [variant, description, price, rating, subtitle, title])

  useEffect(() => {
    setShowButton(['expanded', 'preview'].includes(variant))
  }, [variant])

  const onMouseEnter = () => setVariant('preview')
  const onMouseLeave = () => setVariant(variantProp)

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box
        sx={{
          backgroundColor: 'common.white',
          borderRadius: shape.borderRadius,
          border: '1px solid',
          borderColor: 'border.border01',
          overflow: 'hidden',
          ...(variant === 'preview' && {
            position: 'absolute',
            width: 'calc(100% - 2px)',
            zIndex: 100,
            boxShadow: shadows['20'],
          }),
        }}
      >
        <AppCardImage
          image={image}
          imageSize={imageSize}
          imageShape={imageShape}
          preview={variant === 'preview'}
        />
        <Box sx={{ padding: 3 }}>
          <AppCardContent {...content} />
          {showButton && (
            <AppCardButtons
              buttonText={buttonText}
              onButtonClick={onButtonClick}
              onSecondaryButtonClick={onSecondaryButtonClick}
            />
          )}
        </Box>
      </Box>
    </div>
  )
}
