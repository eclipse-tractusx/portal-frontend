import { Box, Breadcrumbs } from '@mui/material'
import { BackButton, BackButtonProps } from '../Button/BackButton'

interface BreadcrumbProps {
  onBackButtonClick?: React.MouseEventHandler
  breadcrumbs: any[]
}

export const Breadcrumb = ({
  backButtonLabel,
  backButtonVariant = 'text',
  onBackButtonClick,
  breadcrumbs,
}: BreadcrumbProps & BackButtonProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <BackButton
        backButtonLabel={backButtonLabel}
        backButtonVariant={backButtonVariant}
        onBackButtonClick={onBackButtonClick}
      />

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
