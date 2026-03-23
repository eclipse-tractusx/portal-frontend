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
import {
  ErrorBar,
  PageHeader,
} from '@arena2036/portal-shared-components-construct-x'
import { type AppMarketplaceApp } from 'features/apps/types'
import { useFetchProvidedAppsQuery } from 'features/apps/apiSlice'
import NoItems from '../NoItems'
import { AppOverviewList } from '../AppOverview/AppOverviewList'
import { appToCard } from 'features/apps/mapper'

export default function AppOverviewNew() {
  const { t } = useTranslation()
  const { data, refetch, isSuccess } = useFetchProvidedAppsQuery({
    page: 0,
    args: {
      expr: '',
      statusFilter: 'All',
    },
  })
  // apiSlice has since been updated to accept params for pagination.
  // Temporary solution until this page is completed.

  return (
    <main>
      <PageHeader
        title={t('content.appOverview.headerTitle')}
        topPage={true}
        headerHeight={200}
      />
      <section>
        {data && data.content?.length > 0 ? (
          <AppOverviewList
            filterItem={data.content.map((item: AppMarketplaceApp) =>
              appToCard(item)
            )}
            showOverlay={() => {
              // do nothing
            }}
          />
        ) : (
          <>
            {isSuccess ? (
              <NoItems />
            ) : (
              <ErrorBar
                errorText={t('error.errorBar')}
                handleButton={refetch}
                buttonText={t('error.tryAgain')}
                showButton={true}
              />
            )}
          </>
        )}
      </section>
    </main>
  )
}
