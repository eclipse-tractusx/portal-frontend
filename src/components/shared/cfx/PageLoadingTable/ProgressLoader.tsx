import { Box, CircularProgress } from '@mui/material'
import { TableVariants } from './helpers'
import './styles.scss'

export function ProgressLoader({
  variant = TableVariants.AUTO_SCROLL,
}: { variant?: TableVariants } = {}) {
  return (
    <Box
      className={`cx-table__page-loading--loader cx-table__page-loading--variant-${variant}`}
    >
      <CircularProgress />
    </Box>
  )
}
