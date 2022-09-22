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

import { Box } from '@mui/material'
import { PageNotificationsProps } from '.'

interface NotificationContentProps
  extends Omit<PageNotificationsProps, 'onCloseNotification' | 'open'> {
  titleColor?: string
}

export const NotificationContent = ({
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  titleColor,
}: NotificationContentProps) => {
  return (
    <Box>
      {title && (
        <span
          style={{
            marginRight: '10px',
            color: titleColor,
            width: 'max-content',
            fontWeight: 'bold',
          }}
        >
          {title}
        </span>
      )}
      {description && (
        <span>
          {description}
          {contactText && (
            <a
              style={{ marginLeft: '10px', paddingTop: '3px' }}
              href={contactLinks}
              target={contactNewTab ? '_blank' : ''}
              rel="noreferrer"
            >
              {contactText}
            </a>
          )}
        </span>
      )}
    </Box>
  )
}
