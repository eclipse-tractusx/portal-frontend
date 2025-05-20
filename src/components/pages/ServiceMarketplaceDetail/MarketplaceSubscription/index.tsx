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
import type { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'
import { OfferSubscriptionStatus } from 'features/serviceSubscription/serviceSubscriptionApiSlice'

export default function MarketplaceSubscription({
  item,
}: Readonly<{
  item: ServiceRequest
}>) {
  const { t } = useTranslation()

  const renderStatusColor = (status: string) => {
    switch (status) {
      case OfferSubscriptionStatus.ACTIVE:
        return 'success'
      case OfferSubscriptionStatus.INACTIVE:
        return 'error'
      case OfferSubscriptionStatus.PENDING:
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <div className="marketplace-subscriptions">
      <Typography
        className="marketplace-subscriptions__heading--short"
        variant="body2"
        sx={{ color: '#0d55af' }}
      >
        <b>
          {t('content.serviceMarketplace.subscriptionHeading').replace(
            '{serviceName}',
            item.title
          )}
        </b>
      </Typography>
      <div className="subscriptions-content">
        {item.offerSubscriptionDetailData.map((data) => (
          <div className="subscription-list" key={data.offerSubscriptionId}>
            <span className="subscription-name">
              <Typography variant="label3" className="offerId">
                Id: {data.offerSubscriptionId}
              </Typography>
              <Typography variant="label3">
                {t('global.field.status')}:
                <Chip
                  color={renderStatusColor(data.offerSubscriptionStatus)}
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
