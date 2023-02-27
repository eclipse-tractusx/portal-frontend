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

import { useState, useRef } from 'react'
import { Box, useTheme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { LogoGrayData } from '../../basic/Logo'
import { Typography } from '../../basic/Typography'
import { CardChipProps } from './CardChip'

interface CardHorizontalProps extends CardChipProps {
  label: string
  title: string
  subTitle?: string
  borderRadius: number
  imagePath: string
  imageAlt: string
  description?: string
  backgroundColor?: string
  buttonText?: string
  onBtnClick?: React.MouseEventHandler
  expandOnHover?: boolean
}

export const CardHorizontal = ({
  label,
  title,
  subTitle,
  borderRadius = 0,
  imagePath,
  imageAlt,
  description,
  status,
  statusText,
  buttonText,
  onBtnClick,
  backgroundColor,
  expandOnHover = false,
}: CardHorizontalProps) => {
  const theme = useTheme()
  const boxRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={boxRef}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor || 'common.white',
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        ':hover': {
          boxShadow: theme.shadows['20'],
        },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box
        sx={{
          flex: '0 0 33.333333%',
          maxWidth: '33.333333%',
          minHeight: '200px',
          backgroundImage: `url(${imagePath || LogoGrayData})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: theme.palette.accent.accent02,
        }}
      />
      <Box
        sx={{
          flex: 1,
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="caption3"
          sx={{
            fontWeight: '600',
            lineHeight: '20px',
            height: '18px',
            color: theme.palette.text.tertiary,
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            margin: '5px 0 0 0',
            fontWeight: 600,
            lineHeight: '23px',
            color: '#111111',
            height: '46px',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption3"
          sx={{
            fontWeight: '600',
            lineHeight: '20px',
            height: '18px',
            color: theme.palette.text.tertiary,
          }}
        >
          {subTitle}
        </Typography>
        {description && (
          <Typography
            variant="label4"
            sx={{
              color: '#888888',
              fontSize: '12px',
              display: '-webkit-box',
              '-webkit-line-clamp': '3',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              margin: '5px 0 0 0',
              height: '45px',
            }}
          >
            {description}
          </Typography>
        )}

        {buttonText && (
          <div
            style={{
              marginTop: 'auto',
            }}
          >
            <Typography
              variant="label4"
              onClick={onBtnClick}
              sx={{
                color: '#0F71CB',
                fontSize: '14px',
                width: '100%',
                textAlign: 'right',
                marginTop: 'auto',
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
            >
              <KeyboardArrowDownIcon sx={{ marginRight: '5px' }} />
              {buttonText}
            </Typography>
          </div>
        )}
      </Box>
    </Box>
  )
}
