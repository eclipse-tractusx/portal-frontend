/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
} from '@nidhi.garg/portal-shared-components'
import type { AppDetails } from 'features/apps/apiSlice'
import './BoardConnectedData.scss'

export default function BoardConnectedData({ item }: { item: AppDetails }) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.adminboardDetail.connectedData',
  })

  const tableData1: TableType = {
    head: [t('linked'), t('notLinked')],
    body: [
      ['Personal Information', 'Lorem Personal Information'],
      ['Used Content', 'Ipsum Used Content'],
      ['Catena X Account Data', 'Lorem Catena X Account Data'],
      ['Diagnostic Data'],
    ],
  }

  const tableData2: TableType = {
    head: [t('linked'), t('notLinked')],
    body: [['Usage Data', '--.--']],
  }

  return (
    <div className="board-data">
      <Typography variant="h4">{t('heading')}</Typography>
      <Typography variant="body2" className="data-content">
        {t('message')}
      </Typography>
      <div className="mb-30">
        <StaticTable data={tableData1} horizontal={false} />
      </div>
      <Typography variant="body2" className="data-content">
        {t('message2')}
      </Typography>
      <StaticTable data={tableData2} horizontal={false} />
    </div>
  )
}
