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

import './style.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { Box } from '@mui/material'
import {
  Button,
  UserAvatar,
  Typography,
  PageHeader,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { UserDetailInfo } from 'components/shared/basic/UserDetailInfo'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'

export default function UserDetail() {
  const { t } = useTranslation()
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { data } = useFetchUserDetailsQuery(userId ?? '')

  const handleSuspendUser = () =>
    dispatch(show(OVERLAYS.CONFIRM_USER_ACTION, userId, '', 'suspend'))

  const handleDeleteUser = () =>
    dispatch(show(OVERLAYS.CONFIRM_USER_ACTION, userId, '', 'user'))

  const handleResetPasswordForUser = () =>
    data &&
    dispatch(
      show(
        OVERLAYS.CONFIRM_USER_ACTION,
        userId,
        '',
        'resetPassword',
        false,
        `${data.firstName} ${data.lastName}`
      )
    )

  return (
    <main className="user-details">
      <PageHeader
        title={t('content.account.userAccount')}
        topPage={false}
        headerHeight={200}
      />
      <section>
        <Box
          sx={{ marginBottom: '75px', display: 'flex', alignItems: 'flex-end' }}
        >
          <Box>
            <Typography
              variant="h6"
              display="block"
              sx={{ paddingBottom: '10px' }}
            >
              {data && `${data.firstName} ${data.lastName}, ${data.email}`}
            </Typography>
            <Button
              color="secondary"
              onClick={handleSuspendUser}
              size="small"
              variant="outlined"
              startIcon={<PowerSettingsNewOutlinedIcon />}
              sx={{ marginRight: '8px' }}
              disabled={true}
            >
              {t('content.account.suspendAccount')}
            </Button>
            <Button
              color="secondary"
              onClick={handleDeleteUser}
              size="small"
              variant="outlined"
              startIcon={<CancelOutlinedIcon />}
              sx={{ marginRight: '8px' }}
            >
              {t('content.account.deleteAccount')}
            </Button>
            <Button
              color="secondary"
              onClick={handleResetPasswordForUser}
              size="small"
              variant="outlined"
              startIcon={<RestartAltOutlinedIcon />}
            >
              {t('content.account.resetPswrdAccount')}
            </Button>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar size="large" />
          </Box>
        </Box>
      </section>
      {data && <UserDetailInfo user={data} isUserDetail={true} />}
    </main>
  )
}
