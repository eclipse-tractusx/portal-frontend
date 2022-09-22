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
import { Typography, Checkbox } from 'cx-portal-shared-components'
import { Box, Grid, useTheme } from '@mui/material'

// Static content
// Add Connector Button action modal first step content
const ConnectorTypeSelection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing, palette } = theme

  return (
    <div className={'connector-type-selector-container'}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1.5} style={{ marginTop: 0 }}>
          <Grid
            xs={12}
            item
            style={{
              padding: spacing(2),
            }}
            className={'dotted-gradient'}
          >
            <Checkbox
              label={
                t('content.edcconnector.modal.companyconnectorlabel') as string
              }
              checked
            />
            <Typography variant="body2" style={{ margin: '5px 0px 16px 30px' }}>
              This is the only value available now
            </Typography>

            <Typography variant="body2" style={{ marginLeft: '30px' }}>
              Lörem ipsum kavis asm. Gos fan. Eusida dida. Topopp difeligen nyck
              till fysoras. Gaskapet prelaras, syning diheten alltså piporat
            </Typography>
          </Grid>
          <Grid
            xs={12}
            item
            style={{
              padding: spacing(2),
            }}
            className={'dotted-gradient'}
          >
            <Checkbox
              label={
                t('content.edcconnector.modal.connectorasaservice') as string
              }
              disabled
            />
            <Typography
              variant="body2"
              style={{ margin: '5px 0px 16px 30px', color: palette.grey.A400 }}
            >
              This option NOT AVAILABLE yet
            </Typography>

            <Typography
              variant="body2"
              style={{ marginLeft: '30px', color: palette.grey.A400 }}
            >
              Lörem ipsum kavis asm. Gos fan. Eusida dida. Topopp difeligen nyck
              till fysoras. Gaskapet prelaras, syning diheten alltså piporat.
              Kinas
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default ConnectorTypeSelection
