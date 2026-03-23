/********************************************************************************
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

import {
  Typography,
  PageHeader,
  Button,
  LoadingButton,
  Checkbox,
  Chip,
  Table,
  Tooltips,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFetchAppRolesQuery } from 'features/appManagement/apiSlice'
import AddRolesOverlay from './AddRolesOverlay'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { PAGES } from 'types/Constants'
import uniqueId from 'lodash/uniqueId'

export type ItemType = {
  description: string
  id: string
  image: {
    src: string
    alt: string
  }
  lastChanged: string
  leadPictureId: string
  name: string
  onClick: () => void
  price: string
  provider: string
  status: string
  statusText: string
  subtitle: string
  title: string
}

export default function AddRoles() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const items = state
  const app = items?.filter((item: ItemType) => item.id === appId)
  const { data, refetch } = useFetchAppRolesQuery(appId ?? '')
  const [addRolesOverlayOpen, setAddRolesOverlayOpen] = useState<boolean>(false)
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [appRoles, setAppRoles] = useState<any[]>([
    [''],
    // eslint-disable-next-line
    [`${(<Checkbox disabled={true} />)}`],
  ])

  useEffect(() => {
    refetch()
  }, [state])

  const handleSaveClick = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    setAppRoles(
      data && data.length > 0
        ? // eslint-disable-next-line
          data.map((role) => [role.role, `${(<Checkbox disabled={true} />)}`])
        : [['', '']]
    )
  }, [data])

  const appRolesData =
    data && data.length > 0
      ? appRoles.map((item, i) => ({
          establishedRoles: item[0],
          id: i,
        }))
      : []

  const columns = [
    {
      field: 'establishedRoles',
      headerName: t('content.addRoles.establishedRoles'),
      sortable: false,
      flex: 4,
      renderCell: ({
        row,
      }: {
        row: {
          establishedRoles: string
          checkbox: string
        }
      }) => (
        <Chip
          color="info"
          label={row.establishedRoles}
          withIcon={false}
          sx={{
            '.span.MuiChip-label:hover': {
              backgroundColor: 'transparent',
            },
          }}
        />
      ),
    },
    {
      field: 'checkbox',
      sortable: false,
      renderCell: () => <Checkbox disabled={true} sx={{ pl: 0 }} />,
      renderHeader: () => (
        <>
          <Tooltips
            color="dark"
            tooltipPlacement="top-start"
            tooltipText={t('content.addRoles.deleteNotSupported')}
          >
            <DeleteOutlinedIcon />
          </Tooltips>
        </>
      ),
    },
  ]

  return (
    <main className="add-app-roles-main">
      <PageHeader headerHeight={200} topPage={true} title={app?.[0]?.title} />
      <section>
        <Typography mb={3} variant="body2" align="center">
          {app?.[0]?.title}
        </Typography>
        <Typography mb={3} variant="h2" align="center">
          {t('content.addRoles.headerTitle')}
        </Typography>
        <Typography variant="body2" align="center">
          {t('content.addRoles.description')}
        </Typography>
      </section>
      <AddRolesOverlay
        openDialog={addRolesOverlayOpen}
        handleOverlayClose={() => {
          setAddRolesOverlayOpen(false)
        }}
        appId={appId ?? ''}
      />
      <div className="main-container">
        <div className="main-row">
          <Box sx={{ textAlign: 'center', paddingTop: '20px' }}>
            <Button
              size="small"
              onClick={() => {
                setAddRolesOverlayOpen(true)
              }}
            >
              {t('content.addRoles.uploadAdditionalRoles')}
            </Button>
          </Box>
          <Box width={620} margin={'0 auto'} justifyContent="center">
            <Table
              rowsCount={2}
              hideFooter
              loading={false}
              disableRowSelectionOnClick={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
              disableColumnSelector={true}
              disableDensitySelector={true}
              columnHeadersBackgroundColor={'#ecf0f4'}
              title={''}
              searchPlaceholder={''}
              toolbarVariant="ultimate"
              columns={columns}
              rows={appRolesData}
              getRowId={(row) => uniqueId(row.urn)}
              hasBorder={false}
            />
          </Box>
        </div>
      </div>

      <section>
        <hr style={{ border: 0, borderTop: '1px solid #DCDCDC' }} />
        <Box sx={{ marginTop: '30px', position: 'relative' }}>
          <Button
            color="secondary"
            onClick={() => {
              navigate(`/${PAGES.APP_OVERVIEW}`)
            }}
            size="small"
          >
            {t('global.actions.cancel')}
          </Button>

          <span style={{ position: 'absolute', right: '10px' }}>
            {isLoading ? (
              <LoadingButton
                size="small"
                loadIndicator="Loading..."
                loading={isLoading}
                variant="contained"
                onButtonClick={() => {
                  // do nothing
                }}
                label={`${t('global.actions.confirm')}`}
              />
            ) : (
              <Button
                disabled={true}
                size="small"
                variant="contained"
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
