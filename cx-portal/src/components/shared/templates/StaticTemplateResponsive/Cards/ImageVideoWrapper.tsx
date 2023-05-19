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

import { IconButton, Typography } from 'cx-portal-shared-components'
import { ReactElement } from 'react'
import { ProviderProps } from '../StaticTypes'
import '../StaticTemplate.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Trans } from 'react-i18next'

export default function ImageVideoWrapper({
  provider,
  children,
  scrollTop,
  showScroll,
}: {
  provider: ProviderProps
  children: ReactElement
  scrollTop: () => void
  showScroll: boolean
}) {
  return (
    <div className={'imageVideoTextSideBySide'}>
      <div className={'titleDescriptionBody'}>
        <div className="titleWithIcon sideBySideTitle">
          <Typography variant="h2">{provider.title}</Typography>
          {showScroll && (
            <IconButton onClick={scrollTop}>
              <ArrowUpwardIcon />
            </IconButton>
          )}
        </div>
        <Trans>
          <Typography className={'providerDescription'} variant="body1">
            {provider.description}
          </Typography>
        </Trans>
      </div>
      {children}
    </div>
  )
}
