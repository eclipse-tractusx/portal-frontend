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

import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Chip,
  PageSnackbar,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import EditIcon from '@mui/icons-material/Edit'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import {
  type TenantUserDetails,
  useFetchUserDetailsQuery,
} from 'features/admin/userApiSlice'
import './style.scss'
import {
  currentUserRoleResp,
  SuccessErrorType,
} from 'features/admin/appuserApiSlice'

export const UserRoles = ({
  user,
  isUserDetail,
}: {
  user: TenantUserDetails
  isUserDetail?: boolean
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data } = useFetchUserDetailsQuery(user.companyUserId)
  const roles =
    data?.assignedRoles.filter(
      (item) => item.appId === '9b957704-3505-4445-822c-d7ef80f27fcd' //added static for testing
    )[0]?.roles ?? []

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

          <div
            className={`policies-list-main ${
              roles.length === 1 ? 'center' : ''
            }`}
          >
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
          portalRoleResponse === SuccessErrorType.ERROR ||
          portalRoleResponse === SuccessErrorType.SUCCESS
        }
        autoClose
        description={
          portalRoleResponse === SuccessErrorType.ERROR
            ? t('content.account.editRoles.errorDescription')
            : t('content.account.editRoles.successDescription')
        }
        severity={
          portalRoleResponse === SuccessErrorType.ERROR
            ? SuccessErrorType.ERROR
            : SuccessErrorType.SUCCESS
        }
        showIcon
      />
    </>
  )
}
