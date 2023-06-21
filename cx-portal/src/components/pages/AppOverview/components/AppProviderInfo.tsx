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

import { useTranslation } from 'react-i18next'
import {
  Typography,
  StaticTable,
  TableType,
} from '@catena-x/portal-shared-components'
import { AppStatusDataState } from 'features/appManagement/types'

export default function AppProviderInfo({
  item,
}: {
  item: AppStatusDataState
}) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const tableData: TableType = {
    head: [t('appProvider'), t('email'), t('phone')],
    body: [
      [item.provider || ''],
      [item.contactEmail],
      [item.contactNumber || ''],
    ],
  }

  return (
    <div>
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <Typography variant="h5" align="left">
          {t('heading')}
        </Typography>
        <Typography variant="body2" align="left">
          {t('message')}
        </Typography>
      </div>
      {item && <StaticTable data={tableData} horizontal={true} />}
    </div>
  )
}
