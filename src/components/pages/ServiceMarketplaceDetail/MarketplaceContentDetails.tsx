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

import { Typography } from '@arena2036/portal-shared-components-construct-x'
import MarketplaceHeader from './MarketplaceHeader'
import MarketplaceProvider from './MarketplaceProvider'
import MarketplaceSubscription from './MarketplaceSubscription'
import type { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'
import MarketplaceDocuments from './MarketplaceDocuments'
import MarketplaceTechnicalUserSetup from './MarketplaceTechnicalUserSetup'

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
        <div className="divider-height" />
        {item.offerSubscriptionDetailData.length > 0 && (
          <>
            <MarketplaceSubscription item={item} />
            <div className="divider-height" />
          </>
        )}
        <Typography variant="body2">{item.description}</Typography>
        <div className="divider-height" />
        <MarketplaceDocuments item={item} />
        <div className="divider-height" />
        <MarketplaceTechnicalUserSetup item={item} />
        <div className="divider-height" />
        <MarketplaceProvider item={item} />
        <div className="divider-height" />
      </>
    )
  )
}
