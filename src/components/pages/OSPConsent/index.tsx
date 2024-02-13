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

import { StaticTable, type TableType, Typography } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import './style.scss'
import { useFetchApplicationsQuery } from 'features/registration/registrationApiSlice'

export const OSPConsent = () => {
  const { t } = useTranslation()

  const { data, isLoading } = useFetchApplicationsQuery()
  const applicationData = data?.[0]

  // if(applicationData) {
  //   const {data: companyDetails} = 
  // }

  const tableData: TableType = {
    head: [t('content.osp.companyName'), t('content.osp.bmw')],
    body: [
      [
        t('content.osp.street'),
        'test',
      ],
      [
        t('content.osp.zip'),
        'qwe',
      ],
      [
        t('content.osp.city'),
        'n/a',
      ],
      [
        t('content.osp.region'),
        'erer',
      ],
      [
        t('content.osp.country'),
        'erer',
      ],
    ]
  }

  return (
    <div className="ospMain">
      <div className="mainContainer">
        <Typography className="heading" variant="h2">
          {t('content.osp.heading')}
        </Typography>
        <Typography variant="h3" className="desc-heading">
          {t('content.osp.descHeading')}
        </Typography>
        <Typography variant="body2" className="desc-message">
          {t('content.osp.descMessage')}
        </Typography>
        <StaticTable data={tableData} horizontal={false} />
      </div>
    </div>
  )
}
