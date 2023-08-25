/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
  PageHeader,
  StaticTable,
  TableType,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import AppSubscriptions from './AppSubscriptions'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import './Organization.scss'
import { OVERLAYS } from 'types/Constants'
import { useFetchSubscribedActiveAppsQuery } from 'features/apps/apiSlice'
import { subscribedApps } from 'features/apps/mapper'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import LoadingError from './LoadingError'
import { CompanyDetailsToCards } from 'features/admin/mapper'
import { UserDetailCard } from 'components/shared/basic/UserDetailInfo/UserDetailCard'

export default function Organization() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useFetchSubscribedActiveAppsQuery()
  const appSubscribedData = data && subscribedApps(data)
  const {
    data: companyDetails,
    isError: companyDetailsError,
    isLoading: companyDetailsLoading,
  } = useFetchOwnCompanyDetailsQuery()
  const companyDetailsData =
    companyDetails && CompanyDetailsToCards(companyDetails)

  const handleClick = (id: string | undefined) => {
    dispatch(show(OVERLAYS.APP, id, t('content.organization.company.title')))
  }

  const appSubscriptionsTableBody =
    appSubscribedData?.map((app) => [
      () => (
        <AppSubscriptions
          image={app.image}
          onButtonClick={() => handleClick(app.offerId)}
          name={app.name || ''}
          provider={app.provider}
          status={app.status}
        />
      ),
    ]) || []

  const appSubscriptionsTableData: TableType = {
    head: [t('content.organization.subscriptions.title')],
    body: appSubscriptionsTableBody,
  }

  return (
    <main>
      <PageHeader
        title={t('pages.organization')}
        topPage={false}
        headerHeight={200}
      />
      <div className="organization-main">
        <div className="organization-content">
          {companyDetailsData ? (
            <UserDetailCard
              cardCategory={companyDetailsData?.cardCategory}
              cardContentItems={companyDetailsData?.cardContentItems}
            />
          ) : null}
          <LoadingError
            isLoading={companyDetailsLoading}
            isError={companyDetailsError}
            errorText={t('content.organization.company.error')}
          />
        </div>
        <div className="organization-content">
          <StaticTable data={appSubscriptionsTableData} horizontal={false} />
        </div>
      </div>
    </main>
  )
}
