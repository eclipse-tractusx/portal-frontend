import { Button } from '../Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export interface BackButtonProps {
  backButtonLabel?: string
  backButtonVariant?: 'text' | 'outlined' | 'contained'
  onBackButtonClick?: React.MouseEventHandler
}

export const BackButton = ({ backButtonLabel, backButtonVariant, onBackButtonClick, }: BackButtonProps) => {
  return (
    <>
      {backButtonLabel && (
        <Button
          onClick={onBackButtonClick}
          color="secondary"
          variant={backButtonVariant}
          size="small"
          sx={{
            width: 'fit-content',
            marginRight: '24px',
            padding: '4px 12px !important',
          }}
        >
          <ArrowBackIcon sx={{ marginRight: '5px' }} /> {backButtonLabel}
        </Button>
      )}
    </>
  )
}
