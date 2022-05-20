import { Box } from '@mui/material'
import { theme } from '../../../theme'
import { SubNavigationLink } from './SubNavigationLink'
import { SubNavigationButton } from './SubNavigationButton'

export interface SubNavigationProps{
  buttonLabel?: string
  onButtonClick?: React.MouseEventHandler
  link1Label?: string
  onLink1Click?: React.MouseEventHandler
  link2Label?: string
  onLink2Click?: React.MouseEventHandler
}
export const SubNavigation = ({
  buttonLabel,
  onButtonClick,
  link1Label,
  onLink1Click,
  link2Label,
  onLink2Click,
}: SubNavigationProps) => {
  return (
    <Box
      sx={{
        height: '116px',
        backgroundColor: theme.palette.accent.accent02,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: '1200px',
          marginRight: 'auto',
          marginLeft: 'auto',
          padding: '0px 16px',
        }}
      >
        <SubNavigationLink
          link1Label={link1Label}
          onLink1Click={onLink1Click}
          link2Label={link2Label}
          onLink2Click={onLink2Click}
        />
        <SubNavigationButton
          buttonLabel={buttonLabel}
          onButtonClick={onButtonClick}
        />
      </Box>
    </Box>
  )
}
