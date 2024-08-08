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

import Subscription from 'components/shared/templates/Subscription'
import {
  useFetchSubscriptionsQuery,
  useFetchAppFiltersQuery,
} from 'features/appSubscription/appSubscriptionApiSlice'
import { currentSuccessType } from 'features/appSubscription/slice'
import { useTranslation } from 'react-i18next'

export default function AppSubscription() {
  const { t } = useTranslation()
  return (
    <Subscription
      currentSuccessType={currentSuccessType}
      fetchQuery={useFetchSubscriptionsQuery}
      fetchAppFilters={useFetchAppFiltersQuery}
      providerSuccessMessage={t(
        'content.appSubscription.register.providerSuccessMessage'
      )}
      headline={t('content.appSubscription.headline')}
      headlineDescription={t('content.appSubscription.headlineDescription')}
      subHeading={t('content.appSubscription.subHeading')}
      description={t('content.appSubscription.description')}
      registerURL={t('content.appSubscription.registerURL')}
      searchPlaceHoder={t('content.appSubscription.search')}
      sortOptionLabels={{
        customer: t('content.appSubscription.sortOptions.customer'),
        offer: t('content.appSubscription.sortOptions.offer'),
      }}
      tabLabels={{
        request: t('content.appSubscription.tabs.request'),
        active: t('content.appSubscription.tabs.active'),
        showAll: t('content.appSubscription.tabs.showAll'),
      }}
      loadMoreButtonText={t('content.appSubscription.lordMore')}
    />
  )
}
