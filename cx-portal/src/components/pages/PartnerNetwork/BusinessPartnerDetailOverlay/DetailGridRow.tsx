import { Grid, useTheme } from '@mui/material'

const DetailGridRow = ({
  variableName,
  value,
}: {
  variableName: string
  value: string
}) => {
  const { palette, spacing } = useTheme()
  return (
    <>
      <Grid
        item
        xs={5}
        style={{
          borderBottom: `1px solid ${palette.grey['200']}`,
          marginTop: 0,
          padding: spacing(1.5),
        }}
      >
        <span>{variableName}</span>
      </Grid>
      <Grid
        item
        xs={7}
        style={{
          borderBottom: `1px solid ${palette.grey['200']}`,
          marginTop: 0,
          padding: spacing(1.5),
        }}
      >
        <span>{value}</span>
      </Grid>
    </>
  )
}

export default DetailGridRow
