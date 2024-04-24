/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  Typography,
  BackButton,
  StatusTag,
} from '@catena-x/portal-shared-components'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import { CompanyAddressList } from './components/CompanyAddressList'
import { useState } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import FormDetails from './components/FormDetails'

export default function CompanyData() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [showOverlay, setShowOverlay] = useState({
    address: false,
    site: false,
    success: false,
    error: false,
  })
  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery()

  const companyData = [
    {
      key: t('content.organization.companyDetails.companyName'),
      value: companyDetails?.shortName ?? 'N/A',
    },
    {
      key: t('content.organization.companyDetails.bpn'),
      value: companyDetails?.bpn ?? 'N/A',
    },
    {
      key: t('content.organization.companyDetails.street'),
      value: companyDetails
        ? companyDetails.streetName + ' ' + companyDetails.streetNumber
        : 'N/A',
    },
    {
      key: t('content.organization.companyDetails.postal'),
      value: companyDetails
        ? companyDetails.zipCode + ' ' + companyDetails.city
        : 'N/A',
    },
    {
      key: t('content.organization.companyDetails.region'),
      value:
        companyDetails?.countryAlpha2Code +
        (companyDetails?.region ? ', ' + companyDetails?.region : ''),
    },
  ]

  const companyRoleData = [
    {
      key: '',
      value: (
        <>
          {companyDetails?.companyRole.map((item: string) => (
            <StatusTag
              key={item}
              color="label"
              label={t(`content.companyRolesUpdate.${item}`)}
            />
          ))}
        </>
      ),
    },
  ]

  return (
    <main className="organization-main">
      <Box className="app-back">
        <BackButton
          backButtonLabel={t('global.actions.back')}
          backButtonVariant="text"
          onBackButtonClick={() => {
            navigate('/')
          }}
        />
      </Box>
      <div className="organization-section">
        <Typography variant="h2" className="main-title">
          {t('pages.company_data')}
        </Typography>
        <div className="table-section">
          <Box
            sx={{
              width: '50%',
              '@media (max-width: 1200px)': {
                order: 1,
                width: '50%',
              },
            }}
          >
            <KeyValueView
              cols={1.5}
              title={t('content.organization.companyDetails.title')}
              items={companyData}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              '@media (max-width: 1200px)': {
                order: 1,
                width: '50%',
              },
            }}
          >
            <KeyValueView
              cols={1.5}
              title={t('content.organization.companyRoles.title')}
              items={companyRoleData}
            />
          </Box>
        </div>
      </div>
      <CompanyAddressList
        handleButtonClick={() => {
          setShowOverlay((old) => {
            old.address = true
            return { ...old }
          })
        }}
        handleSecondButtonClick={() => {
          setShowOverlay((old) => {
            old.site = true
            return { ...old }
          })
        }}
      />
      {showOverlay.address && (
        <FormDetails
          isAddress={true}
          id={''}
          title={t('content.companyData.address.title')}
          description={t('content.companyData.address.description')}
          handleClose={() => {
            setShowOverlay((old) => {
              old.address = false
              return { ...old }
            })
          }}
          open={showOverlay.address}
          handleConfirm={() => {
            setShowOverlay((old) => {
              old.address = false
              old.error = true
              return { ...old }
            })
          }}
        />
      )}
      {showOverlay.site && (
        <FormDetails
          id={''}
          title={t('content.companyData.site.title')}
          description={t('content.companyData.site.description')}
          handleClose={() => {
            setShowOverlay((old) => {
              old.site = false
              return { ...old }
            })
          }}
          open={showOverlay.site}
          handleConfirm={() => {
            setShowOverlay((old) => {
              old.site = false
              old.success = true
              return { ...old }
            })
          }}
        />
      )}
      {showOverlay.success && (
        <ServerResponseOverlay
          title={
            showOverlay.address
              ? t('content.companyData.error.title').replace(
                  '{name}',
                  'address'
                )
              : t('content.companyData.error.title').replace('{name}', 'site')
          }
          intro={t('content.companyData.error.description')}
          dialogOpen={true}
          handleCallback={() => {}}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
      {showOverlay.error && (
        <ServerResponseOverlay
          title={
            showOverlay.address
              ? t('content.companyData.error.title').replace(
                  '{name}',
                  'address'
                )
              : t('content.companyData.error.title').replace('{name}', 'site')
          }
          intro={t('content.companyData.error.description')}
          dialogOpen={true}
          iconComponent={
            <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
          }
          handleCallback={() => {}}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
    </main>
  )
}
