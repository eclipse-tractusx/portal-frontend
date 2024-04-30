/********************************************************************************
 * 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { Box, Grid, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import type {
  BpdmTypeUUIDKeyPair,
  BusinessPartner,
} from 'features/partnerNetwork/types'
import DetailGridRow from './DetailGridRow'
import {
  useFetchCompanyCertificateQuery,
  useFetchDocumentQuery,
} from 'features/companyCertification/companyCertificateApiSlice'
import ArticleIcon from '@mui/icons-material/Article'
import { useEffect, useState } from 'react'
import { download } from 'utils/downloadUtils'

const BusinessPartnerDetailContent = ({
  selectedRowBPN,
}: {
  selectedRowBPN: BusinessPartner
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme
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

  return (
    <>
      {selectedRowBPN && (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={1.5} style={{ marginTop: 0 }}>
            <Grid
              xs={12}
              item
              style={{
                backgroundColor: theme.palette.grey['100'],
                padding: spacing(2),
              }}
            >
              <Typography variant="h5">
                {t('content.partnernetwork.overlay.companydatatitle')}
              </Typography>
            </Grid>
            <DetailGridRow
              key={t('content.partnernetwork.columns.name') as string}
              {...{
                variableName: `${t('content.partnernetwork.columns.name')}`,
                value: selectedRowBPN.legalName ?? '',
              }}
            />
            <DetailGridRow
              key={t('content.partnernetwork.columns.bpn') as string}
              {...{
                variableName: `${t('content.partnernetwork.columns.bpn')}`,
                value: selectedRowBPN.bpnl,
              }}
            />
            {selectedRowBPN.legalForm && (
              <DetailGridRow
                key={t('content.partnernetwork.overlay.legalform') as string}
                {...{
                  variableName: `${t(
                    'content.partnernetwork.overlay.legalform'
                  )}`,
                  value: selectedRowBPN.legalForm?.name ?? '',
                }}
              />
            )}
            <Grid
              xs={12}
              item
              style={{
                backgroundColor: theme.palette.grey['100'],
                padding: spacing(2),
              }}
            >
              <Typography variant="h5">Address</Typography>
            </Grid>
            <DetailGridRow
              key="Street"
              {...{
                variableName: 'Street',
                value:
                  selectedRowBPN.legalAddress?.physicalPostalAddress?.street
                    ?.name,
              }}
            />
            <DetailGridRow
              key="PLZ / City"
              {...{
                variableName: 'PLZ / City',
                value: `${selectedRowBPN.legalAddress?.physicalPostalAddress?.postalCode} ${selectedRowBPN.legalAddress?.physicalPostalAddress?.city}`,
              }}
            />
            <DetailGridRow
              key="Country"
              {...{
                variableName: 'Country',
                value:
                  selectedRowBPN.legalAddress?.physicalPostalAddress?.country
                    ?.name ?? '',
              }}
            />
            <Grid
              xs={12}
              item
              style={{
                backgroundColor: theme.palette.grey['100'],
                padding: spacing(2),
              }}
            >
              <Typography variant="h5">Identifiers</Typography>
            </Grid>
            {selectedRowBPN.identifiers?.map(
              (identifier: BpdmTypeUUIDKeyPair) => {
                return (
                  <DetailGridRow
                    key={identifier.type?.name}
                    {...{
                      variableName:
                        identifier.type?.name || identifier.type?.technicalKey,
                      value: identifier.value,
                    }}
                  />
                )
              }
            )}
            <Grid
              xs={12}
              item
              style={{
                backgroundColor: theme.palette.grey['100'],
                padding: spacing(2),
              }}
            >
              <Typography variant="h5">Certificates</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
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
                      <Typography variant="body1">
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
