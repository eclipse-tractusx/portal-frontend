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
  Card,
  Checkbox,
  IconButton,
  Input,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Grid, Divider, Box, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrement } from 'features/appManagement/slice'
import { Dropzone } from 'components/shared/basic/Dropzone'

export default function ValidateAndPublish() {
  const { t } = useTranslation()
  const [validatePublishNotification, setValidatePublishNotification] =
    useState(false)
  const dispatch = useDispatch()

  const defaultValues = {
    title: 'Digital Twin Aspect Debugger',
    provider: 'Catena-X',
    leadPictureUri:
      'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png',
    providerName: 'providerName via app.providerId',
    useCase: ['use case'],
    descriptions: [
      {
        languageCode: 'en',
        shortDescription: 'short description EN, Lorem ipsum',
      },
      {
        languageCode: 'de',
        shortDescription: 'short description DE, Lorem ipsum',
      },
      {
        languageCode: 'en',
        longDescription: 'long description EN, Lorem ipsum',
      },
      {
        languageCode: 'de',
        longDescription: 'long description DE, Lorem ipsum',
      },
    ],
    agreements: [
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Consent',
      },
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Consent',
      },
    ],
    betaTest: [
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Client',
      },
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Technical User',
      },
    ],
    technicalConnection: [
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Security Trivy Run',
      },
      {
        agreementId: 'uuid',
        consentStatus: 'ACTIVE',
        name: 'Security Checkov Run',
      },
    ],
    supportedLanguageCodes: ['en'],
    price: 'price',
    images: ['string'],
    providerUri: 'provider homepage',
    contactEmail: 'test@test.com',
    contactNumber: '+91 999999999',
  }

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onValidatePublishSubmit = async (data: any) =>
    setValidatePublishNotification(true)

  const providerDetailsValues = (item: string) => {
    if (item === 'providerHomePage') return defaultValues.providerUri
    else if (item === 'providerContactEmail') return defaultValues.contactEmail
    else return defaultValues.contactNumber
  }

  return (
    <div className="validate-and-publish">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.validateAndPublish.headerTitle')}
      </Typography>
      <Typography variant="body2" className="header-description" align="center">
        {t('content.apprelease.validateAndPublish.headerDescription')}
      </Typography>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        {t('content.apprelease.validateAndPublish.appCardDetails')}
      </Typography>

      <Grid container spacing={2}>
        <Grid
          item
          md={3}
          sx={{ mt: 0, mr: 'auto', mb: 10, ml: 'auto' }}
          className={'app-release-card'}
        >
          <Card
            image={{
              src: `${defaultValues.leadPictureUri}`,
              alt: 'cardImage Alt',
            }}
            title={defaultValues.title}
            subtitle={defaultValues.provider}
            description={defaultValues?.descriptions[0]?.shortDescription}
            imageSize="normal"
            imageShape="square"
            variant="text-details"
            expandOnHover={false}
            filledBackground={true}
            buttonText={''}
          />
        </Grid>

        <Grid item md={9} sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}>
          {['appTitle', 'appProvider'].map((item) => (
            <div className="form-field">
              <Input
                label={t(`content.apprelease.appMarketCard.${item}`) + ' *'}
                value={
                  item === 'appTitle'
                    ? defaultValues.title
                    : defaultValues.provider
                }
                disabled={true}
              />
            </div>
          ))}
          {['shortDescriptionEN', 'shortDescriptionDE'].map((item) => (
            <div className="form-field">
              <Input
                label={
                  <>
                    {t(`content.apprelease.appMarketCard.${item}`) + ' *'}
                    <IconButton sx={{ color: '#939393' }} size="small">
                      <HelpOutlineIcon />
                    </IconButton>
                  </>
                }
                value={
                  item === 'shortDescriptionEN'
                    ? defaultValues?.descriptions[0]?.shortDescription
                    : defaultValues?.descriptions[1]?.shortDescription
                }
                disabled={true}
                multiline
                minRows={3}
                maxRows={3}
                sx={{
                  '.MuiFilledInput-root': { padding: '0px 12px 0px 0px' },
                }}
              />
              <Typography variant="body2" className="form-field" align="right">
                {(item === 'shortDescriptionEN'
                  ? defaultValues?.descriptions &&
                    defaultValues?.descriptions[0]?.shortDescription?.length
                  : defaultValues?.descriptions &&
                    defaultValues?.descriptions[1]?.shortDescription?.length) +
                  `/255`}
              </Typography>
            </div>
          ))}
          <div className="form-field">
            <Input
              label={
                t(`content.apprelease.appMarketCard.useCaseCategory`) + ' *'
              }
              value={defaultValues.useCase}
              disabled={true}
            />
          </div>
          <Divider sx={{ mb: 2, mr: -2, ml: -2, mt: 8 }} />
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            {t('content.apprelease.appPage.headerTitle')}
          </Typography>

          {['longDescriptionEN', 'longDescriptionDE'].map((item) => (
            <div className="form-field">
              <Input
                label={
                  <>
                    {t(`content.apprelease.appPage.${item}`) + ' *'}
                    <IconButton sx={{ color: '#939393' }} size="small">
                      <HelpOutlineIcon />
                    </IconButton>
                  </>
                }
                value={
                  item === 'longDescriptionEN'
                    ? defaultValues?.descriptions[2]?.longDescription
                    : defaultValues?.descriptions[3]?.longDescription
                }
                disabled={true}
                multiline
                minRows={3}
                maxRows={3}
                sx={{
                  '.MuiFilledInput-root': { padding: '0px 12px 0px 0px' },
                }}
              />
              <Typography variant="body2" className="form-field" align="right">
                {(item === 'longDescriptionEN'
                  ? defaultValues?.descriptions &&
                    defaultValues?.descriptions[2]?.longDescription?.length
                  : defaultValues?.descriptions &&
                    defaultValues?.descriptions[3]?.longDescription?.length) +
                  `/2000`}
              </Typography>
            </div>
          ))}

          <Divider sx={{ mb: 2, mr: -2, ml: -2, mt: 8 }} />
          <div className="form-field">
            <InputLabel sx={{ mb: 3, mt: 3 }}>
              {t('content.apprelease.appPage.images') + ' *'}
            </InputLabel>
            <Dropzone onFileDrop={(files: any) => {}} />
            <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
              {t('content.apprelease.appReleaseForm.note')}
            </Typography>
            <Typography variant="body2" mb={3}>
              {t('content.apprelease.appReleaseForm.max3Images')}
            </Typography>
          </div>
          <Divider sx={{ mb: 2, mr: -2, ml: -2, mt: 8 }} />

          {['connectData', 'dataSecurityInformation'].map((item) => (
            <div className="form-field">
              <Input
                label={
                  <>
                    {t(`content.apprelease.appPage.${item}`) + ' *'}
                    <IconButton sx={{ color: '#939393' }} size="small">
                      <HelpOutlineIcon />
                    </IconButton>
                  </>
                }
                disabled={true}
                multiline
                minRows={3}
                maxRows={3}
                sx={{
                  '.MuiFilledInput-root': { padding: '0px 12px 0px 0px' },
                }}
              />
              <Typography variant="body2" className="form-field" align="right">
                {`0/255`}
              </Typography>
            </div>
          ))}
          {[
            'uploadDataPrerequisits',
            'uploadTechnicalGuide',
            'uploadDataContract',
            'uploadAppContract',
          ].map((item: string) => (
            <>
              <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
              <div className="form-field">
                <InputLabel sx={{ mb: 3, mt: 3 }}>
                  {t(`content.apprelease.appPage.${item}`) + ' *'}
                </InputLabel>
                <Dropzone onFileDrop={(files: any) => {}} />
              </div>
            </>
          ))}

          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <InputLabel sx={{ mb: 3 }}>
            {t('content.apprelease.appPage.providerDetails')}
          </InputLabel>
          {[
            'providerHomePage',
            'providerContactEmail',
            'providerPhoneContact',
          ].map((item: string) => (
            <div className="form-field">
              <Input
                label={t(`content.apprelease.appPage.${item}`) + ' *'}
                value={providerDetailsValues(item)}
                disabled={true}
              />
            </div>
          ))}
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            {t('content.apprelease.contractAndConsent.headerTitle')}
          </Typography>
          <div className="form-field">
            {defaultValues.agreements?.map((item: any) => (
              <div>
                <Checkbox label={item.name} checked={item.consentStatus} />
              </div>
            ))}
          </div>
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            {t('content.apprelease.technicalIntegration.headerTitle')}
          </Typography>
          <div className="form-field">
            {defaultValues.technicalConnection?.map((item: any) => (
              <div>
                <Checkbox label={item.name} checked={item.consentStatus} />
              </div>
            ))}
          </div>
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            {t('content.apprelease.betaTest.headerTitle')}
          </Typography>
          <div className="form-field">
            {defaultValues.betaTest?.map((item: any) => (
              <div>
                <Checkbox label={item.name} checked={item.consentStatus} />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
      <Box mb={2}>
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          startIcon={<HelpOutlineIcon />}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton color="secondary" onClick={() => dispatch(decrement())}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          onClick={handleSubmit(onValidatePublishSubmit)}
          variant="contained"
          disabled={!isValid}
          sx={{ float: 'right' }}
        >
          {t('content.apprelease.footerButtons.submit')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          disabled
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
      {validatePublishNotification && (
        <div className="errorMsg">
          <PageNotifications
            title={t('content.apprelease.appReleaseForm.error.title')}
            description={t('content.apprelease.appReleaseForm.error.message')}
            open
            severity="error"
            onCloseNotification={() => setValidatePublishNotification(false)}
          />
        </div>
      )}
    </div>
  )
}
