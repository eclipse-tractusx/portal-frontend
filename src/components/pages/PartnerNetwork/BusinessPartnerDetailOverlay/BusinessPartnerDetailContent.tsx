/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import type {
  BpdmTypeUUIDKeyPair,
  BusinessPartner,
} from 'features/partnerNetwork/types'
import {
  useFetchCompanyCertificateQuery,
  useFetchDocumentQuery,
} from 'features/companyCertification/companyCertificateApiSlice'
import ArticleIcon from '@mui/icons-material/Article'
import { useEffect, useState } from 'react'
import { download } from 'utils/downloadUtils'
import { KeyValueView } from 'components/shared/basic/KeyValueView'

const BusinessPartnerDetailContent = ({
  selectedRowBPN,
}: {
  selectedRowBPN: BusinessPartner
}) => {
  const { t } = useTranslation()
  const { data: certificates } = useFetchCompanyCertificateQuery(
    selectedRowBPN.bpnl
  )
  const [documentId, setDocumentId] = useState<string>('')
  const { data: document } = useFetchDocumentQuery(documentId, {
    skip: documentId === '',
  })

  useEffect(() => {
    if (document) {
      const file = document.data
      const fileType = document.headers.get('content-type')
      download(file, fileType, documentId)
    }
  }, [document])

  const companyData = [
    {
      key: t('content.partnernetwork.columns.name'),
      value: selectedRowBPN.legalName ?? '',
    },
    {
      key: t('content.partnernetwork.columns.bpn'),
      value: selectedRowBPN.bpnl ?? '',
    },
    {
      key: t('content.partnernetwork.overlay.legalform'),
      value: selectedRowBPN.legalForm?.name ?? '',
    },
    {
      key: t('content.partnernetwork.columns.street'),
      value: selectedRowBPN.legalAddress?.physicalPostalAddress?.street?.name,
    },
    {
      key: t('content.partnernetwork.columns.city'),
      value: `${selectedRowBPN.legalAddress?.physicalPostalAddress?.postalCode} ${selectedRowBPN.legalAddress?.physicalPostalAddress?.city}`,
    },
    {
      key: t('content.partnernetwork.columns.country'),
      value:
        selectedRowBPN.legalAddress?.physicalPostalAddress?.country?.name ?? '',
    },
  ]

  const identifierData = selectedRowBPN.identifiers?.map(
    (identifier: BpdmTypeUUIDKeyPair) => {
      return {
        key: identifier.type?.name || identifier.type?.technicalKey,
        value: identifier.value,
      }
    }
  )

  return (
    <>
      {selectedRowBPN && (
        <Box sx={{ width: '100%', marginBottom: '50px' }}>
          <KeyValueView
            cols={2.3}
            title={t('content.partnernetwork.overlay.companydatatitle')}
            items={companyData}
          />
          <KeyValueView
            cols={2.3}
            title={t('content.partnernetwork.overlay.identifiers')}
            items={
              identifierData.length
                ? identifierData
                : { key: '', value: t('content.partnernetwork.overlay.noData') }
            }
          />
          <KeyValueView
            cols={2.3}
            title={t('content.partnernetwork.overlay.certificates')}
            items={{
              key: '',
              value:
                certificates && certificates.length > 0
                  ? ''
                  : t('content.partnernetwork.overlay.noData'),
            }}
          />
          <Grid container spacing={1} style={{ margin: '-95px 0 0 20px' }}>
            {certificates?.map(
              (certificate: {
                documentId: string
                companyCertificateStatus: string
                companyCertificateType: string
              }) => {
                return (
                  <Grid item xs={6} key={certificate.documentId}>
                    <Box
                      key={certificate.documentId}
                      onClick={() => {
                        setDocumentId(certificate.documentId)
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          marginRight: '20px',
                        }}
                      >
                        {certificate.companyCertificateType}
                      </Typography>
                      <ArticleIcon
                        sx={{
                          fontSize: '100px',
                          cursor: 'pointer',
                          color: '#CCCCCC',
                          ':hover': {
                            color: '#0f71cb',
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                )
              }
            )}
          </Grid>
        </Box>
      )}
    </>
  )
}

export default BusinessPartnerDetailContent
