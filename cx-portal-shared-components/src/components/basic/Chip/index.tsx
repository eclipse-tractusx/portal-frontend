import MuiChip, { ChipProps } from '@mui/material/Chip'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { theme } from '../../../theme'

interface ChipCustomProps extends ChipProps {
  type?: 'decline' | 'confirm'
  withIcon?: true | false
}

export const Chip = ({
  variant = 'filled',
  color = 'label',
  type = 'decline',
  withIcon = true,
  onDelete = () => null, // To avoid default delete icon appear
  ...props
}: ChipCustomProps) => {
  let icon, hoverBgColor, hoverTextColor

  switch (type) {
    case 'decline':
      icon = <HighlightOffIcon />
      hoverBgColor = theme.palette.declined.main
      hoverTextColor = theme.palette.declined.contrastText
      break
    case 'confirm':
      icon = <CheckCircleOutlineIcon />
      hoverBgColor = theme.palette.confirmed.main
      hoverTextColor = theme.palette.confirmed.contrastText
      break
  }

  return (
    <MuiChip
      variant={variant}
      color={color}
      icon={withIcon ? icon : undefined}
      sx={{
        borderRadius: '36px',
        ':hover': {
          backgroundColor: hoverBgColor,
          color: hoverTextColor,
        },
      }}
      {...props}
    />
  )
}
