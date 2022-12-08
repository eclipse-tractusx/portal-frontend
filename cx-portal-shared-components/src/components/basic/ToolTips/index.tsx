/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import Tooltip from '@mui/material/Tooltip'

interface TooltipsProps {
  children: any
  tooltipText: string
  color?: 'light' | 'dark'
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
  additionalStyles?: any
}

export const Tooltips = ({
  children, // Element to hover
  tooltipPlacement = 'bottom', // TooltipPosition & ArrowPostion ex - <top-start>
  tooltipArrow = true, // Show/Hide arrow
  tooltipText, // Tooltip text
  color = 'dark',
  additionalStyles, //additionalStyles to the tooltip container. ex - height, width, align
}: TooltipsProps) => {
  const backgroundColor =
    color === 'dark' ? 'background.background14' : 'grey.100'

  return (
    <Tooltip
      title={tooltipText}
      placement={tooltipPlacement}
      arrow={tooltipArrow}
      componentsProps={{
        tooltip: {
          sx: {
            color: color === 'dark' ? 'common.white' : 'text.primary',
            backgroundColor: backgroundColor,
            padding: '15px',
            maxWidth: '300px',
            fontSize: '14px',
            lineHeight: '20px',
            ...additionalStyles,
          },
        },
        arrow: {
          sx: {
            color: backgroundColor,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  )
}
