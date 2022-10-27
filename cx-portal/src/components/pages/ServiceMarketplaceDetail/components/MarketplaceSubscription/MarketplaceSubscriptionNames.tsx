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

import { Chip, Typography } from 'cx-portal-shared-components'
import {
  SubscriptionData,
  useFetchSubscriptionQuery,
} from 'features/serviceMarketplace/serviceApiSlice'
import './MarketplaceSubscription.scss'

export default function MarketplaceSubscriptionNames({
  subscription,
}: {
  subscription: SubscriptionData
}) {
  const { data } = useFetchSubscriptionQuery(subscription.offerSubscriptionId)

  return (
    <div className="subscription-list">
      {data && (
        <span className="subscription-name">
          <Typography variant="body2">{data.offerName}</Typography>
          <Chip
            color={data.status === 'ACTIVE' ? 'success' : 'info'}
            label={data.status}
            type="plain"
            variant="outlined"
            size="small"
            withIcon
            className="subscription-status"
          />
        </span>
      )}
    </div>
  )
}
