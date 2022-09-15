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

import { Typography } from 'cx-portal-shared-components'
import MarketplaceHeader from './components/MarketplaceHeader'
import MarketplaceProvider from './components/MarketplaceProvider'
import MarketplaceSubscription from './components/MarketplaceSubscription'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './Marketplace.scss'

export default function MarketplaceContentDetails({
  item,
  success,
}: {
  item: ServiceRequest
  success: boolean
}) {
  return (
    item.offerSubscriptionDetailData && (
      <>
        <MarketplaceHeader item={item} success={success} />
        {item.offerSubscriptionDetailData.length >= 3 && (
          <MarketplaceSubscription item={item} />
        )}
        <div className="product-description">
          <Typography variant="body2">{item.description}</Typography>
        </div>
        <MarketplaceProvider item={item} />
      </>
    )
  )
}
