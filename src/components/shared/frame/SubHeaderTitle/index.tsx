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

import { Typography } from '@catena-x/portal-shared-components'
import type { TypographyProps } from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

interface ComponentProps {
  title: string
  params?: Record<string, string>
}

export default function SubHeaderTitle({
  title,
  params,
  variant = 'body1',
}: ComponentProps & TypographyProps) {
  const { t } = useTranslation()

  return (
    <Typography
      sx={{ fontFamily: 'LibreFranklin-Light' }}
      variant={variant}
      className="section-title"
    >
      {`${t(title, params ?? {})}`}
    </Typography>
  )
}
