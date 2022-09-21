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
import { Typography } from '../../Typography'
import { PageNotificationsProps } from '../PageNotification'

interface SnackbarContentProps
  extends Omit<PageNotificationsProps, 'onCloseNotification' | 'open'> {
  children?: React.ReactNode
  titleColor?: string
}

export const SnackbarContent = ({
  children,
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  showIcon,
  titleColor,
}: SnackbarContentProps) => {
  const descriptionPadding = showIcon ? '20px' : '0px'
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{ paddingRight: '12px', marginLeft: '-12px', fontSize: '22px' }}
        >
          {children}
        </Box>
        {title && (
          <Typography
            variant="h5"
            sx={{
              marginRight: '10px',
              color: titleColor,
              width: 'max-content',
            }}
          >
            {title}
          </Typography>
        )}
      </Box>
      <Box sx={{ paddingLeft: descriptionPadding }}>
        {description && (
          <Typography variant="body1">
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
          </Typography>
        )}
      </Box>
    </Box>
  )
}
