import { Box, Breadcrumbs } from '@mui/material'
import { Button } from '../Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface BreadcrumbProps {
  backButton?: boolean
  backButtonLabel?: string
  backButtonVariant?: 'text' | 'outlined' | 'contained'
  onBackButtonClick?: React.MouseEventHandler
  breadcrumbs: any[]
}

export const Breadcrumb = ({
  backButton,
  backButtonLabel,
  backButtonVariant = 'text',
  onBackButtonClick,
  breadcrumbs,
}: BreadcrumbProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {backButton && (
        <Button
          onClick={onBackButtonClick}
          color="secondary"
          variant={`${backButtonVariant}`}
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

      <Breadcrumbs
        separator=" "
        aria-label="breadcrumb"
        sx={{ margin: 'auto 0px', hight: 'fit-content' }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  )
}
