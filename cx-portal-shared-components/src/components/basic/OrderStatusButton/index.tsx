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

import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { Button, ButtonProps } from '../Button'
import { Typography } from '../Typography'

interface OrderStatusButtonProps extends ButtonProps {
  status: 'INACTIVE' | 'ACTIVE' | 'PENDING'
  label: string
  onButtonClick?: React.MouseEventHandler
}

interface ButtonStyleType {
  color: ButtonProps['color']
  background1: string
  background2: string
  background3: string
}

export const OrderStatusButton = ({
  status,
  label,
  onButtonClick,
  color,
  ...props
}: OrderStatusButtonProps) => {
  const [buttonStyle, setButtonStyle] = useState<ButtonStyleType>({
    color: 'primary',
    background1: '#e1e1e1',
    background2: '#e1e1e1',
    background3: '#f9f9f9',
  })

  const handleClick = (e: any) => {
    onButtonClick && onButtonClick(e)
  }

  useEffect(() => {
    switch (status) {
      case 'INACTIVE':
        setButtonStyle({
          color: color,
          background1: '#e1e1e1',
          background2: '#f3f3f3',
          background3: '#f9f9f9',
        })
        break
      case 'ACTIVE':
        setButtonStyle({
          color: 'success',
          background1: '#f5f9ee',
          background2: '#f5f9ee',
          background3: '#f5f9ee',
        })
        break
      case 'PENDING':
        setButtonStyle({
          color: 'warning',
          background1: '#f5f9ee',
          background2: '#f3f3f3',
          background3: '#f9f9f9',
        })
        break
      default:
        setButtonStyle({
          color: 'primary',
          background1: '#e1e1e1',
          background2: '#f3f3f3',
          background3: '#f9f9f9',
        })
    }
  }, [status])

  const fetchButton = (
    zIndex: number,
    background: string,
    statusCondition: boolean,
    ButtonDetail: { numberLabel: number; buttonLabel: string }
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
          ':hover': {
            background: background,
          },
          ':focus': {
            boxShadow: 'none',
          },
        }}
        {...props}
      >
        {statusCondition ? (
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
            {ButtonDetail.numberLabel}
          </Typography>
        ) : (
          <CheckCircleOutlinedIcon
            sx={{ color: '#0a5', fontSize: '20px', marginRight: '5px' }}
          />
        )}
        <Typography variant="label4">{ButtonDetail.buttonLabel}</Typography>
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
        color={buttonStyle.color}
        onClick={handleClick}
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: '5',
        }}
        {...props}
      >
        {label}
      </Button>
      {fetchButton(4, buttonStyle.background1, status === 'INACTIVE', {
        numberLabel: 1,
        buttonLabel: 'Subscribtion initiated',
      })}
      {fetchButton(3, buttonStyle.background2, status !== 'ACTIVE', {
        numberLabel: 2,
        buttonLabel: 'App Instance deployed',
      })}
      {fetchButton(2, buttonStyle.background2, status !== 'ACTIVE', {
        numberLabel: 3,
        buttonLabel: 'Activation, Notifications & credentials',
      })}
      {/* <Button
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: '3',
          paddingLeft: '74px',
          marginLeft: '-50px',
          color: '#2a2a2a',
          background: buttonStyle.background2,
          height: '55px',
          textAlign: 'left',
          ':hover': {
            background: buttonStyle.background2,
          },
          ':focus' :{
            boxShadow: 'none'
          }
        }}
        {...props}
      >
        {
          status !== 'ACTIVE' ?
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
                textAlign: 'center'
              }}
            >
              2
            </Typography>
          :
          <CheckCircleOutlinedIcon sx={{ color: '#0a5', fontSize: '20px', marginRight: '5px' }}/>
        }
        <Typography variant="label4">{'App Instance deployed'}</Typography>
      </Button>
      <Button
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: '2',
          paddingLeft: '74px',
          marginLeft: '-50px',
          color: '#2a2a2a',
          background: buttonStyle.background3,
          height: '55px',
          textAlign: 'left',
          ':hover': {
            background: buttonStyle.background3,
          },
          ':focus' :{
            boxShadow: 'none'
          }
        }}
        {...props}
      >
         {
          status !== 'ACTIVE' ?
            <Typography
              variant='label5'
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
                textAlign: 'center'
              }}
            >
              3
            </Typography>
          :
          <CheckCircleOutlinedIcon sx={{ color: '#0a5', fontSize: '20px', marginRight: '5px' }}/>
        }
        <Typography variant="label4">
          {'Activation, Notifications & credentials'}
        </Typography>
      </Button> */}
    </Box>
  )
}
