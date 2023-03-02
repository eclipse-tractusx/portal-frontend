/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import {
  Typography,
  IconButton,
  LogoGrayData,
  UploadFileStatus,
  UploadStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid, InputLabel } from '@mui/material'
import { useState, useEffect } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  useFetchAppStatusQuery,
  useFetchDocumentByIdMutation,
} from 'features/appManagement/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  appStatusDataSelector,
  increment,
} from 'features/appManagement/slice'
import { setAppStatus } from 'features/appManagement/actions'
import SnackbarNotificationWithButtons from '../SnackbarNotificationWithButtons'
import { ConnectorFormInputField } from '../CommonFormFiles/ConnectorFormInputField'
import ConnectorFormInputFieldShortDescription from '../CommonFormFiles/ConnectorFormInputFieldShortDescription'
import ConnectorFormInputFieldProvider from '../CommonFormFiles/ConnectorFormInputFieldProvider'
import ConnectorFormInputFieldTitle from '../CommonFormFiles/ConnectorFormInputFieldTitle'

export default function OfferCard() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const [appCardNotification, setAppCardNotification] = useState(false)
  const [appCardSnackbar, setAppCardSnackbar] = useState<boolean>(false)
  const appStatusData = useSelector(appStatusDataSelector)
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [cardImage, setCardImage] = useState(LogoGrayData)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data

  const defaultValues = {
    title: appStatusData?.title,
    provider: appStatusData?.provider,
    shortDescriptionEN:
      appStatusData?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'en'
      )[0]?.shortDescription || '',
    shortDescriptionDE:
      appStatusData?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'de'
      )[0]?.shortDescription || '',
    uploadImage: {
      leadPictureUri: cardImage === LogoGrayData ? null : cardImage,
      alt: appStatusData?.leadPictureUri || '',
    },
  }

  const {
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  const cardImageData: any = getValues().uploadImage.leadPictureUri
  useEffect(() => {
    if (cardImageData !== null && cardImageData !== LogoGrayData) {
      let isFile: any = cardImageData instanceof File

      if (isFile) {
        const blobFile = new Blob([cardImageData], {
          type: 'image/png',
        })
        setCardImage(URL.createObjectURL(blobFile))
      }
    }
  }, [cardImageData])

  useEffect(() => {
    if (
      appStatusData?.documents?.APP_LEADIMAGE &&
      appStatusData?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchCardImage(
        appStatusData?.documents?.APP_LEADIMAGE[0].documentId,
        appStatusData?.documents?.APP_LEADIMAGE[0].documentName
      )
    }
    reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStatusData])

  const fetchCardImage = async (documentId: string, documentName: string) => {
    try {
      const response = await fetchDocumentById({ appId, documentId }).unwrap()
      const file = response.data

      const setFileStatus = (status: UploadFileStatus) =>
        setValue('uploadImage.leadPictureUri', {
          name: documentName,
          status,
        } as any)
      setFileStatus(UploadStatus.UPLOAD_SUCCESS)
      return setCardImage(URL.createObjectURL(file))
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING IMAGE')
    }
  }

  return (
    <div className="app-market-card">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('step1.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto' }}>
          <Typography variant="body2" align="center">
            {t('step1.headerDescription')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 10 }}>
        <Grid item md={8} sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}>
          <form>
            <ConnectorFormInputFieldTitle
              {...{
                control,
                trigger,
                errors,
              }}
              label={t('step1.serviceTitle') + ' *'}
              rules={{
                required: `${t('step1.serviceTitle')} ${t(
                  'serviceReleaseForm.isMandatory'
                )}`,
                minLength: `${t('serviceReleaseForm.minimum')} 5 ${t(
                  'serviceReleaseForm.charactersRequired'
                )}`,
                pattern: `${t(
                  'serviceReleaseForm.validCharactersIncludes'
                )} A-Za-z0-9.:_- @&`,
                maxLength: `${t('serviceReleaseForm.maximum')} 40 ${t(
                  'serviceReleaseForm.charactersAllowed'
                )}`,
              }}
            />
            <ConnectorFormInputFieldProvider
              {...{
                control,
                trigger,
                errors,
              }}
              label={t('step1.serviceProvider') + ' *'}
              rules={{
                required: `${t('step1.serviceProvider')} ${t(
                  'serviceReleaseForm.isMandatory'
                )}`,
                minLength: `${t('serviceReleaseForm.minimum')} 5 ${t(
                  'serviceReleaseForm.charactersRequired'
                )}`,
                pattern: `${t(
                  'serviceReleaseForm.validCharactersIncludes'
                )} A-Za-z0-9.:_- @&`,
                maxLength: `${t('serviceReleaseForm.maximum')} 40 ${t(
                  'serviceReleaseForm.charactersAllowed'
                )}`,
              }}
            />

            <div className="form-field">
              {['shortDescriptionEN', 'shortDescriptionDE'].map(
                (item: string, i) => (
                  <div key={item}>
                    <ConnectorFormInputFieldShortDescription
                      {...{
                        control,
                        trigger,
                        errors,
                        item,
                      }}
                      label={
                        <>
                          {t(`step1.${item}`) + ' *'}
                          <IconButton sx={{ color: '#939393' }} size="small">
                            <HelpOutlineIcon />
                          </IconButton>
                        </>
                      }
                      value={
                        (item === 'shortDescriptionEN'
                          ? getValues().shortDescriptionEN.length
                          : getValues().shortDescriptionDE.length) + `/255`
                      }
                      rules={{
                        required: `${t(`step1.${item}`)} ${t(
                          'serviceReleaseForm.isMandatory'
                        )}`,
                        minLength: `${t('serviceReleaseForm.minimum')} 10 ${t(
                          'serviceReleaseForm.charactersRequired'
                        )}`,
                        pattern: `${t(
                          'serviceReleaseForm.validCharactersIncludes'
                        )} ${
                          item === 'shortDescriptionEN'
                            ? `a-zA-Z0-9 !?@&#'"()_-=/*.,;:`
                            : `a-zA-ZÀ-ÿ0-9 !?@&#'"()_-=/*.,;:`
                        }`,
                        maxLength: `${t('serviceReleaseForm.maximum')} 255 ${t(
                          'serviceReleaseForm.charactersAllowed'
                        )}`,
                      }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="form-field">
              <InputLabel sx={{ mb: 3, mt: 3 }}>
                {t('step1.serviceLeadImageUpload') + ' *'}
              </InputLabel>
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'uploadImage.leadPictureUri',
                  type: 'dropzone',
                  acceptFormat: {
                    'image/png': [],
                    'image/jpeg': [],
                  },
                  maxFilesToUpload: 1,
                  maxFileSize: 819200,
                  rules: {
                    required: {
                      value: true,
                    },
                  },
                }}
              />
              {errors?.uploadImage?.leadPictureUri?.type === 'required' && (
                <Typography variant="body2" className="file-error-msg">
                  {t('serviceReleaseForm.fileUploadIsMandatory')}
                </Typography>
              )}

              <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
                {t('serviceReleaseForm.note')}
              </Typography>
              <Typography variant="body2" mb={3}>
                {t('serviceReleaseForm.OnlyOneFileAllowed')}
              </Typography>
            </div>
          </form>
        </Grid>
      </Grid>
      <SnackbarNotificationWithButtons
        pageNotification={appCardNotification}
        pageSnackbar={appCardSnackbar}
        pageSnackBarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        setPageNotification={setAppCardNotification}
        setPageSnackbar={setAppCardSnackbar}
        onBackIconClick={() => navigate('/appmanagement')}
        onSave={() => dispatch(increment())}
        onSaveAndProceed={() => dispatch(increment())}
        isValid={true}
      />
    </div>
  )
}
