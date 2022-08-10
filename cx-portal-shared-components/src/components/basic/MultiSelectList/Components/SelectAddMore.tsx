import { Box, useTheme } from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { Button } from '../../Button'
import { Typography } from '../../Typography'

interface SelectAddMoreProps {
  selected: any[]
  buttonAddMore: string
  notItemsText: string
  label: string
  keyTitle: string
  handleShowItems: () => void
}

export const SelectAddMore = ({
  selected,
  buttonAddMore,
  notItemsText,
  label,
  keyTitle,
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
            selected.map((item: any) => {
              return <Typography
                key={uniqueId(item[keyTitle])}
                sx={{
                  width: 'fit-content',
                  padding: '16px 18px',
                  marginRight: '10px',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  color: theme.palette.accent.accent03,
                  backgroundColor: theme.palette.accent.accent02,
                }}
              >
                {item[keyTitle]}
              </Typography>
            })
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
