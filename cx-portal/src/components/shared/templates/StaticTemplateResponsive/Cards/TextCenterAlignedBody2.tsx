/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { Box } from '@mui/material'
import { Typography, IconButton } from 'cx-portal-shared-components'
import { ProviderProps } from '../StaticTypes'
import '../StaticTemplate.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Trans } from 'react-i18next'

export default function TextCenterAlignedBody2({
  provider,
  scrollTop,
  showScroll,
}: {
  provider: ProviderProps
  scrollTop: () => void
  showScroll: boolean
}) {
  return (
    <Box
      className={'multiTextContainer'}
      sx={{
        textAlign: provider.align || 'left',
        backgroundColor: provider.backgroundColor || '#ffffff',
      }}
    >
      <Box>
        {provider.title && (
          <div className="titleWithIcon">
            <Typography variant="h2">{provider.title}</Typography>
            {showScroll && (
              <IconButton onClick={scrollTop}>
                <ArrowUpwardIcon />
              </IconButton>
            )}
          </div>
        )}
        {provider.subTitles &&
          provider.subTitles.map((subtitle) => (
            <Trans
              key={subtitle}
              i18nKey={subtitle}
              components={[
                <span key={subtitle} className="tooltiptext"></span>,
              ]}
            ></Trans>
          ))}
      </Box>
    </Box>
  )
}
