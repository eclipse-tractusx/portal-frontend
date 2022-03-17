import { Box } from '@mui/material'
import CXLogo from '../../../assets/logo/cx-logo.svg'
import CXLogoShort from '../../../assets/logo/cx-logo-short.svg'
import CXLogoText from '../../../assets/logo/cx-logo-text.svg'

interface LogoProps {
  variant: 'standard' | 'short' | 'text'
  altText: string
}

export const Logo = ({
  variant = 'standard',
  altText = 'Catena-X logo',
  ...props
}: LogoProps) => {
  let image

  switch (variant) {
    case 'short':
      image = CXLogoShort
      break
    case 'text':
      image = CXLogoText
      break
    default:
      image = CXLogo
  }

  return (
    <Box
      component="img"
      sx={{
        maxWidth: '100%',
      }}
      src={image}
      alt={altText}
      {...props}
    />
  )
}
