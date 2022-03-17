import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio'

const label = { inputProps: { 'aria-label': 'Radio demo' } }

interface RadioProps extends Omit<MuiRadioProps, 'size'> {
  size?: 'medium' | 'small'
}

export const Radio = ({ size = 'medium', ...props }: RadioProps) => {
  return <MuiRadio size={size} {...props} {...label} />
}
