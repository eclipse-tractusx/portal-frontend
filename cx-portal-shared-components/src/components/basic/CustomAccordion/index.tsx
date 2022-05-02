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
}

export const CustomAccordion = ({expanded, id, title, children, ...props}: CustomAccordionProps) => {
  return(
    <Accordion expanded={expanded} {...props}>
      <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expandIcon={<ExpandMoreIcon />}>
        <Typography variant="label1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}