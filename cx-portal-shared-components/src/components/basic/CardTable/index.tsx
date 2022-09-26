import * as React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Accordion, {
  StyledAccordianDetails,
  StyledAccordianSummary,
  StyledAccordianButton,
} from './CardTable'

interface CustomAccordianProps {
  hover?: boolean
  row: any
  activeLabel: string
  inactiveLabel: string
}

interface rowProp {
  identityProviderCategoryId: string
  displayName: string
  enabled: boolean
  identityProviderId: string
  body: React.ReactElement
}

const option = ['Edit', 'User Managment', 'Enable', 'Delete']

export const CardTable = ({
  hover = false,
  row,
  activeLabel = 'ENABLED',
  inactiveLabel = 'DISABLED',
}: CustomAccordianProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleMoreOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const handleItemClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string
  ) => {
    alert(`${option} clicked`)
    handleClose(e)
  }

  return (
    <>
      {row.map(
        ({
          identityProviderCategoryId,
          displayName,
          enabled,
          identityProviderId,
          body,
        }: rowProp) => {
          return (
            <Accordion
              expanded={expanded === identityProviderId}
              onChange={handleChange(identityProviderId)}
              TransitionProps={{ unmountOnExit: true }}
            >
              <StyledAccordianSummary
                expanded={expanded === identityProviderId}
                hover={hover}
                expandIcon={
                  <>
                    <IconButton
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleMoreOptionClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      {option.map((option) => (
                        <MenuItem
                          key={option}
                          onClick={(e) => handleItemClick(e, option)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                }
              >
                <Typography width="25%" textAlign="start">
                  {identityProviderCategoryId}
                </Typography>
                <Typography width="25%" textAlign="start">
                  {displayName}
                </Typography>
                <StyledAccordianButton
                  disableElevation
                  variant="contained"
                  size="small"
                >
                  {enabled ? activeLabel : inactiveLabel}
                </StyledAccordianButton>
              </StyledAccordianSummary>
              <StyledAccordianDetails>
                <Box p={1} display="flex" justifyContent="flex-end">
                  <IconButton onClick={(e) => setExpanded(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {body}
              </StyledAccordianDetails>
            </Accordion>
          )
        }
      )}
    </>
  )
}
