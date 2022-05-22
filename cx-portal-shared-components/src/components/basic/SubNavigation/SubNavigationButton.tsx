import { Box } from '@mui/material'
import { SubNavigationProps } from '.'
import { Button } from '../Button'

export const SubNavigationButton = ({
  buttonLabel,
  onButtonClick,
}: SubNavigationProps) => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        margin: '32px 0px',
        width: '40%',
      }}
    >
      {buttonLabel && onButtonClick && (
        <Button
          onClick={onButtonClick}
          color="secondary"
          variant="outlined"
          size="medium"
          sx={{ float: 'right' }}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  )
}
