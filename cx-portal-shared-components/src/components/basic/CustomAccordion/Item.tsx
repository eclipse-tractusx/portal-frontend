/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

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
