import '@mui/material/Typography'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
    caption: false
    caption1: true
    caption2: true
    caption3: true
    label1: true
    label2: true
    label3: true
    label4: true
    label5: true
    helper: true
  }
}
