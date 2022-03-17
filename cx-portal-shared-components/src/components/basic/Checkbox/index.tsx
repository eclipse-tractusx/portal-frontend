import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface CheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  size?: 'medium' | 'small'
}

export const Checkbox = ({ size = 'medium', ...props }: CheckboxProps) => {
  return <MuiCheckbox size={size} {...props} {...label} />
}
