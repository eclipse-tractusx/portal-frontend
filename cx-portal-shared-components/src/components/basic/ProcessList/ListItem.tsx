import { Box } from '@mui/material'
import { Typography } from '../Typography'
import { theme } from '../../../theme'

interface ListItemProps {
  step: number
  headline: string
  description: string
  stepsColor: string
  stepsFontColor: string
  lastItem: boolean
}

export const ListItem = ({
  step,
  headline,
  description,
  stepsColor,
  stepsFontColor,
  lastItem,
 }: ListItemProps) => {
  const borderToNextStep = !lastItem ? `2px solid ${stepsColor}` : 'none'
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '32px',
          height: '32px',
          margin: '0px',
        }}>
        <Box
          sx={{
            backgroundColor: stepsColor,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            top: '15px',
            left: '15px',
            color: '#fff',
          }}
        >
          <Typography
            variant="h5"
            fontSize="16px"
            color={stepsFontColor}
            sx={{
              margin: 'auto',
              paddingTop: '4px',
              width: 'fit-content',
            }}
          >
            {step}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography
          variant="h5"
          fontSize="16px"
          sx={{
            width: 'fit-content',
            paddingLeft: '15px',
          }}
        >
          {headline}
        </Typography>
        
        <Typography
          variant="body2"
          fontSize="16px"
          color= {theme.palette.text.tertiary}
          sx={{
            width: 'fit-content',
            borderLeft: borderToNextStep,
            paddingLeft: '30px',
            marginLeft: '-17px',
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            height: '28px',
            borderLeft: borderToNextStep,
            paddingLeft: '30px',
            marginLeft: '-17px',
          }}
        />
      </Box>
    </Box>
  )
}
