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

import {
  Button,
  IconButton,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ConnectorFormInputField } from '../AppMarketCard'
import { useDispatch } from 'react-redux'
import { decrement, increment } from 'features/appManagement/slice'

type FormDataType = {
  agreements: any[]
}

export default function ContractAndConsent() {
  const { t } = useTranslation()
  const [contractNotification, setContractNotification] = useState(false)
  const dispatch = useDispatch()

  const consentData = {
    agreements: [
      {
        agreementId: '1',
        name: 'App Publishing Consent1',
      },
      {
        agreementId: '2',
        name: 'App Publishing Consent2',
      },
    ],
  }

  const consent = {
    agreements: [
      {
        agreementId: '1',
        consentStatus: 'ACTIVE',
      },
      {
        agreementId: '2',
        consentStatus: 'INACTIVE',
      },
    ],
  }

  const agreementData = consentData.agreements.map((item: any, index: number) =>
    Object.assign({}, item, consent.agreements[index])
  )

  const defaultValues = {
    agreements: [],
  }

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onContractConsentSubmit = async (data: FormDataType) => {
    const validateFields = await trigger(['agreements'])
    if (validateFields) {
      handleSave(data)
    }
  }

  const handleSave = async (data: FormDataType) => {
    dispatch(increment())
    setContractNotification(true)
  }

  return (
    <div className="contract-consent">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.contractAndConsent.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 9 }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.contractAndConsent.headerDescription')}
          </Typography>
        </Grid>
      </Grid>
      <form className="header-description">
        {agreementData?.map((item) => (
          <div className="form-field" key={item}>
            <ConnectorFormInputField
              {...{
                control,
                trigger,
                errors,
                name: item.agreementId,
                label: item.name,
                type: 'checkbox',
                rules: {
                  required: {
                    value: true,
                    message: `${item.name} ${t(
                      'content.apprelease.appReleaseForm.isMandatory'
                    )}`,
                  },
                },
              }}
            />
          </div>
        ))}
      </form>
      <Box mb={2}>
        {contractNotification && (
          <Grid container xs={12} sx={{ mb: 2 }}>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <PageNotifications
                title={t('content.apprelease.appReleaseForm.error.title')}
                description={t(
                  'content.apprelease.appReleaseForm.error.message'
                )}
                open
                severity="error"
                onCloseNotification={() => setContractNotification(false)}
              />
            </Grid>
          </Grid>
        )}
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          startIcon={<HelpOutlineIcon />}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton color="secondary" onClick={() => dispatch(decrement())}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          variant="contained"
          disabled={!isValid}
          sx={{ float: 'right' }}
          onClick={handleSubmit(onContractConsentSubmit)}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit(onContractConsentSubmit)}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </div>
  )
}
