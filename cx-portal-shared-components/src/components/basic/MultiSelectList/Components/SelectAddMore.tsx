import { Box, useTheme } from '@mui/material'
import { MultiSelectItemType } from '..'
import uniqueId from 'lodash/uniqueId'
import { Button } from '../../Button'
import { Typography } from '../../Typography'

interface SelectAddMoreProps {
  selected: MultiSelectItemType[]
  buttonAddMore: string
  notItemsText: string
  label: string
  handleShowItems: () => void
}

export const SelectAddMore = ({
  selected,
  buttonAddMore,
  notItemsText,
  label,
  handleShowItems,
}: SelectAddMoreProps) => {
  const theme = useTheme()

  return (
    <Box>
      <Typography
        variant="body1"
        fontSize="14px"
        sx={{
          marginBottom: '10px',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '80%',
          }}
        >
          {selected.length > 0 ? (
            selected.map((item: MultiSelectItemType) => (
              <Typography
                key={uniqueId(item.title)}
                sx={{
                  height: '24px',
                  width: 'fit-content',
                  padding: '18px',
                  marginRight: '10px',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  color: theme.palette.accent.accent03,
                  backgroundColor: theme.palette.accent.accent02,
                }}
              >
                {item.title}
              </Typography>
            ))
          ) : (
            <Typography
              variant="body1"
              fontSize="18px"
              sx={{
                height: 'fit-content',
                paddingTop: '3px',
                width: 'max-content',
              }}
            >
              {notItemsText}
            </Typography>
          )}
        </Box>
        <Box sx={{ height: '40px', width: '20%' }}>
          <Button
            sx={{ width: 'fit-content', float: 'right' }}
            size="medium"
            color="secondary"
            onClick={() => handleShowItems()}
          >
            {buttonAddMore}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
