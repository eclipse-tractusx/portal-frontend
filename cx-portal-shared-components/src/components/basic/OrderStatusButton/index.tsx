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
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { Button, ButtonProps } from '../Button'
import { Typography } from '../Typography'

interface ButtonInputData {
  isIcon: boolean
  buttonLabel: string
  zIndex: number
  backgroundColor: string
}

interface OrderStatusButtonProps extends ButtonProps {
  label: string
  buttonData: ButtonInputData[]
  selectable?: boolean
  onButtonClick?: React.MouseEventHandler
}

export const OrderStatusButton = ({
  label,
  color,
  buttonData,
  selectable,
  onButtonClick,
  ...props
}: OrderStatusButtonProps) => {
  const theme = useTheme()

  const handleClick = (e: any) => {
    onButtonClick && onButtonClick(e)
  }

  const fetchButton = (
    zIndex: number,
    numberLabel: number,
    isIcon: boolean,
    buttonLabel: string,
    background: string
  ) => {
    return (
      <Button
        sx={{
          width: '97%',
          position: 'relative',
          zIndex: zIndex,
          paddingLeft: '74px',
          marginLeft: '-50px',
          color: '#2a2a2a',
          background: background,
          height: '55px',
          textAlign: 'left',
          cursor: 'default',
          ':hover': {
            background: background,
          },
          ':focus': {
            boxShadow: 'none',
          },
        }}
        {...props}
      >
        {isIcon ? (
          <CheckCircleOutlinedIcon
            sx={{ color: '#0a5', fontSize: '20px', marginRight: '5px' }}
          />
        ) : (
          <Typography
            variant="label5"
            sx={{
              background: '#a2a2a2',
              color: '#fff',
              borderRadius: '20px',
              height: '18px',
              width: '18px',
              minHeight: '18px',
              minWidth: '18px',
              lineHeight: '18px',
              marginRight: '10px',
              textAlign: 'center',
            }}
          >
            {numberLabel}
          </Typography>
        )}
        <Typography variant="label4">{buttonLabel}</Typography>
      </Button>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Button
        color={color}
        onClick={handleClick}
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: '5',
          cursor: selectable ? 'pointer' : 'default',
          ':hover': {
            background: selectable ? color : color && theme.palette[color].main,
            boxShadow: selectable ? '' : 'none',
          },
          ':active': {
            boxShadow: selectable ? '' : 'none',
          },
        }}
        {...props}
      >
        {label}
      </Button>
      {buttonData.map((data: ButtonInputData, index: number) => {
        return fetchButton(
          data.zIndex,
          index + 1,
          data.isIcon,
          data.buttonLabel,
          data.backgroundColor
        )
      })}
    </Box>
  )
}
