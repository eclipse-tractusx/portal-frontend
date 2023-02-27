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

import { Alert, IconButton, Collapse } from '@mui/material'
import {
  CheckCircleOutline,
  WarningAmber,
  InfoOutlined,
  Close,
} from '@mui/icons-material'
import { NotificationContent } from './NotificationContent'
import { theme } from '../../../../theme'

export interface PageNotificationsProps {
  severity?: 'error' | 'warning' | 'info' | 'success'
  open: boolean
  onCloseNotification?: () => void
  title?: string
  description?: string
  contactText?: string
  contactLinks?: string
  contactNewTab?: boolean
  showIcon?: boolean
}

export function color(severity: string) {
  switch (severity) {
    case 'info':
      return theme.palette.support.info
    case 'error':
      return theme.palette.support.error
    case 'warning':
      return theme.palette.support.warning
    case 'success':
      return theme.palette.support.success
    default:
      return ''
  }
}

export function titleIcon(severity: string) {
  switch (severity) {
    case 'info':
      return <InfoOutlined fontSize="inherit" sx={{ color: color(severity) }} />
    case 'error':
      return <WarningAmber fontSize="inherit" sx={{ color: color(severity) }} />
    case 'warning':
      return <WarningAmber fontSize="inherit" sx={{ color: color(severity) }} />
    case 'success':
      return (
        <CheckCircleOutline
          fontSize="inherit"
          sx={{ color: color(severity) }}
        />
      )
    default:
      return ''
  }
}

export const PageNotifications = ({
  severity = 'info',
  open,
  onCloseNotification,
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  showIcon,
}: PageNotificationsProps) => {
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        variant="outlined"
        icon={showIcon === false ? false : titleIcon(severity)}
        sx={{
          borderColor: color(severity),
          borderRadius: '8px',
          boxShadow: '0px 20px 40px rgba(80, 80, 80, 0.3)',
        }}
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={onCloseNotification}
            sx={{
              color: theme.palette.icon.icon01,
              marginTop: '5px',
              marginRight: '5px',
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <NotificationContent
          title={title}
          description={description}
          contactText={contactText}
          contactLinks={contactLinks}
          contactNewTab={contactNewTab}
          titleColor={color(severity)}
        />
      </Alert>
    </Collapse>
  )
}
