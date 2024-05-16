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

import { Checkbox, Alert } from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { rolesToAddSelector } from 'features/admin/userDeprecated/slice'
import { setRolesToAdd } from 'features/admin/userDeprecated/actions'
import { useFetchAppRolesQuery } from 'features/admin/appuserApiSlice'
import { useParams } from 'react-router-dom'

export const AppRoles = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const roles = useSelector(rolesToAddSelector)
  const { appId } = useParams()
  const { data } = useFetchAppRolesQuery(appId ?? '')

  const selectRole = (roleName: string, select: boolean) => {
    const isSelected = roles.includes(roleName)
    if (!isSelected && select) {
      dispatch(setRolesToAdd([...roles, roleName]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(roleName), 1)
      dispatch(setRolesToAdd([...oldRoles]))
    }
  }

  return (
    <Box
      sx={{
        '.checkbox-section': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        label: {
          fontSize: '16px',
        },
      }}
    >
      {data ? (
        <div className="checkbox-section">
          {data.map((role) => (
            <Checkbox
              label={role.role}
              key={role.roleId}
              onChange={(e) => {
                selectRole(role.role, e.target.checked)
              }}
            />
          ))}
        </div>
      ) : (
        <Alert severity="info">
          <span>{t('content.addUserRight.noRolesFound')}</span>
        </Alert>
      )}
    </Box>
  )
}
