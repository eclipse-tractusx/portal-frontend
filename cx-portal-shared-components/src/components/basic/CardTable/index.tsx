import * as React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Tooltip } from '@mui/material'

import Accordion, {
  StyledAccordianDetails,
  StyledAccordianSummary,
  StyledAccordianButton,
} from './CardTable'

export interface DataProp {
  identityProviderCategoryId: string
  displayName?: string
  enabled: boolean
  identityProviderId: string
  body: React.ReactElement
  menuOptions: {
    key: string
    label: string
    isDisable: boolean
    tooltipTitle?: string
  }[]
}
export interface CustomAccordianProps {
  hover?: boolean
  data: DataProp
  activeLabel: string
  inactiveLabel: string
  onMenuClick: (key: string, row: DataProp) => void
}

const CardHorizontalTable = ({
  hover = false,
  data,
  activeLabel = 'ENABLED',
  inactiveLabel = 'DISABLED',
  onMenuClick,
}: CustomAccordianProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const {
    identityProviderCategoryId,
    displayName,
    enabled,
    identityProviderId,
    body,
    menuOptions,
  } = data

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
    e.preventDefault()
    setAnchorEl(null)
  }

  const handleMenuClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    key: string,
    row: DataProp
  ) => {
    onMenuClick(key, row)
    handleClose(e)
  }

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
              onClick={(e) => e.stopPropagation()}
              disableAutoFocusItem
            >
              {menuOptions.map(({ key, label, isDisable, tooltipTitle }) => {
                if (isDisable) {
                  return (
                    <Tooltip arrow title={tooltipTitle ? tooltipTitle : ''}>
                      {/* to fire the action of tooltip need to pass ref to div tag, bcuz tooltip cannot be passed to disable components */}
                      <div>
                        <MenuItem
                          key={key}
                          disabled={isDisable}
                          onClick={(e) => handleMenuClick(e, key, data)}
                        >
                          {label}
                        </MenuItem>
                      </div>
                    </Tooltip>
                  )
                }

                return (
                  <MenuItem
                    key={key}
                    disabled={isDisable}
                    onClick={(e) => handleMenuClick(e, key, data)}
                  >
                    {label}
                  </MenuItem>
                )
              })}
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

export { CardHorizontalTable }
