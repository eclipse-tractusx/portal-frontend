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

import { PageHeader, StaticTable, TableType } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import CompanyDetails from './CompanyDetails'
import AppSubscriptions from './AppSubscriptions'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import './Organization.scss'
import { OVERLAYS } from 'types/Constants'
import { useTheme, CircularProgress } from '@mui/material'
import {
  useFetchActiveAppsQuery,
  useFetchSubscriptionStatusQuery,
} from 'features/apps/apiSlice'
import { appToStatus } from 'features/apps/mapper'

export default function Organization() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const {
    data: subscriptionStatus,
    isError,
    isLoading,
  } = useFetchSubscriptionStatusQuery()
  const { data } = useFetchActiveAppsQuery()
  const appSubscribedData =
    data && subscriptionStatus && appToStatus(data, subscriptionStatus)
  const handleClick = (id: string | undefined) => {
    dispatch(show(OVERLAYS.APP, id, t('content.organization.company.title')))
  }

  const organizationTableData: TableType = {
    head: [t('content.organization.company.title')],
    body: [
      [() => <CompanyDetails head="Company Name: " data="This company name" />],
      [() => <CompanyDetails head="Address: " data="This company name" />],
      [() => <CompanyDetails head="City: " data="This company name" />],
      [() => <CompanyDetails head="Company Name: " data="This company name" />],
      [() => <CompanyDetails head="BPN: " data="This company name" />],
    ],
  }

  const appSubscriptionsTableBody =
    appSubscribedData?.map((app) => [
      () => (
        <AppSubscriptions
          image={app.image}
          onButtonClick={() => handleClick(app.id)}
          name={app.title}
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
          <StaticTable data={organizationTableData} horizontal={false} />
        </div>
        <div className="organization-content">
          <StaticTable data={appSubscriptionsTableData} horizontal={false} />
          {isLoading ? (
            <div className="organization-loader">
              <CircularProgress
                size={50}
                sx={{
                  color: theme.palette.primary.main,
                  zIndex: 1,
                  position: 'absolute',
                }}
              />
            </div>
          ) : null}
          {isError ? (
            <div className="organization-error">error - no data found</div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
