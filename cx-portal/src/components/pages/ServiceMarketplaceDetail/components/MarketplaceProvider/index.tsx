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
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './MarketplaceProvider.scss'

export default function MarketplaceProvider({
  item,
}: {
  item: ServiceRequest
}) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const tableData: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [[item.provider], [item.website], [item.contactEmail], [item.phone]],
  }

  return (
    <div className="marketplace-provider">
      <div className="marketplace-content">
        <Typography variant="h4">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </div>
      <StaticTable data={tableData} horizontal={true} />
    </div>
  )
}
