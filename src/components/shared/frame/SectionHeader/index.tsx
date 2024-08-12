/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import './SectionHeader.scss'
import { Typography } from '@catena-x/portal-shared-components'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { MainHeader } from 'components/shared/cfx/MainHeader'

export interface SectionHeaderProps {
  title?: string
  subTitle?: string
  description?: string
  linkText?: string
  link?: string
}

export const SectionHeader = ({
  title,
  subTitle,
  description,
  linkText,
  link,
}: SectionHeaderProps) => {
  return (
    <>
      <MainHeader
        title={title}
        subTitle={subTitle}
        headerHeight={250}
        subTitleWidth={750}
      />

      <Box className="mainWrapper">
        <Box>
          {description && (
            <Typography variant="body1">{description}</Typography>
          )}
          {linkText && (
            <Box className="linkText">
              <HelpOutlineIcon sx={{ color: '#0f71cb' }} fontSize={'small'} />
              <Typography
                onClick={() => window.open(link, '_blank', 'noopener')}
                variant="body1"
              >
                {linkText}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}
