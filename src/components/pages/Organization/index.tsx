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

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import {
  Button,
  Typography,
  BackButton,
  StatusTag,
  ContentCard,
} from '@nidhi.garg/portal-shared-components'
import UserService from 'services/UserService'
import { PAGES, ROLES } from 'types/Constants'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import { useFetchCertificatesQuery } from 'features/companyCertification/companyCertificateApiSlice'
import './Organization.scss'
import { FilterType, SortType } from '../CompanyCertificates'

export default function Organization() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery()
  const certificates = useFetchCertificatesQuery({
    filter: FilterType.ACTIVE,
    sortOption: SortType.CertificateTypeAsc,
    page: 0,
  }).data?.content

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
              sx={{
                marginRight: '8px',
              }}
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
          {t('pages.organization')}
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
              editLink={
                UserService.hasRole(ROLES.UPDATE_COMPANY_ROLE)
                  ? `/${PAGES.COMPANY_ROLE}`
                  : ''
              }
            />
          </Box>
        </div>
        <div className="delete-btn">
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            startIcon={<CancelOutlinedIcon />}
            disabled
          >
            {t('content.organization.deleteAccount')}
          </Button>
        </div>
        <div className="certificates-section">
          <Typography variant="h4">
            {t('content.organization.certificates')}
          </Typography>
          <div className="certificate-items">
            {certificates?.map((certificate) => (
              <div key={certificate.companyCertificateType}>
                {
                  <ContentCard
                    title={certificate.companyCertificateType}
                    chipText={certificate.companyCertificateType}
                    heading="Business Partner Level: "
                    detail="N/A"
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
