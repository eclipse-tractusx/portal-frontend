import React from 'react'
import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface CustomAccordionProps extends AccordionProps {
  expanded: boolean | undefined
  id: string
  title: string
  children: React.ReactElement
  color?: string
  icon?: React.ReactElement
}

export const CustomAccordionItem = ({
  expanded,
  id,
  title,
  children,
  color,
  icon,
  ...props
}: CustomAccordionProps) => {
  return (
    <Accordion
      expanded={expanded}
      {...props}
      elevation={0}
      sx={{
        mb: 0,
      }}
    >
      <AccordionSummary
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: color,
          ':hover': {
            bgcolor: 'background.background12',
          },
          ':focus': {
            boxShadow: 'none !important',
            bgcolor: 'background.background12',
          },
        }}
      >
        {icon && (
          <Box sx={{ marginRight: '10px', color: 'action.active' }}>{icon}</Box>
        )}
        <Typography variant="label1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ mb: 5, bgcolor: color }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
