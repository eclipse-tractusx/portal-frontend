/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { useState } from 'react'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { theme } from '../../../theme'

interface TooltipsProps {
  children: any
  tooltipText: string
  tooltipPlacement?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
  tooltipArrow?: boolean
  arrowColor?: string
  backgroundColor?: string
  textColor?: string
  additionalStyles?: any
}

export const Tooltips = ({
  children, // Element to hover
  backgroundColor, //Tooltip container background color
  tooltipPlacement = 'bottom', // TooltipPosition & ArrowPostion ex - <top-start>
  tooltipArrow = true, // Show/Hide arrow
  tooltipText, // Tooltip text
  arrowColor, // Tooltip arrow icon color
  textColor, // Tooltip text color
  additionalStyles, //additionalStyles to the tooltip container. ex - height, width, align
}: TooltipsProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }}>
      {props.children}
    </Tooltip>
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: arrowColor || theme.palette.background.background14,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: backgroundColor || theme.palette.background.background14,
      color: textColor || theme.palette.common.white,
      padding: 15,
      maxWidth: 300,
      fontSize: '14px',
      lineHeight: '20px',
      ...additionalStyles,
    },
  }))

  return (
    <>
      <CustomTooltip
        title={tooltipText}
        placement={tooltipPlacement}
        arrow={tooltipArrow}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        children={children}
      />
    </>
  )
}
