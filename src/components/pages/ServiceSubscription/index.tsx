/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import Subscription, {
  SubscriptionTypes,
} from 'components/shared/templates/Subscription'
import {
  useFetchServiceSubscriptionsQuery,
  useFetchServiceFiltersQuery,
} from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import { currentSuccessType } from 'features/serviceSubscription/slice'
import { useTranslation } from 'react-i18next'

export default function ServiceSubscription() {
  const { t } = useTranslation('servicerelease')
  return (
    <Subscription
      currentSuccessType={currentSuccessType}
      fetchQuery={useFetchServiceSubscriptionsQuery}
      fetchAppFilters={useFetchServiceFiltersQuery}
      providerSuccessMessage={t(
        'serviceSubscription.register.providerSuccessMessage'
      )}
      headline={t('serviceSubscription.headline')}
      subHeading={t('serviceSubscription.subHeading')}
      description={t('serviceSubscription.description')}
      readMore={t('serviceSubscription.readMore')}
      registerURL={t('serviceSubscription.registerURL')}
      searchPlaceHoder={t('serviceSubscription.search')}
      sortOptionLabels={{
        customer: t('serviceSubscription.sortOptions.customer'),
        offer: t('serviceSubscription.sortOptions.apps'),
      }}
      tabLabels={{
        request: t('serviceSubscription.tabs.request'),
        active: t('serviceSubscription.tabs.active'),
        showAll: t('serviceSubscription.tabs.showAll'),
        inactive: t('serviceSubscription.tabs.inactive'),
      }}
      doNotShowAutoSetup={true}
      type={SubscriptionTypes.SERVICE_SUBSCRIPTION}
      activeAppHeading={t('serviceSubscription.offersHeading')}
      subscriptionHeading={t('serviceSubscription.serviceSubscriptionHeading')}
      loadMoreButtonText={t('serviceSubscription.loadMore')}
    />
  )
}
