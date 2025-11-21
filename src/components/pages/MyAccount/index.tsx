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
import {
  Button,
  UserAvatar,
  Typography,
  PageHeader,
} from '@catena-x/portal-shared-components'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { UserDetailInfo } from 'components/shared/basic/UserDetailInfo'
import { useFetchOwnUserDetailsQuery } from 'features/admin/userApiSlice'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'
import { success } from 'services/NotifyService'
import UserService from 'services/UserService'

export default function MyAccount() {
  const { t } = useTranslation()
  const { data } = useFetchOwnUserDetailsQuery()
  const dispatch = useDispatch()

  const handleDeleteUser = () =>
    dispatch(
      show(OVERLAYS.CONFIRM_USER_ACTION, data?.companyUserId, '', 'ownUser')
    )

  return (
    <main className="my-account">
      <PageHeader
        title={t('pages.account')}
        topPage={false}
        headerHeight={200}
      />

      <section>
        <Box
          sx={{ marginBottom: '75px', display: 'flex', alignItems: 'flex-end' }}
        >
          <Button
            color="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(UserService.getToken() ?? '')
              success(t('content.account.copy_to_clipboard_success'))
            }}
            size="small"
            variant="outlined"
            startIcon={<WarningAmberOutlinedIcon />}
            sx={{ marginRight: '8px' }}
          >
            {t('content.account.copy_to_clipboard')}
          </Button>
          <Button
            color="secondary"
            onClick={handleDeleteUser}
            size="small"
            variant="outlined"
            startIcon={<CancelOutlinedIcon />}
          >
            {t('content.account.deleteAccount')}
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar size="large" />
          </Box>
        </Box>
      </section>
      {data && (
        <UserDetailInfo
          user={data}
          parsedToken={UserService.getParsedToken()}
        />
      )}

      {/* TODO: DEV only needs to be removed when going PROD */}
      <section>
        <Accordion sx={{ marginBottom: '20px', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>{t('content.account.token')}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ marginBottom: '20px' }}>
            <pre>{JSON.stringify(UserService.getParsedToken(), null, 2)}</pre>
          </AccordionDetails>
        </Accordion>
      </section>
    </main>
  )
}
