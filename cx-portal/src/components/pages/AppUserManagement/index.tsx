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

import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { useTranslation } from 'react-i18next'
import { AppUserDetailsTable } from './components/AppUserDetailsTable'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { PageHeader } from 'cx-portal-shared-components'
import { useParams } from 'react-router-dom'
import { useFetchAppRolesQuery } from 'features/admin/appuserApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import './AppUserManagement.scss'

export default function AppUserManagement() {
  const { t } = useTranslation()
  const appId = useParams().appId
  const appDetails = useFetchAppDetailsQuery(appId!).data
  const { data, isError } = useFetchAppRolesQuery(appId!)

  return (
    <main className="app-user-management">
      <PageHeader
        title={t('content.usermanagement.appUserDetails.headline', {
          app: appDetails?.title,
        })}
        topPage={true}
        headerHeight={314}
      >
        <PageBreadcrumb />
      </PageHeader>
      <AppUserDetailsHeader
        roles={data!}
        error={isError ? JSON.stringify(data) : ''}
      />
      <AppUserDetailsTable appId={appId!} />
    </main>
  )
}
