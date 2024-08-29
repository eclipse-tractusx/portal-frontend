/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { Typography } from '@catena-x/portal-shared-components'
import { type MainHeaderProps } from '../MainHeader'

export const MainHeaderTitle = ({
  title,
  subTitle,
  subTitleWidth,
  titleTextVariant = 'h1',
  subTitleTextVariant = 'h2',
}: MainHeaderProps) => {
  return (
    <>
      {title && (
        <Typography className="cx-main-header__heading"
          sx={{
            fontWeight: 600,
          }}
          variant={titleTextVariant}
        >
          {title}
        </Typography>
      )}

      {subTitle && (
        <Typography className="cx-main-header__subheading"
          sx={{
            width: `${subTitleWidth}px`,
          }}
          variant={subTitleTextVariant}
        >
          {subTitle}
        </Typography>
      )}
    </>
  )
}
