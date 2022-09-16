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

import { useTranslation } from 'react-i18next'
import { Typography, PageNotifications } from 'cx-portal-shared-components'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { AppRole } from 'features/admin/appuserApiSlice'
import './AppUserDetailsHeader.scss'

export interface AppUserDetailsHeaderProps {
  roles: AppRole[]
  error: string
}

export default function AppUserDetailsHeader({
  roles,
  error,
}: AppUserDetailsHeaderProps) {
  const { t } = useTranslation()

  return (
    <section className="app-user-details-header">
      <div className="app-user-details-header-title">
        <SubHeaderTitle
          title={'content.usermanagement.appUserDetails.header.title'}
          variant="h3"
        />
      </div>

      <div className="app-user-details-header-sub-title">
        <SubHeaderTitle
          title={'content.usermanagement.appUserDetails.header.subtitle'}
          variant="body2"
        />
      </div>

      <div className="app-user-details-header-roles-section">
        {roles &&
          roles.map((role) => {
            return (
              <div key={role.role} className="app-user-details-header-role">
                <Typography variant="h5">{role.role}</Typography>
                <Typography
                  variant="h6"
                  className="app-user-details-header-description"
                >
                  {role.description}
                </Typography>
              </div>
            )
          })}
      </div>
      <div className="errorMsg">
        {error && (
          <PageNotifications
            description={t(
              'content.usermanagement.appUserDetails.roles.error.message'
            )}
            open
            severity="error"
            title={t('content.usermanagement.appUserDetails.roles.error.title')}
          />
        )}
      </div>
    </section>
  )
}
