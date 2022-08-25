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

import { Box } from '@mui/material'
import {
  Button,
  UserAvatar,
  Typography,
  Chip,
  PageHeader,
} from 'cx-portal-shared-components'
import { RootState } from 'features/store'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import uniqueId from 'lodash/uniqueId'
import { userDetailsToCards } from 'features/admin/userOwn/mapper'
import { UserDetails } from 'components/shared/basic/UserDetails'
import {
  useFetchOwnUserDetailsQuery,
  UserAppRoles,
} from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import { useNavigate } from 'react-router-dom'

const RenderAppName = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const { data } = useFetchAppDetailsQuery(id)
  return (
    <span
      style={{ lineHeight: 2.2, cursor: 'pointer' }}
      onClick={() => navigate(`/appdetail/${id}`)}
    >
      {data ? data.title : id}
      <span style={{ marginLeft: '20px', color: '#cccccc' }}>
        {data && data.provider}
      </span>
    </span>
  )
}

export default function MyAccount() {
  const { t } = useTranslation()
  const parsedToken = useSelector((state: RootState) => state.user.parsedToken)
  const token = useSelector((state: RootState) => state.user.token)
  const { data } = useFetchOwnUserDetailsQuery()
  const appRoles = data
    ? data.assignedRoles.filter((app) => app.roles.length > 0)
    : []

  const handleDeleteUser = () => {
    console.log('Delete user method')
  }

  const renderChips = (row: UserAppRoles) => (
    <>
      {row.roles.map((i: string) => (
        <Chip
          key={uniqueId(i)}
          color="secondary"
          label={i}
          type="plain"
          variant="filled"
          withIcon={false}
          sx={{ marginRight: '10px' }}
        />
      ))}
    </>
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
          {/* TODO: DEV only needs to be removed when going PROD */}
          <Button
            color="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(token)
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
          >
            {t('content.account.deleteAccount')}
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <UserAvatar size="large" />
          </Box>
        </Box>

        {data && (
          <>
            <UserDetails
              userDetailsCards={userDetailsToCards(data)}
              columns={3}
            />

            <div style={{ marginTop: '80px' }}></div>

            <KeyValueView
              cols={3}
              title={t('content.account.appPermissionTable.title')}
              items={appRoles.map((app) => ({
                key: <RenderAppName id={app.appId} />,
                value: renderChips(app),
              }))}
            />
          </>
        )}
      </section>

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
            <pre>{JSON.stringify(parsedToken, null, 2)}</pre>
          </AccordionDetails>
        </Accordion>
      </section>
    </main>
  )
}
