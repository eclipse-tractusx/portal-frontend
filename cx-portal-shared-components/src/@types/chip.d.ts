import '@mui/material/Chip'

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    pending: true
    confirmed: true
    declined: true
    label: true
  }
}
