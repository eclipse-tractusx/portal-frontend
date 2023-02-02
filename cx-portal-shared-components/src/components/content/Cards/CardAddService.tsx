/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { Box, useTheme } from '@mui/material'
import { Typography } from '../../basic/Typography'
import { useState, useEffect, useRef } from 'react'

interface CardAddServiceProps {
  title?: string
  backgroundColor?: string
  onButtonClick: React.MouseEventHandler
}

export const CardAddService = ({
  title,
  backgroundColor,
  onButtonClick,
}: CardAddServiceProps) => {
  const theme = useTheme()
  const { shape, shadows } = theme
  const [boxHeight, setBoxHeight] = useState<number | undefined>()
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBoxHeight(boxRef.current?.getBoundingClientRect().height)
  }, [])

  return (
    <div ref={boxRef} style={{}} onClick={onButtonClick}>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: backgroundColor || 'common.white',
          borderRadius: shape.borderRadius,
          border: '2px dashed',
          borderColor: 'border.border01',
          ':hover': {
            boxShadow: shadows['20'],
          },
          height: boxHeight ? `${boxHeight}px` : '89%',
          minWidth: '260px',
        }}
        className="card"
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              height: '120px',
              width: '120px',
              backgroundColor: theme.palette.accent.accent02,
              borderRadius: '100px',
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM37.5 27.5H27.5V37.5H22.5V27.5H12.5V22.5H22.5V12.5H27.5V22.5H37.5V27.5Z"
                fill="#0F71CB"
              />
            </svg>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                display: 'box',
                lineClamp: '2',
                boxOrient: 'vertical',
                paddingTop: '20px',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
