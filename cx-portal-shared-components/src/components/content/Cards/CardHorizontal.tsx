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

import { Box, Grid, useTheme } from '@mui/material'
import { LogoGrayData } from '../../basic/Logo'
import { Button } from '../../basic/Button'
import { Typography } from '../../basic/Typography'
import { CardChip, CardChipProps } from './CardChip'

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
}: CardHorizontalProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || 'common.white',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        width: '100%',
        borderRadius: `${borderRadius}px`,
        ':hover': {
          boxShadow: theme.shadows['20'],
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '0 0 33.333333%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          width: '160px',
          height: 'auto',
          maxWidth: '33.333333%',
          background: theme.palette.accent.accent02,
          borderRadius: `${borderRadius}px`,
          objectFit: 'contain',
        }}
        component="img"
        src={imagePath || LogoGrayData}
        alt={imageAlt}
      />
      <Box
        sx={{
          width: 'auto',
          height: 'auto',
          margin: '0',
          padding: '15px',
          flex: '1',
        }}
      >
        <Typography
          variant="caption2"
          sx={{
            color: theme.palette.text.tertiary,
            fontWeight: '600',
            height: '24px',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            display: 'box',
            lineClamp: '2',
            boxOrient: 'vertical',
            height: '36px',
            marginBottom: '17px',
            marginTop: '9px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption2"
          sx={{
            color: theme.palette.text.tertiary,
            fontWeight: '600',
            height: '24px',
          }}
        >
          {description}
        </Typography>
        <Grid container>
          {statusText && (
            <Grid xs={4}>
              <Box
                sx={{
                  marginTop: '21px',
                }}
              >
                <CardChip status={status} statusText={statusText} />
              </Box>
            </Grid>
          )}
          {buttonText && (
            <Button
              size="small"
              onClick={onBtnClick}
              sx={{
                marginLeft: 'auto',
              }}
            >
              {buttonText}
            </Button>
          )}
        </Grid>
      </Box>
    </Box>
  )
}
