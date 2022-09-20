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

import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import { Box, Grid, useTheme, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { adminRegistrationSelector } from 'features/admin/registration/slice'
import DetailGridRow from 'components/pages/PartnerNetwork/BusinessPartnerDetailOverlay/DetailGridRow'

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
            title: t(
              'content.admin.registration-requests.overlay.companydatatitle'
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
                    {t('content.admin.registration-requests.overlay.title')}
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
                  <Typography variant="h5">Address</Typography>
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
              </Grid>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default CompanyDetailOverlay
