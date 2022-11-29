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

import { Box, useTheme } from '@mui/material'
import { LogoGrayData } from '../../basic/Logo'
import { Button } from '../../basic/Button'
import { Typography } from '../../basic/Typography'
import { CardChip, CardChipProps } from './CardChip'
import { useState, useEffect, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface CardHorizontalProps extends CardChipProps {
  label: string
  title: string
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
  const [variant, setVariant] = useState('preview')
  const [boxHeight, setBoxHeight] = useState<number | undefined>()
  const boxRef = useRef<HTMLDivElement>(null)

  const onMouseEnter = () => {
    if (expandOnHover) setVariant('expanded')
  }

  useEffect(() => {
    setBoxHeight(boxRef.current?.getBoundingClientRect().height)
  }, [variant])

  const onMouseLeave = () => setVariant('preview')

  return (
    <Box
      ref={boxRef}
      sx={{
        //display: '-ms-flexbox',
        display: 'flex',
        //-ms-flex-wrap: 'wrap',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        borderRadius: '4px',
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
          //-ms-flex: 0 0 33.333333%;
          flex: '0 0 33.333333%',
          maxWidth: '33.333333%',
          minHeight: '200px',
          backgroundImage: `url(${imagePath || LogoGrayData})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#fff',
        }}
      />
      <Box
        sx={{
          //-webkit-box-flex: 1;
          //-ms-flex: 1;
          flex: 1,
          padding: '30px',
        }}
      >
        <Typography
          variant="caption3"
          sx={{
            fontWeight: '600',
            lineHeight: '20px',
            color: '#888888',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            margin: 0,
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '28px',
            color: '#111111',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption3"
          sx={{
            color: '#252525',
            lineHeight: '20px',
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption2"
            sx={{
              color: '#888888',
              fontSize: '12px',
            }}
          >
            {variant === 'preview'
              ? `${description.substring(0, 35)}...`
              : description}
          </Typography>
        )}

        {buttonText && (
          <>
            {/* <svg data-testid="KeyboardArrowDownIcon"></svg> */}
            <Typography
              variant="label4"
              onClick={onBtnClick}
              sx={{
                color: '#0F71CB',
                fontSize: '14px',
                display: 'inline-block',
                width: '100%',
                textAlign: 'right',
                marginTop: 'auto',
                paddingTop: '20px',
              }}
            >
              {buttonText}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
