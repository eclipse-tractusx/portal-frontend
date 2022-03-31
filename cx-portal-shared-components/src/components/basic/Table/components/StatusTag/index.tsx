import MuiChip, { ChipProps as MuiStatusChipProps } from '@mui/material/Chip'

interface StatusChipProps extends Omit<MuiStatusChipProps, 'color'> {
  color?: 'pending' | 'confirmed' | 'declined' | 'label'
}

export const StatusTag = ({
  variant = 'filled',
  color = 'pending',
  onDelete = () => null, // To avoid default delete icon appear
  ...props
}: StatusChipProps) => {
  return <MuiChip variant={variant} color={color} {...props} />
}
