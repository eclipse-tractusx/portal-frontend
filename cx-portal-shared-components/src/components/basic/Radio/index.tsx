import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'

const ariaLabel = { inputProps: { 'aria-label': 'Radio demo' } }

interface RadioProps extends Omit<MuiRadioProps, 'size'> {
  size?: 'medium' | 'small'
  label?: string | number
}

export const Radio = ({ size = 'medium', label, ...props }: RadioProps) => {
  return label ? (
    <FormControlLabel
      control={<MuiRadio size={size} {...props} {...ariaLabel} />}
      label={label}
    />
  ) : (
    <MuiRadio size={size} {...props} {...ariaLabel} />
  )
}
