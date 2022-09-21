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

import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import './AppDetailPrivacy.scss'

export default function AppDetailPrivacy() {
  const { t } = useTranslation()

  const tableData: TableType = {
    head: ['Linked to your identity', 'Linked NOT to your identity'],
    body: [
      ['Personal Information', 'Lorem Personal Information'],
      ['Used Content', 'Ipsum Used Content'],
      ['Catena X Account Data', 'Lorem Catena X Account Data'],
      ['Diagnostic Data', ''],
    ],
  }

  return (
    <div className="appdetail-privacy">
      <div className="privacy-content">
        <Typography variant="h4">
          {t('content.appdetail.privacy.heading')}
        </Typography>
        <Typography variant="body2">
          {t('content.appdetail.privacy.message')}
        </Typography>
      </div>
      <div className="privacy-table">
        <StaticTable data={tableData} horizontal={false} />
      </div>
    </div>
  )
}
