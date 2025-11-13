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
import { Chip, Typography } from '@catena-x/portal-shared-components'
import type { AppDetails } from 'features/apps/details/types'
import './style.scss'

export default function AppDetailSubscription({
  item,
}: Readonly<{
  item: AppDetails
}>) {
  const { t } = useTranslation()

  return (
    <div className="app-marketplace-subscriptions">
      <Typography variant="body2" sx={{ color: '#0d55af' }}>
        <b>
          {t('content.appSubscription.subscriptionHeading').replace(
            '{appName}',
            item.title
          )}
        </b>
      </Typography>
      <div className="subscriptions-content">
        {item.offerSubscriptionDetailData?.map((data) => (
          <div className="subscription-list" key={data.offerSubscriptionId}>
            <span className="subscription-name">
              <Typography variant="label3" className="offerId">
                Id: {data.offerSubscriptionId}
              </Typography>
              <Typography variant="label3">
                {t('global.field.status')}:
                <Chip
                  color={
                    data.offerSubscriptionStatus === 'ACTIVE'
                      ? 'success'
                      : 'info'
                  }
                  label={data.offerSubscriptionStatus}
                  type="plain"
                  variant="outlined"
                  size="small"
                  withIcon
                  className="subscription-status"
                />
              </Typography>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
