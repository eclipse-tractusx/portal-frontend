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

import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ConnectorFormInputField } from '../AppMarketCard'
import SnackbarNotificationWithButtons from '../SnackbarNotificationWithButtons'

export default function ContractAndConsentWithDoc() {
  const { t } = useTranslation('servicerelease')
  const [contractNotification, setContractNotification] = useState(false)
  const [contractSnackbar, setContractSnackbar] = useState<boolean>(false)
  const defaultValue = {
    agreements: [],
  }
  const agreementData = [
    {
      consentStatus: false,
      agreementId: '1',
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply",
    },
    {
      consentStatus: false,
      agreementId: '2',
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply",
    },
    {
      consentStatus: false,
      agreementId: '3',
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply",
    },
  ]

  const {
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
    mode: 'onChange',
  })

  return (
    <div className="contract-consent">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('step3.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 9 }}>
          <Typography variant="body2" align="center">
            {t('step3.headerDescription')}
          </Typography>
        </Grid>
      </Grid>
      <form className="header-description">
        {agreementData?.map((item) => (
          <div className="form-field" key={item.agreementId}>
            <ConnectorFormInputField
              {...{
                control,
                trigger,
                errors,
                name: item.agreementId,
                defaultValues: item.consentStatus,
                label: item.name,
                type: 'checkbox',
                rules: {
                  required: {
                    value: true,
                    message: `${item.name} ${t('appReleaseForm.isMandatory')}`,
                  },
                },
              }}
            />
          </div>
        ))}
      </form>
      <SnackbarNotificationWithButtons
        appPageNotification={contractNotification}
        appPageSnackbar={contractSnackbar}
        setAppPageNotification={setContractNotification}
        setAppPageSnackbar={setContractSnackbar}
      />
    </div>
  )
}
