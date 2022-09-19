import { Grid, useTheme } from '@mui/material'
import { Typography } from 'cx-portal-shared-components'

const GridTitle = ({ title }: { title: string }) => {
  const theme = useTheme()
  const { spacing } = theme

  return (
    <>
      <Grid
        xs={12}
        item
        style={{
          backgroundColor: theme.palette.grey['100'],
          padding: spacing(2),
        }}
      >
        <Typography variant="h5">{title}</Typography>
      </Grid>
    </>
  )
}

export default GridTitle
