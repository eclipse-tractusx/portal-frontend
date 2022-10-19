import React from 'react'

import MuiAccordian, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'

interface CustomAccordianSummaryProp extends AccordionSummaryProps {
  hover?: boolean
  expanded?: boolean
}

const StledAccordion = styled((props: AccordionProps) => (
  <MuiAccordian elevation={0} disableGutters {...props} />
))(({ theme }) => ({
  backgroundColor: 'transparent',

  '&:not(:last-child)': {
    marginBottom: '5px',
  },

  '&:before': {
    display: 'none',
  },

  '.MuiAccordion-region': {
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
}))

const StyledAccordianDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  marginTop: '20px',
  marginBottom: '20px',
  borderRadius: '10px',
  backgroundColor: 'transparent',
}))

const StyledAccordianSummary = styled(
  MuiAccordionSummary
)<CustomAccordianSummaryProp>(({ theme, hover = false, expanded }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '5px',
  margin: '0px',
  backgroundColor: expanded && hover ? '#bec7d7' : '#fff',
  boxShadow: expanded && hover ? '0px 0px 5px 0px rgba(0,0,0,0.85)' : 'none',

  '.MuiAccordionSummary-content': {
    justifyContent: 'space-between',
  },

  '.MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'none',
  },

  '.MuiAccordionSummary-expandIconWrapper': {
    backgroundColor: '#eaf0fd',
    borderRadius: '50%',
    color: '#7ca7d5',
    marginLeft: '50px',
    marginRight: '50px',
  },
}))

const StyledAccordianButton = styled(MuiButton)(({ theme }) => ({
  margin: '0px',
  padding: '0px 20px 0px 20px',
  backgroundColor: '#e3e7ee',
  color: 'black',
  borderRadius: '1px',
  textTransform: 'uppercase',

  '&:hover': {
    background: '#e3e7ee',
  },
}))

export { StyledAccordianDetails, StyledAccordianSummary, StyledAccordianButton }
export default StledAccordion
