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

import { Checkbox } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
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

  const selectRole = (roleId: string, select: boolean) => {
    const isSelected = roles.includes(roleId)
    if (!isSelected && select) {
      dispatch(setRolesToAdd([...roles, roleId]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(roleId), 1)
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
      <div className="add-user-title">
        <SubHeaderTitle
          title={t('content.addUser.chooseUserRole')}
          variant="body1"
        />
      </div>

      <div className="checkbox-section">
        {data &&
          data.map((role) => (
            <Checkbox
              label={role.role}
              key={role.roleId}
              onChange={(e) => selectRole(role.roleId, e.target.checked)}
            />
          ))}
      </div>
    </Box>
  )
}
