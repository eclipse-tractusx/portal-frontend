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
import { useEffect, useState } from 'react'
import { Button, ButtonProps } from '../Button'
import { Typography } from '../Typography'

interface OrderStatusButtonProps extends ButtonProps {
  label: string
  loadIndicator: string
  loading: boolean
  helperText?: string
  helperTextColor?: 'success' | 'error'
  onButtonClick: React.MouseEventHandler
}

export const OrderStatusButton = ({
  label,
  loadIndicator,
  loading,
  onButtonClick,
  helperText,
  size,
  color,
  helperTextColor,
  ...props
}: OrderStatusButtonProps) => {
  const theme = useTheme()
  const [tagStyle, setTagStyle] = useState({
    padding: '10px 24px',
    fontSize: '18px',
  })

  function handleClick(e: any) {
    onButtonClick(e)
  }

  useEffect(() => {
    switch (size) {
      case 'small':
        setTagStyle({ padding: '10px 18px', fontSize: '14px' })
        break
      case 'medium':
        setTagStyle({ padding: '10px 24px', fontSize: '18px' })
        break
      case 'large':
        setTagStyle({ padding: '10px 28px', fontSize: '18px' })
    }
  }, [size])

  return (
    <Box>
      <Button
        size={size}
        color={color}
        onClick={handleClick}
        sx={{
          width: 'fit-content',
          position: 'relative',
          zIndex: '5',
        }}
        {...props}
      >
        {'Subscribe'}
      </Button>
      <Button
        size={size}
        color={color}
        sx={{
          position: 'relative',
          zIndex: '4',
          paddingLeft: '74px',
          left: '-50px',
          color: '#2a2a2a',
          background: '#e1e1e1',
          width: '18%',
          height: '55px',
          textAlign: 'left',
          ':hover': {
            background: '#e1e1e1',
          },
        }}
        {...props}
      >
        <Typography
          variant="caption3"
          sx={{
            background: '#a2a2a2',
            borderRadius: '20px',
            padding: '10px',
            height: '20px',
            width: '20px',
            marginRight: '5px',
          }}
        >
          1
        </Typography>
        <Typography variant="body3">{'Subscribtion initiated'}</Typography>
      </Button>
      <Button
        size={size}
        color={color}
        sx={{
          position: 'relative',
          zIndex: '3',
          paddingLeft: '74px',
          left: '-100px',
          color: '#2a2a2a',
          background: '#f3f3f3',
          width: '18%',
          height: '55px',
          textAlign: 'left',
          ':hover': {
            background: '#f3f3f3',
          },
        }}
        {...props}
      >
        <Typography
          variant="caption3"
          sx={{
            background: '#a2a2a2',
            borderRadius: '20px',
            padding: '10px',
            height: '20px',
            width: '20px',
            marginRight: '5px',
          }}
        >
          2
        </Typography>
        <Typography variant="body3">{'App Instance deployed'}</Typography>
      </Button>
      <Button
        size={size}
        color={color}
        sx={{
          position: 'relative',
          zIndex: '2',
          paddingLeft: '74px',
          left: '-148px',
          color: '#2a2a2a',
          background: '#f9f9f9',
          width: '18%',
          height: '55px',
          textAlign: 'left',
          ':hover': {
            background: '#f9f9f9',
          },
        }}
        {...props}
      >
        {/* <Typography
          variant='caption3'
          sx={{
            background: '#a2a2a2',
            borderRadius: '20px',
            padding: '10px',
            height: '20px',
            width: '20px',
            marginRight: '5px'
          }}
        >
          3
        </Typography> */}
        <CheckCircleOutlinedIcon />
        <Typography variant="body3">
          {'Activation, Notifications & credentials'}
        </Typography>
      </Button>
    </Box>
  )
}
