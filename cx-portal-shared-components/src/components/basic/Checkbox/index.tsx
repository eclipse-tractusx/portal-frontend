import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const ariaLabel = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface CheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  size?: 'medium' | 'small'
  label?: string | number
}

export const Checkbox = ({
  size = 'medium',
  label,
  ...props
}: CheckboxProps) => {
  return label ? (
    <FormControlLabel
      control={<MuiCheckbox size={size} {...props} {...ariaLabel} />}
      label={label}
    />
  ) : (
    <MuiCheckbox size={size} {...props} {...ariaLabel} />
  )
}
