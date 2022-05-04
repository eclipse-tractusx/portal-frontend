import React from "react";
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface CustomAccordionProps extends AccordionProps {
  expanded: boolean | undefined,
  id: string,
  title: string,
  children: React.ReactElement,
  color?: string
}

export const CustomAccordion = ({expanded, id, title, children, color, ...props}: CustomAccordionProps) => {
  return(
    <Accordion expanded={expanded} {...props} sx={{mb: 0}} elevation={0}>
      <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expandIcon={<ExpandMoreIcon />} sx={{bgcolor: color}}>
        <Typography variant="label1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{mb: 5, bgcolor: color}}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}