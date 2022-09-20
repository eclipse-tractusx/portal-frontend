/********************************************************************************
 * 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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
import {
  PartnerNetworkDataGrid,
  BpdmTypeUUIDKeyPair,
} from 'features/partnerNetwork/types'
import { Box, Grid, useTheme } from '@mui/material'
import DetailGridRow from './DetailGridRow'

interface BusinessPartnerDetailOverlayProps {
  openDialog?: boolean
  selectedRowBPN: PartnerNetworkDataGrid
  handleOverlayClose: React.MouseEventHandler
}

const BusinessPartnerDetailOverlay = ({
  openDialog = false,
  selectedRowBPN,
  handleOverlayClose,
}: BusinessPartnerDetailOverlayProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme

  return (
    <div className={'business-partner-overlay'}>
      <Dialog
        open={openDialog}
        // sx={{
        //   '.MuiDialog-paper': {
        //     maxWidth: 700,
        //   },
        // }}
      >
        <DialogHeader
          {...{
            title: t('content.partnernetwork.overlay.title'),
            closeWithIcon: true,
            onCloseWithIcon: handleOverlayClose,
          }}
        />

        <DialogContent
          sx={{
            padding: '0 30px',
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
                  {t('content.partnernetwork.overlay.companydatatitle')}
                </Typography>
              </Grid>
              <DetailGridRow
                key={t('content.partnernetwork.columns.name') as string}
                {...{
                  variableName: `${t('content.partnernetwork.columns.name')}`,
                  value: selectedRowBPN.name,
                }}
              />
              <DetailGridRow
                key={t('content.partnernetwork.columns.bpn') as string}
                {...{
                  variableName: `${t('content.partnernetwork.columns.bpn')}`,
                  value: selectedRowBPN.bpn,
                }}
              />
              {selectedRowBPN.legalForm && (
                <DetailGridRow
                  key={t('content.partnernetwork.overlay.legalform') as string}
                  {...{
                    variableName: `${t(
                      'content.partnernetwork.overlay.legalform'
                    )}`,
                    value: selectedRowBPN.legalForm,
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
                {...{ variableName: 'Street', value: selectedRowBPN.street }}
              />
              <DetailGridRow
                key="PLZ / City"
                {...{
                  variableName: 'PLZ / City',
                  value: `${selectedRowBPN.zipCode} ${selectedRowBPN.city}`,
                }}
              />
              <DetailGridRow
                key="Country"
                {...{ variableName: 'Country', value: selectedRowBPN.country }}
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
                          identifier.type?.name ||
                          identifier.type?.technicalKey,
                        value: identifier.value,
                      }}
                    />
                  )
                }
              )}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BusinessPartnerDetailOverlay
