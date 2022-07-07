import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export interface EditButtonProps extends Omit<MuiButtonProps, 'color'> {
  color?: 'primary' | 'secondary'
}

export const EditButton = ({
  variant = 'contained',
  color: colorProp = 'primary',
  ...props
}: EditButtonProps) => {
  const color = ['outlined', 'text'].includes(variant) ? 'primary' : colorProp

  return <MuiButton variant={variant} color={color} {...props} />
}
