/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
  Button,
} from 'cx-portal-shared-components'
import { Box, Grid, useTheme, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import DetailGridRow from 'components/pages/PartnerNetwork/components/BusinessPartnerDetailOverlay/DetailGridRow'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import {
  ApplicationRequest,
  useFetchCompanySearchQuery,
  useFetchDocumentByIdMutation,
} from 'features/admin/applicationRequestApiSlice'
import { download } from 'utils/downloadUtils'

interface CompanyDetailOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
}

const CompanyDetailOverlay = ({
  openDialog = false,
  handleOverlayClose,
}: CompanyDetailOverlayProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme
  const { detailLoading, companyDetail: selectedCompany } = useSelector(
    adminRegistrationSelector
  )
  const [company, setCompany] = useState<ApplicationRequest>()
  const [getDocumentById] = useFetchDocumentByIdMutation()
  const { data } = useFetchCompanySearchQuery({
    page: 0,
    args: {
      expr: selectedCompany && selectedCompany.name,
    },
  })

  useEffect(() => {
    if (data) {
      const selected =
        data &&
        data.content &&
        data.content.filter(
          (company: { bpn: string }) => selectedCompany.bpn === company.bpn
        )
      setCompany(selected[0])
    }
  }, [data, selectedCompany])

  const getLocaleStr = (str: string) => {
    if (str === 'ACTIVE_PARTICIPANT') {
      return t(
        'content.admin.registration-requests.overlay.activeParticipation'
      )
    } else if (str === 'APP_PROVIDER') {
      return t('content.admin.registration-requests.overlay.appProvider')
    } else {
      return t('content.admin.registration-requests.overlay.serviceProvider')
    }
  }

  const downloadDocumnet = async (documentId: string, documentType: string) => {
    try {
      const response = await getDocumentById(documentId).unwrap()

      const fileType = response.headers.get('content-type')
      const file = response.data

      return download(file, fileType, documentType)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  return (
    <div className={'company-detail-overlay'}>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: 700,
          },
        }}
      >
        <DialogHeader
          {...{
            title: t('content.admin.registration-requests.overlay.title'),
            intro: t(
              'content.admin.registration-requests.overlay.companydatadescription'
            ),
            closeWithIcon: true,
            onCloseWithIcon: handleOverlayClose,
          }}
        />

        {detailLoading ? (
          <div
            style={{
              height: '100px',
              textAlign: 'center',
              padding: '30px',
            }}
          >
            <CircularProgress
              size={35}
              sx={{
                color: theme.palette.primary.main,
                zIndex: 1,
                position: 'absolute',
              }}
            />
          </div>
        ) : (
          <DialogContent
            sx={{
              padding: '0 120px',
              marginBottom: 5,
            }}
          >
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
                    {t(
                      'content.admin.registration-requests.overlay.companydatatitle'
                    )}
                  </Typography>
                </Grid>
                <DetailGridRow
                  key={t('content.partnernetwork.columns.name') as string}
                  {...{
                    variableName: `${t('content.partnernetwork.columns.name')}`,
                    value: selectedCompany?.name,
                  }}
                />
                <DetailGridRow
                  key={t('content.partnernetwork.columns.bpn') as string}
                  {...{
                    variableName: `${t('content.partnernetwork.columns.bpn')}`,
                    value: selectedCompany?.bpn,
                  }}
                />
                <DetailGridRow
                  key={
                    t(
                      'content.admin.registration-requests.overlay.taxid'
                    ) as string
                  }
                  {...{
                    variableName: `${t(
                      'content.admin.registration-requests.overlay.taxid'
                    )}`,
                    value: selectedCompany?.taxId || '',
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
                  <Typography variant="h5">
                    {t('content.admin.registration-requests.overlay.address')}
                  </Typography>
                </Grid>
                <DetailGridRow
                  key="Street"
                  {...{
                    variableName: 'Street',
                    value: `${selectedCompany?.streetName || ''} ${
                      selectedCompany?.streetNumber || ''
                    }`,
                  }}
                />
                <DetailGridRow
                  key="PLZ / City"
                  {...{
                    variableName: 'PLZ / City',
                    value: `${selectedCompany?.zipCode || ''} ${
                      selectedCompany?.city || ''
                    }`,
                  }}
                />
                <DetailGridRow
                  key="Country"
                  {...{
                    variableName: 'Country',
                    value: selectedCompany?.countryDe || '',
                  }}
                />
                <>
                  <Grid
                    xs={12}
                    item
                    style={{
                      backgroundColor: theme.palette.grey['100'],
                      padding: spacing(2),
                    }}
                  >
                    <Typography variant="h5">
                      {t('content.admin.registration-requests.overlay.docs')}
                    </Typography>
                  </Grid>
                  {company?.documents && company.documents.length > 0 ? (
                    <>
                      {company.documents.map(
                        (contract: {
                          documentId: string
                          documentType: string
                        }) => (
                          <div
                            key={contract.documentId}
                            style={{
                              display: 'flex',
                              padding: '20px',
                              alignItems: 'center',
                            }}
                          >
                            <>
                              <ArticleOutlinedIcon />
                              <button
                                style={{
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  border: 'none',
                                  background: 'transparent',
                                  paddingLeft: '10px',
                                }}
                                onClick={() => {
                                  downloadDocumnet(
                                    contract.documentId,
                                    contract.documentType
                                  )
                                }}
                              >
                                {contract?.documentType}
                              </button>
                            </>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <Typography
                      sx={{
                        padding: '20px',
                      }}
                      variant="body1"
                    >
                      {t('content.admin.registration-requests.overlay.noinfo')}
                    </Typography>
                  )}
                </>
                <>
                  <Grid
                    xs={12}
                    item
                    style={{
                      backgroundColor: theme.palette.grey['100'],
                      padding: spacing(2),
                    }}
                  >
                    <Typography variant="h5">
                      {t('content.admin.registration-requests.overlay.roles')}
                    </Typography>
                  </Grid>
                  {selectedCompany?.companyRoles &&
                  selectedCompany?.companyRoles.length > 0 ? (
                    <>
                      {selectedCompany?.companyRoles.map(
                        (role: { companyRole: string }) => (
                          <div
                            key={role.companyRole}
                            style={{
                              display: 'flex',
                              padding: '20px 10px 10px 10px',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}
                          >
                            <Button
                              color="secondary"
                              sx={{
                                borderRadius: '6px',
                                margin: '0px 10px',
                                cursor: 'auto',
                              }}
                              onClick={function noRefCheck() {}}
                              onFocusVisible={function noRefCheck() {}}
                              size="small"
                              variant="contained"
                            >
                              {getLocaleStr(role.companyRole)}
                            </Button>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <Typography
                      sx={{
                        padding: '20px',
                      }}
                      variant="body1"
                    >
                      {t('content.admin.registration-requests.overlay.noinfo')}
                    </Typography>
                  )}
                </>
              </Grid>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default CompanyDetailOverlay
