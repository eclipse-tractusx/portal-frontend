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

import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Chip,
  PageSnackbar,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import EditIcon from '@mui/icons-material/Edit'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import {
  TenantUserDetails,
  useFetchUsersRolesQuery,
} from 'features/admin/userApiSlice'
import './UserRole.scss'
import { currentUserRoleResp } from 'features/admin/appuserApiSlice'

export const UserRoles = ({
  user,
  isUserDetail,
}: {
  user: TenantUserDetails
  isUserDetail?: boolean
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data } = useFetchUsersRolesQuery(user.companyUserId)
  const roles = data?.content[0].roles ?? []

  const portalRoleResponse = useSelector(currentUserRoleResp)

  return (
    <>
      <Box className="policy-main">
        <Typography className="policy-title" variant="h4">
          {t('shared.userRoles.title')}
        </Typography>
        <section>
          {isUserDetail && (
            <div className="change-role-btn">
              <Button
                color="secondary"
                size="small"
                onClick={() =>
                  dispatch(show(OVERLAYS.EDIT_PORTAL_ROLES, user.companyUserId))
                }
              >
                <EditIcon className="edit-icon" />
                {t('shared.userRoles.changeRoleBtn')}
              </Button>
            </div>
          )}

          <div className="policies-list-main">
            {roles.map((role: string) => (
              <div className="policy-list" key={uniqueId(role)}>
                <Chip label={role} type="plain" />
              </div>
            ))}
          </div>
        </section>
      </Box>
      <PageSnackbar
        open={
          portalRoleResponse === 'error' || portalRoleResponse === 'success'
        }
        autoClose
        description={
          portalRoleResponse === 'error'
            ? t('content.account.editRoles.errorDescription')
            : t('content.account.editRoles.successDescription')
        }
        severity={portalRoleResponse === 'error' ? 'error' : 'success'}
        showIcon
      />
    </>
  )
}
