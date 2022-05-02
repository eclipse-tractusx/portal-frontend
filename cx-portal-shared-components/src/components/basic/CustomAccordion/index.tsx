import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionProps {
  expanded: boolean | undefined,
  onChange: () => void,
  id: string,
  title: string,
  children: React.ReactElement[]
}

export const CustomAccordion = ({expanded, onChange, id, title, children}: AccordionProps) => {
  return(
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expandIcon={<ExpandMoreIcon />}>
        <Typography variant="label1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}