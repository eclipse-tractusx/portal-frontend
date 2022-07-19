import { Box } from '@mui/material'
import { Button } from '../../Button'
import { ErrorPageProps } from '../index'

export const ErrorActions = ({
  reloadButtonTitle,
  homeButtonTitle,
  onReloadClick,
  onHomeClick,
}: ErrorPageProps) => {
  return (
    <Box
      sx={{
        width: 'max-content',
        margin: '32px auto',
      }}
    >
      {reloadButtonTitle && (
        <Button
          color={'primary'}
          variant={'contained'}
          sx={{ marginRight: '16px' }}
          size={'medium'}
          onClick={onReloadClick}
        >
          {reloadButtonTitle}
        </Button>
      )}
      {homeButtonTitle && (
        <Button
          color={'primary'}
          variant={'outlined'}
          sx={{ marginRight: '16px' }}
          size={'medium'}
          onClick={onHomeClick}
        >
          {homeButtonTitle}
        </Button>
      )}
    </Box>
  )
}
