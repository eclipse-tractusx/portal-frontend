import { Box, Grid, useTheme } from '@mui/material'

interface TechnicalUserDetailsGridProps {
  items: string[]
  title: string
}

export const TechnicalUserDetailsGrid = ({
  items,
  title,
}: TechnicalUserDetailsGridProps) => {
  const { palette } = useTheme()

  return (
    <Box
      sx={{
        width: '353px',
        marginRight: '31px',
        marginBottom: '92px',
      }}
    >
      <Box
        sx={{
          height: '60px',
          width: '353px',
          backgroundColor: '#EDF0F4',
          padding: '18px 24px',
        }}
      >
        {title}
      </Box>
      {items.map((gridItem) => {
        return (
          <Grid
            key={gridItem}
            item
            xs={7}
            style={{
              borderBottom: `1px solid ${palette.grey['200']}`,
              marginTop: 0,
              padding: '18px 24px',
            }}
          >
            <Box>{gridItem}</Box>
          </Grid>
        )
      })}
    </Box>
  )
}
