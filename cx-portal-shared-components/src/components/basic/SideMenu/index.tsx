/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { Box, BoxProps, Collapse, Fade } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export interface SideMenuProps extends Omit<BoxProps, 'onChange'> {
  header?: string | JSX.Element
  subHeader?: string | JSX.Element
  buttonTextCollapsed: string
  buttonTextExpanded: string
  isExpanded?: boolean
  onChange?: (isExpanded: boolean) => void
  children: React.ReactElement
}

export const SideMenu = ({
  header,
  subHeader,
  buttonTextCollapsed,
  buttonTextExpanded,
  isExpanded,
  onChange,
  children,
  ...props
}: SideMenuProps) => {
  const [expanded, setExpanded] = useState(isExpanded)

  useEffect(() => setExpanded(isExpanded), [isExpanded])

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded)
    onChange?.(!expanded)
  }, [expanded, onChange])

  return (
    <Box
      {...props}
      sx={{
        width: '300px',
        boxSizing: 'border-box',
        paddingY: 4,
        paddingLeft: 6.5,
        paddingRight: 5.5,
        backgroundColor: 'common.white',
        boxShadow: '0px 1px 4px 0px rgba(140, 140, 140, 0.2)',
        ...props?.sx,
      }}
    >
      {header && (
        <Box sx={{ typography: 'label3', fontWeight: 600, marginBottom: 1.5 }}>
          {header}
        </Box>
      )}
      {subHeader && (
        <Box
          sx={{
            typography: 'label3',
            color: 'text.tertiary',
            fontWeight: 600,
            marginBottom: 1.5,
          }}
        >
          {subHeader}
        </Box>
      )}
      <Box>
        <Fade in={expanded}>
          <Box>
            <Collapse in={expanded} collapsedSize={0}>
              <Box
                sx={{
                  paddingTop: 2,
                  paddingBottom: 4,
                }}
              >
                {children}
              </Box>
            </Collapse>
          </Box>
        </Fade>
      </Box>
      <Box>
        <Button
          onClick={toggleExpanded}
          variant={expanded ? 'outlined' : 'contained'}
          size="small"
          endIcon={expanded ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          sx={{
            '&:focus': {
              boxShadow: 'none',
            },
          }}
        >
          {expanded ? buttonTextExpanded : buttonTextCollapsed}
        </Button>
      </Box>
    </Box>
  )
}
