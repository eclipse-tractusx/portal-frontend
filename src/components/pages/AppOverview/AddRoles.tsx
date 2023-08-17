/********************************************************************************
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

import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  Typography,
  PageHeader,
  Button,
  LoadingButton,
  StaticTable,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { TableType } from 'types/MainTypes'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useFetchAppRolesQuery } from 'features/appManagement/apiSlice'

export default function AddRoles() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const items: any = state
  const app = items?.filter((item: any) => item.id === appId)
  const { data } = useFetchAppRolesQuery(appId ?? '')
  const [appRoles, setAppRoles] = useState<any[]>([[''], ['']])

  const handleSaveClick = async () => {
    setIsLoading(true)
  }

  useEffect(() => {
    setAppRoles(
      data && data.length > 0
        ? data.map((role) => [role.role], ['--'])
        : [['', '']]
    )
  }, [data])

  const tableData: TableType = {
    head: [
      t('content.addRoles.establishedRoles'),
      `${(<DeleteOutlinedIcon />)}`,
    ],
    body: appRoles,
  }

  return (
    <main className="add-app-roles-main">
      <PageHeader title={app?.[0]?.title} headerHeight={200} topPage={true}>
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <section>
        <Typography mb={3} variant="body2" align="center">
          {app?.[0]?.title}
        </Typography>
        <Typography mb={3} variant="h2" align="center">
          {t('content.addRoles.headerTitle')}
        </Typography>
        <Typography align="center" variant="body2">
          {t('content.addRoles.description')}
        </Typography>
      </section>
      <div className="main-container">
        <div className="main-row">
          <Box sx={{ textAlign: 'center' }}>
            <Button
              size="small"
              sx={{ alignItems: 'center' }}
              // onClick={() => navigate('/appoverview')}
            >
              {t('content.addRoles.addAdditionalRoles')}
            </Button>
          </Box>
          <StaticTable data={tableData} horizontal={false} />
        </div>
      </div>

      <section>
        <hr style={{ border: 0, borderTop: '1px solid #DCDCDC' }} />
        <Box sx={{ position: 'relative', marginTop: '30px' }}>
          <Button
            color="secondary"
            size="small"
            onClick={() => navigate('/appoverview')}
          >
            {t('global.actions.cancel')}
          </Button>

          <span style={{ position: 'absolute', right: '10px' }}>
            {isLoading ? (
              <LoadingButton
                size="small"
                loading={isLoading}
                variant="contained"
                onButtonClick={() => {}}
                loadIndicator="Loading..."
                label={`${t('global.actions.confirm')}`}
              />
            ) : (
              <Button
                size="small"
                variant="contained"
                disabled={true}
                onClick={handleSaveClick}
              >
                {t('global.actions.save')}
              </Button>
            )}
          </span>
        </Box>
      </section>
    </main>
  )
}
