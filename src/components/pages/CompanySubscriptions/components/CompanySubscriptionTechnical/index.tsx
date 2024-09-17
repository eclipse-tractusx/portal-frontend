/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { StaticTable, Typography } from '@catena-x/portal-shared-components'
import { type ActiveSubscriptionDetails } from 'features/apps/types'
import { PAGES, ROLES } from 'types/Constants'
import { userHasPortalRole } from 'services/AccessService'

export default function CompanySubscriptionTechnical({
  detail,
}: Readonly<{
  detail: ActiveSubscriptionDetails
}>) {
  const { t } = useTranslation()

  const tableData = {
    head: [
      t('content.companySubscriptionsDetail.table.connector'),
      t('content.companySubscriptionsDetail.table.technicalUser'),
    ],
    body: [
      [
        !detail.connectorData.length ? '' : detail.connectorData[0].name,
        !detail.technicalUserData.length
          ? ''
          : detail.technicalUserData[0].name,
      ],
    ],
    edit: [
      [
        {
          icon: false,
        },
        {
          icon: false,
          clickableLink:
            userHasPortalRole(ROLES.VIEW_USER_ACCOUNT) &&
            detail.technicalUserData.length
              ? `/${PAGES.USER_DETAILS}/${detail.technicalUserData[0].id}`
              : undefined,
        },
      ],
    ],
  }
  return (
    <Box className="company-subscription-content-section">
      <Typography variant="h3">
        {t('content.companySubscriptionsDetail.technicalUser.heading')}
      </Typography>
      <StaticTable data={tableData} horizontal={false} />
    </Box>
  )
}
