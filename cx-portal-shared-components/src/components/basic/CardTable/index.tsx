import * as React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'

import Accordion, {
  StyledAccordianDetails,
  StyledAccordianSummary,
  StyledAccordianButton,
} from './CardTable'

interface CustomAccordianProps {
  hover?: boolean
  row: any[]
}

export function CardTable({ hover = false, row }: CustomAccordianProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleMoreOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
  }

  return (
    <>
      {row.map(({ title, title2, isActive, body }) => {
        return (
          <Accordion
            expanded={expanded === title}
            onChange={handleChange(title)}
          >
            <StyledAccordianSummary
              expanded={expanded === title}
              hover={hover}
              expandIcon={
                <IconButton onClick={handleMoreOptionClick}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <Typography width="25%" textAlign="start">
                {title}
              </Typography>
              <Typography width="25%" textAlign="start">
                {title2}
              </Typography>
              <StyledAccordianButton
                disableElevation
                variant="contained"
                size="small"
              >
                {isActive ? 'ENABLED' : 'DISABLED'}
              </StyledAccordianButton>
            </StyledAccordianSummary>
            <StyledAccordianDetails>
              <Box p={1} display="flex" justifyContent="space-between">
                <Typography variant="h5">IDP Details</Typography>
                <IconButton onClick={(e) => setExpanded(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {body}
            </StyledAccordianDetails>
          </Accordion>
        )
      })}
    </>
  )
}
