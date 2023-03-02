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
  IconButton,
  LogoGrayData,
  UploadFileStatus,
  UploadStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
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
import ConnectorFormInputFieldShortDescription from '../CommonFiles/ConnectorFormInputFieldShortDescription'
import ConnectorFormInputFieldTitleAndProvider from '../CommonFiles/ConnectorFormInputFieldTitleAndProvider'
import ConnectorFormInputFieldImage from '../CommonFiles/ConnectorFormInputFieldImage'
import Patterns from 'types/Patterns'
import ReleaseStepHeader from '../CommonFiles/ReleaseStepHeader'

export default function OfferCard() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const [appCardNotification, setAppCardNotification] = useState(false)
  const [appCardSnackbar, setAppCardSnackbar] = useState<boolean>(false)
  const serviceStatusDate = useSelector(appStatusDataSelector)
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [cardImage, setCardImage] = useState(LogoGrayData)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data

  const defaultValues = {
    title: serviceStatusDate?.title,
    provider: serviceStatusDate?.provider,
    shortDescriptionEN:
      serviceStatusDate?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'en'
      )[0]?.shortDescription || '',
    shortDescriptionDE:
      serviceStatusDate?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'de'
      )[0]?.shortDescription || '',
    uploadImage: {
      leadPictureUri: cardImage === LogoGrayData ? null : cardImage,
      alt: serviceStatusDate?.leadPictureUri || '',
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

  const offerImageData: any = getValues().uploadImage.leadPictureUri
  useEffect(() => {
    if (offerImageData !== null && offerImageData !== LogoGrayData) {
      let isFile: any = offerImageData instanceof File

      if (isFile) {
        const blobFile = new Blob([offerImageData], {
          type: 'image/png',
        })
        setCardImage(URL.createObjectURL(blobFile))
      }
    }
  }, [offerImageData])

  useEffect(() => {
    if (
      serviceStatusDate?.documents?.APP_LEADIMAGE &&
      serviceStatusDate?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchCardImage(
        serviceStatusDate?.documents?.APP_LEADIMAGE[0].documentId,
        serviceStatusDate?.documents?.APP_LEADIMAGE[0].documentName
      )
    }
    reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceStatusDate])

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
      <ReleaseStepHeader
        title={t('step1.headerTitle')}
        description={t('step1.headerDescription')}
      />
      <Grid container spacing={2} sx={{ mt: 10 }}>
        <Grid item md={8} sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}>
          <form>
            <ConnectorFormInputFieldTitleAndProvider
              {...{
                control,
                trigger,
                errors,
              }}
              name="title"
              pattern={Patterns.appMarketCard.appTitle}
              label={t('step1.serviceTitle') + ' *'}
              rules={{
                required:
                  t('step1.serviceTitle') + t('serviceReleaseForm.isMandatory'),
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
            <ConnectorFormInputFieldTitleAndProvider
              {...{
                control,
                trigger,
                errors,
              }}
              name="provider"
              pattern={Patterns.appMarketCard.appProvider}
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
                        required:
                          t(`step1.${item}`) +
                          t('serviceReleaseForm.isMandatory'),
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
            <ConnectorFormInputFieldImage
              {...{
                control,
                trigger,
                errors,
              }}
              labe={t('step1.serviceLeadImageUpload') + ' *'}
              noteDescription={t('serviceReleaseForm.OnlyOneFileAllowed')}
              note={t('serviceReleaseForm.note')}
              requiredText={t('serviceReleaseForm.fileUploadIsMandatory')}
            />
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
