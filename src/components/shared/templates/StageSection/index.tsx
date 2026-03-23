/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { MainHeader } from '@arena2036/portal-shared-components-construct-x'
import { getAssetBase } from 'services/EnvironmentService'
import { useMediaQuery, useTheme } from '@mui/material'

export default function SearchSection({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })
  return (
    <div className="stage-home">
      <MainHeader
        title={title}
        subTitle={description}
        subTitleTextVariant="h3"
        headerHeight={551}
        subTitleWidth={isMobile ? '100%' : 800}
        background="LinearGradient1"
        imagePath={`${getAssetBase()}/images/content/company-roles.jpg`}
      />
    </div>
  )
}
