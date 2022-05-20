import { Box } from '@mui/material'
import { SubNavigationProps } from '.'
import { Button } from '../Button'
import EastIcon from '@mui/icons-material/East';

export const SubNavigationLink = ({
  link1Label,
  onLink1Click,
  link2Label,
  onLink2Click,
}: SubNavigationProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'fit-content',
        width: '60%',
        margin: '32px 0px',
      }}
    >
      <Box sx={{width: '50%'}}>
        {link1Label && onLink1Click && (
          <>
            <Button
              onClick={onLink1Click}
              color="secondary"
              variant="text"
              size="medium"
            >
              <EastIcon sx={{marginRight: '16px'}} />
              {link1Label}
            </Button>
          </>
        )}
      </Box>

      <Box sx={{width: '50%'}}>
      {link2Label && onLink2Click && (
          <Button
            onClick={onLink2Click}
            color="secondary"
            variant="text"
            size="medium"
          >
            <EastIcon sx={{marginRight: '16px'}} />
            {link2Label}
          </Button>
        )}
      </Box>
    </Box>
  )
}
