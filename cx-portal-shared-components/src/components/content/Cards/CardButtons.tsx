import { Box } from '@mui/material'
import { Button } from '../../basic/Button'
import { IconButton } from '../../basic/IconButton'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

export interface CardButtonsProps {
  buttonText: string
  onButtonClick?: React.MouseEventHandler
  onSecondaryButtonClick?: React.MouseEventHandler
  addButtonClicked?: boolean
}

export const CardButtons = ({
  buttonText,
  onButtonClick = () => {},
  onSecondaryButtonClick,
  addButtonClicked,
}: CardButtonsProps) => {
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
          {addButtonClicked ? <CheckIcon /> : <AddIcon />}
        </IconButton>
      )}
    </Box>
  )
}
