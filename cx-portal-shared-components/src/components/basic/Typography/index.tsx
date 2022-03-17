import MuiTypography, { TypographyProps } from '@mui/material/Typography'

const variantMapping = {
  body3: 'p',
}

export const Typography = (props: TypographyProps) => (
  <MuiTypography variantMapping={variantMapping} {...props} />
)
