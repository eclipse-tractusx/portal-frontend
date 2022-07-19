import { Box, Link, Theme, useTheme } from '@mui/material'
import MuiChip from '@mui/material/Chip'
import { useEffect, useRef, useState } from 'react'
import { CardButtons, CardButtonsProps } from './CardButtons'
import { CardContent, CardContentProps } from './CardContent'
import { CardImage, CardImageProps } from './CardImage'

export enum EnumStatusVariants {
  release = 'release',
  active = 'active',
  inactive = 'inactive',
}

export type StatusVariants =  EnumStatusVariants.release | EnumStatusVariants.active | EnumStatusVariants.inactive
type Variants = 'minimal' | 'compact' | 'expanded' | 'preview' | 'text-only'

interface CardStatusProps {
  status?: StatusVariants
  statusText?: string
}
export interface CardProps
  extends CardContentProps,
    CardButtonsProps,
    CardImageProps,
    CardStatusProps {
  variant?: Exclude<Variants, 'preview'>
  filledBackground?: boolean
  backgroundColor?: string
  expandOnHover?: boolean
  readMoreText?: string
  readMoreLink?: string
  onClick?: React.MouseEventHandler
  addButtonClicked?: boolean
}

export function getChipColor(status: StatusVariants, theme: Theme) {
  switch (status) {
    case EnumStatusVariants.release:
      return theme.palette.chip.release
    case EnumStatusVariants.active:
      return theme.palette.chip.active
    case EnumStatusVariants.inactive:
      return theme.palette.chip.inactive
  }
}

export function getChipBgColor(status: StatusVariants, theme: Theme) {
  switch (status) {
    case EnumStatusVariants.release:
      return theme.palette.chip.bgRelease
    case EnumStatusVariants.active:
      return theme.palette.chip.bgActive
    case EnumStatusVariants.inactive:
      return theme.palette.chip.bgInactive
  }
}

export const Card = ({
  variant: variantProp = 'minimal',
  expandOnHover = false,
  filledBackground,
  backgroundColor,
  title,
  subtitle,
  rating,
  price,
  description,
  image,
  imageSize,
  imageShape,
  buttonText,
  onClick,
  onButtonClick,
  onSecondaryButtonClick,
  readMoreText,
  readMoreLink,
  addButtonClicked,
  status,
  statusText,
}: CardProps) => {
  const { shape, shadows, spacing } = useTheme()
  const [variant, setVariant] = useState(variantProp as Variants)
  const [content, setContent] = useState({
    title,
    subtitle,
  } as CardContentProps)
  const boxRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const [chipColor, setChipColor] = useState('')
  const [chipBackground, setChipBackground] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [boxHeight, setBoxHeight] = useState<number | undefined>()

  useEffect(() => {
    setVariant(variantProp)
  }, [variantProp])

  useEffect(() => {
    switch (variant) {
      case 'compact':
        setContent({ title, subtitle, rating, price })
        break
      case 'text-only':
        setContent({ title, description })
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

  useEffect(() => {
    // Set initial box height to prevent flicker on hover
    // TODO: Had to add 37px in height to fit inner content, investigation required
    setBoxHeight(boxRef.current?.getBoundingClientRect().height)
  }, [])

  const onMouseEnter = () => {
    if (expandOnHover) setVariant('preview')
  }
  const onMouseLeave = () => setVariant(variantProp)

  const customBackgroundColor = () => {
    return backgroundColor ? backgroundColor : 'background.background02'
  }

  useEffect(() => {
    setChipColor(getChipColor(status!, theme))
    setChipBackground(getChipBgColor(status!, theme))
  }, [status, theme])

  return (
    <div
      ref={boxRef}
      style={{
        position: 'relative',
        height: boxHeight ? `${boxHeight + 37}px` : '',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Box
        sx={{
          backgroundColor: 'common.white',
          borderRadius: shape.borderRadius,
          border: '1px solid',
          borderColor: 'border.border01',
          ':hover': {
            boxShadow: shadows['20'],
          },
          ...(filledBackground === true && {
            backgroundColor: customBackgroundColor,
            border: 'none',
          }),
          ...(variant === 'preview' && {
            position: 'absolute',
            width: 'calc(100% - 2px)',
            zIndex: 100,
          }),
          ...(variant === 'text-only' && {
            border: 'none',
            ':hover': {
              boxShadow: 'none',
            },
          }),
          ...(onClick && { cursor: 'pointer' }),
        }}
        className="card"
      >
        <Box>
          {statusText &&
            <MuiChip
              label={statusText}
              variant="outlined"
              sx={{
                color: chipColor,
                backgroundColor: chipBackground,
                borderRadius: '200px',
                border: 'none',
                height: '28px',
                position: 'absolute',
                right: '0',
                marginRight: '17px',
                marginTop: '21px',
              }}
            />
          }
          <CardImage
            image={image}
            imageSize={imageSize}
            imageShape={imageShape}
            preview={variant === 'preview'}
          />
        </Box>
        <Box
          sx={{
            padding: 3,
            ...(variant === 'text-only' && {
              padding: spacing(3, 0),
            }),
          }}
        >
          <CardContent {...content} />
          {showButton && (
            <CardButtons
              buttonText={buttonText}
              onButtonClick={onButtonClick}
              onSecondaryButtonClick={onSecondaryButtonClick}
              addButtonClicked={addButtonClicked}
            />
          )}
          {variant === 'text-only' && readMoreLink && readMoreText && (
            <Link
              sx={{
                display: 'block',
                marginTop: '10px',
                textDecoration: 'underline',
                fontSize: 'typography.h4.fontSize',
              }}
              href={readMoreLink}
            >
              {readMoreText}
            </Link>
          )}
        </Box>
      </Box>
    </div>
  )
}
