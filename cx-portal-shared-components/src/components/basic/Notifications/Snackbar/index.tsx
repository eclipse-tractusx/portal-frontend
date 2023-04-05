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

import { Box, IconButton, Slide } from '@mui/material'
import { Close } from '@mui/icons-material'
import { SlideProps } from '@mui/material/Slide/Slide'
import { useCallback, useEffect, useRef, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import CheckIcon from '@mui/icons-material/Check'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const AUTO_CLOSE_DELAY_MS = 3000

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="left" />
)

export interface PageSnackbarProps {
  severity?: 'error' | 'success'
  open: boolean
  onCloseNotification?: () => void
  title?: string | JSX.Element
  description?: string | JSX.Element
  showIcon?: boolean
  autoClose?: boolean
}

export const PageSnackbar = ({
  severity = 'success',
  onCloseNotification,
  open,
  autoClose,
  title,
  description,
  showIcon = true,
  ...props
}: PageSnackbarProps) => {
  const [isOpen, setOpen] = useState(open)

  const autoCloseTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => setOpen(open), [open])

  const cancelAutoClose = useCallback(
    () => clearTimeout(autoCloseTimeoutRef.current!),
    []
  )

  const doClose = useCallback(() => {
    cancelAutoClose()
    setOpen(false)

    onCloseNotification?.()
  }, [cancelAutoClose, onCloseNotification])

  const handleAutoClose = useCallback(() => {
    cancelAutoClose()

    if (autoClose) {
      autoCloseTimeoutRef.current = setTimeout(doClose, AUTO_CLOSE_DELAY_MS)
    }
  }, [autoClose, cancelAutoClose, doClose])

  useEffect(handleAutoClose, [autoClose, handleAutoClose])

  const renderIcon = () => {
    switch (severity) {
      case 'success':
        return <CheckIcon sx={{ color: 'support.success' }} />
      case 'error':
        return <ErrorOutlineIcon sx={{ color: 'support.error' }} />
    }
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      key={'bottom right'}
      TransitionComponent={SlideTransition}
      {...props}
      onMouseEnter={cancelAutoClose}
      onMouseLeave={handleAutoClose}
      message={
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
          {showIcon && (
            <Box
              sx={{
                flex: '0 0 auto',
                marginRight: 2,
                marginTop: '2px',
                marginBottom: '-2px',
              }}
            >
              {renderIcon()}
            </Box>
          )}
          <Box sx={{ flex: '1 1 auto', alignSelf: 'center' }}>
            {title && (
              <Box
                component="span"
                sx={{ marginRight: 0.5, fontWeight: 'bold' }}
              >
                {title}
              </Box>
            )}
            {description}
          </Box>
          <Box
            sx={{
              flex: '0 0 auto',
              marginLeft: 1.5,
              marginTop: '2px',
              marginRight: '-3px',
            }}
          >
            <IconButton size="small" aria-label="close" onClick={doClose}>
              <Close fontSize="small" sx={{ color: 'text.primary' }} />
            </IconButton>
          </Box>
        </Box>
      }
      sx={{
        '.MuiSnackbarContent-root': {
          width: '390px',
          typography: 'body3',
          backgroundColor: 'common.white',
          color: 'text.primary',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'action.disabledBackground',
          borderRadius: '8px',
          boxShadow: '0px 10px 20px 0px rgba(80, 80, 80, 0.3)',
        },
        '.MuiSnackbarContent-message': {
          width: '100%',
        },
      }}
    />
  )
}
