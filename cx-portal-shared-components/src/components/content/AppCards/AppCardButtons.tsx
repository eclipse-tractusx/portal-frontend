import { Box } from '@mui/material'
import { Button } from '../../basic/Button'
import { IconButton } from '../../basic/IconButton'
import AddIcon from '@mui/icons-material/Add'

export interface AppCardButtonsProps {
  buttonText: string
  onButtonClick: React.MouseEventHandler
  onSecondaryButtonClick?: React.MouseEventHandler
}

export const AppCardButtons = ({
  buttonText,
  onButtonClick = () => {},
  onSecondaryButtonClick,
}: AppCardButtonsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Button size="small" onClick={onButtonClick}>
        {buttonText}
      </Button>
      {onSecondaryButtonClick && (
        <IconButton color="secondary" onClick={onSecondaryButtonClick}>
          <AddIcon />
        </IconButton>
      )}
    </Box>
  )
}
