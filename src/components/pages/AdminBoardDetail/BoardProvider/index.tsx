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

import { useTranslation } from 'react-i18next'
import {
  Typography,
  StaticTable,
  type TableType,
} from '@catena-x/portal-shared-components'
import type { AppDetails } from 'features/apps/types'
import './style.scss'
import { Box } from '@mui/material'

export default function BoardProvider({
  item,
}: Readonly<{ item: AppDetails }>) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.adminboardDetail.providerInformation',
  })

  const boardProviderDetails: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [
      [item.provider],
      [item.providerUri === 'ERROR' ? '' : item.providerUri],
      [item.contactEmail],
      [item.contactNumber],
    ],
  }

  return (
    <div className="adminboard-provider">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </Box>
      <StaticTable data={boardProviderDetails} horizontal={true} />
    </div>
  )
}
