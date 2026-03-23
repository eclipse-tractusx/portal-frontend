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

import { Chip } from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import type { TenantUserDetails } from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import { useNavigate } from 'react-router-dom'

export const AppPermissions = ({ user }: { user: TenantUserDetails }) => {
  const { t } = useTranslation()
  const appRoles = user
    ? user.assignedRoles.filter((app) => app.roles.length > 0)
    : []

  const AppName = ({ id }: { id: string }) => {
    const navigate = useNavigate()
    const { data } = useFetchAppDetailsQuery(id)
    return (
      <span
        style={{ lineHeight: 2.2, cursor: 'pointer' }}
        onClick={() => {
          navigate(`/appdetail/${id}`)
        }}
        onKeyUp={() => {
          // do nothing
        }}
      >
        {data ? data.title : id}
        <span style={{ marginLeft: '20px', color: '#cccccc' }}>
          {data?.provider}
        </span>
      </span>
    )
  }

  const renderRoles = (roles: string[]) => (
    <>
      {roles.map((role: string) => (
        <Chip
          key={role}
          color="secondary"
          label={role}
          type="plain"
          variant="filled"
          withIcon={false}
          sx={{ marginLeft: '10px', marginTop: '5px' }}
        />
      ))}
    </>
  )

  return (
    <KeyValueView
      cols={3}
      title={t('content.account.appPermissionTable.title')}
      items={appRoles.map((app) => ({
        key: <AppName id={app.appId} />,
        value: renderRoles(app.roles),
      }))}
    />
  )
}
