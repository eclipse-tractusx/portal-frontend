import { Box, Divider } from '@mui/material'
import { Button } from '../Button'
import { Typography } from '../Typography'

interface CategoryDividerProps {
  buttonText: string
  categoryItemsLength: number
  categoryName: string
  onButtonClick: React.MouseEventHandler
}

export const CategoryDivider = ({
  buttonText,
  categoryItemsLength,
  categoryName,
  onButtonClick = () => {},
}: CategoryDividerProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        marginBottom: '52px',
        marginTop: '52px',
        '&:first-child': {
          marginTop: '0',
        },
      }}
    >
      <Box
        sx={{
          paddingRight: '15px',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography sx={{ color: 'text.tertiary' }} variant="body2">
          {categoryName} ({categoryItemsLength})
        </Typography>
      </Box>
      <Divider
        sx={{
          borderColor: 'border.border01',
          flexShrink: 'unset',
          width: '100%',
        }}
      />
      <Box sx={{ paddingLeft: '15px' }}>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}
