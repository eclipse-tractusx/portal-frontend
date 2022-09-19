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

import {
  SubscriptionData,
  useFetchSubscriptionQuery,
} from 'features/serviceMarketplace/serviceApiSlice'
import './MarketplaceSubscription.scss'

export default function MarketplaceSubscriptionNames({
  subscription,
  index,
}: {
  subscription: SubscriptionData
  index: number
}) {
  const { data } = useFetchSubscriptionQuery(subscription.offerSubscriptionId)

  return (
    <li key={index}>
      <span className="subscription-name">
        {data &&
          data.offerName.charAt(0).toUpperCase() + data.offerName.slice(1)}
      </span>
    </li>
  )
}
