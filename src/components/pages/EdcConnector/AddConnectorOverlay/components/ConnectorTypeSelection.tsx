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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Checkbox } from '@catena-x/portal-shared-components'
import { Box, Grid } from '@mui/material'
import { CompanyDetails, CompanyRoleEnum } from 'features/admin/userApiSlice'
// Static content
// Add Connector Button action modal first step content
const ConnectorTypeSelection = ({
  selectedServiceCallback,
  ownCompanyDetails,
}: {
  selectedServiceCallback: (selected: any) => any
  ownCompanyDetails?: CompanyDetails
}) => {
  const { t } = useTranslation()
  const checkBoxSelector = [
    {
      title: t('content.edcconnector.modal.companyconnectorlabel'),
      type: 'COMPANY_CONNECTOR',
      descritpion: t('content.edcconnector.modal.company.intro'),
      id: 1,
      disable:
        !ownCompanyDetails?.companyRole ||
        ownCompanyDetails?.companyRole?.length === 0,
      disableDescription: t(
        'content.edcconnector.modal.company.disableDescription'
      ),
    },
    {
      title: t('content.edcconnector.modal.connectorasaservice'),
      type: 'MANAGED_CONNECTOR',
      descritpion: t('content.edcconnector.modal.managed.intro'),
      id: 2,
      disable:
        !ownCompanyDetails?.companyRole ||
        ownCompanyDetails?.companyRole?.length === 0 ||
        (!ownCompanyDetails?.companyRole.includes(
          CompanyRoleEnum.SERVICE_PROVIDER
        ) &&
          !ownCompanyDetails?.companyRole.includes(
            CompanyRoleEnum.APP_PROVIDER
          )),
      disableDescription: t(
        'content.edcconnector.modal.managed.disableDescription'
      ),
    },
  ]

  const [selectedCheckBox, setSelectedCheckBox] = useState({ id: 0 })
  return (
    <div className={'connector-type-selector-container'}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1.5} style={{ marginTop: 0 }}>
          {checkBoxSelector.map((checkBox, index) => {
            return (
              <Grid
                key={checkBox.id}
                xs={12}
                item
                className={
                  checkBoxSelector.length === index + 1 ? '' : 'dotted-gradient'
                }
              >
                <Checkbox
                  disabled={checkBox.disable}
                  label={checkBox.title}
                  checked={checkBox.id === selectedCheckBox.id}
                  onChange={(e) => {
                    setSelectedCheckBox(checkBox)
                    selectedServiceCallback(checkBox)
                  }}
                />
                {checkBox.disable ? (
                  <Typography
                    variant="body3"
                    color={'#F2BA00'}
                    style={{ marginLeft: '30px' }}
                  >
                    {checkBox.disableDescription}
                  </Typography>
                ) : (
                  <Typography variant="body3" style={{ marginLeft: '30px' }}>
                    {checkBox.descritpion}
                  </Typography>
                )}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}

export default ConnectorTypeSelection
