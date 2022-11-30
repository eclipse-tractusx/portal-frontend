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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Checkbox } from 'cx-portal-shared-components'
import { Box, Grid } from '@mui/material'

// Static content
// Add Connector Button action modal first step content
const ConnectorTypeSelection = ({
  selectedServiceCallback,
}: {
  selectedServiceCallback: (selected: any) => any
}) => {
  const { t } = useTranslation()

  const checkBoxSelector = [
    {
      title: t('content.edcconnector.modal.companyconnectorlabel'),
      type: 'COMPANY_CONNECTOR',
      subTitle: 'This is available now',
      descritpion:
        'Lörem ipsum kavis asm. Gos fan. Eusida dida. Topopp difeligen nyck till fysoras. Gaskapet prelaras, syning diheten alltså piporat',
      id: 1,
    },
    {
      title: t('content.edcconnector.modal.connectorasaservice'),
      type: 'MANAGED_CONNECTOR',
      subTitle: 'This is also available now',
      descritpion:
        'Lörem ipsum kavis asm. Gos fan. Eusida dida. Topopp difeligen nyck till fysoras. Gaskapet prelaras, syning diheten alltså piporat',
      id: 2,
    },
  ]

  const [selectedCheckBox, setSelectedCheckBox] = useState({ id: 0 })

  return (
    <div className={'connector-type-selector-container'}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1.5} style={{ marginTop: 0 }}>
          {checkBoxSelector.map((checkBox: any) => {
            return (
              <Grid xs={12} item className={'dotted-gradient'}>
                <Checkbox
                  label={checkBox.title}
                  checked={checkBox.id === selectedCheckBox.id}
                  onChange={(e) => {
                    setSelectedCheckBox(checkBox)
                    selectedServiceCallback(checkBox)
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ margin: '5px 0px 16px 30px' }}
                >
                  {checkBox.subTitle}
                </Typography>

                <Typography variant="body2" style={{ marginLeft: '30px' }}>
                  {checkBox.descritpion}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}

export default ConnectorTypeSelection
