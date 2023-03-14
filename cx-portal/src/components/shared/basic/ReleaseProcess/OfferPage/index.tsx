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
  UploadFileStatus,
  UploadStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Divider, InputLabel } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Controller, useForm } from 'react-hook-form'
import Patterns from 'types/Patterns'
import { useEffect, useState } from 'react'
import '../ReleaseProcessSteps.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  useFetchServiceStatusQuery,
  useSaveServiceMutation,
  useUpdateDocumentUploadMutation,
} from 'features/appManagement/apiSlice'
import { Dropzone } from 'components/shared/basic/Dropzone'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { setAppStatus } from 'features/appManagement/actions'
import {
  appIdSelector,
  decrement,
  increment,
  serviceStatusDataSelector,
} from 'features/appManagement/slice'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import ProviderConnectorField from '../components/ProviderConnectorField'

type FormDataType = {
  longDescriptionEN: string
  longDescriptionDE: string
  images: any
  providerHomePage: string
  providerContactEmail: string
}

export default function OfferPage() {
  const { t } = useTranslation('servicerelease')
  const [appPageNotification, setServicePageNotification] = useState(false)
  const [appPageSnackbar, setServicePageSnackbar] = useState<boolean>(false)
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const serviceStatusData = useSelector(serviceStatusDataSelector)
  const longDescriptionMaxLength = 2000
  const fetchServiceStatus = useFetchServiceStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [saveService] = useSaveServiceMutation()

  const onBackIconClick = () => {
    dispatch(setAppStatus(fetchServiceStatus))
    dispatch(decrement())
  }

  const defaultValues = {
    longDescriptionEN:
      fetchServiceStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'en'
      )[0]?.longDescription || '',
    longDescriptionDE:
      fetchServiceStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'de'
      )[0]?.longDescription || '',
    images: fetchServiceStatus?.documents?.APP_IMAGE || [],
    providerHomePage: fetchServiceStatus?.providerUri || '',
    providerContactEmail: fetchServiceStatus?.contactEmail || '',
  }

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const dImages = defaultValues.images

  useEffect(() => {
    const imgs = dImages?.map((item: { documentName: string }) => {
      return {
        name: item.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      }
    })

    if (imgs.length > 0) {
      const setFiles = (fileIndex: number, status: UploadFileStatus) => {
        const files = imgs
        files[fileIndex] = {
          name: imgs[fileIndex].name,
          status,
        }
        setValue('images', files)
      }

      for (let fileIndex = 0; fileIndex < imgs.length; fileIndex++) {
        setFiles(fileIndex, UploadStatus.UPLOAD_SUCCESS)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dImages])

  const uploadImage = (files: any) => {
    const value = files
    if (value.length > 0) {
      const setFiles = (fileIndex: number, status: UploadFileStatus) => {
        const files = [...getValues().images] as any[]
        files[fileIndex] = {
          name: value[fileIndex].name,
          size: value[fileIndex].size,
          status,
        }
        setValue('images', files as any)
      }

      for (let fileIndex = 0; fileIndex < value.length; fileIndex++) {
        setFiles(fileIndex, UploadStatus.UPLOADING)
        uploadDocument(appId, 'APP_IMAGE', value[fileIndex])
          .then(() => setFiles(fileIndex, UploadStatus.UPLOAD_SUCCESS))
          .catch(() => setFiles(fileIndex, UploadStatus.UPLOAD_ERROR))
      }
    }
  }

  const uploadDocument = async (
    appId: string,
    documentTypeId: string,
    file: any
  ) => {
    const data = {
      appId: appId,
      documentTypeId: documentTypeId,
      body: { file },
    }

    return updateDocumentUpload(data).unwrap()
  }

  const onSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger([
      'longDescriptionEN',
      'longDescriptionDE',
      'images',
      'providerHomePage',
      'providerContactEmail',
    ])
    if (validateFields) {
      handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (data: FormDataType, buttonLabel: string) => {
    const apiBody = {
      title: serviceStatusData?.title,
      serviceTypeIds: serviceStatusData?.serviceTypeIds,
      descriptions: [
        {
          languageCode: 'en',
          longDescription: data.longDescriptionEN,
          shortDescription:
            serviceStatusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'en'
            )[0]?.shortDescription || '',
        },
        {
          languageCode: 'de',
          longDescription: data.longDescriptionDE,
          shortDescription:
            serviceStatusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'de'
            )[0]?.shortDescription || '',
        },
      ],
      privacyPolicies: [],
      salesManager: null,
      price: '',
      providerUri: data.providerHomePage || '',
      contactEmail: data.providerContactEmail || '',
      leadPictureUri: serviceStatusData?.leadPictureUri,
    }

    try {
      await saveService({
        id: appId,
        body: apiBody,
      }).unwrap()
      buttonLabel === 'saveAndProceed' && dispatch(increment())
      buttonLabel === 'save' && setServicePageSnackbar(true)
    } catch (error: any) {
      setServicePageNotification(true)
    }
  }

  return (
    <div className="app-page">
      <ReleaseStepHeader
        title={t('step2.headerTitle')}
        description={t('step2.headerDescription')}
      />
      <form className="header-description">
        <div className="form-field">
          {['longDescriptionEN', 'longDescriptionDE'].map(
            (longDesc: string) => (
              <div key={longDesc}>
                <ConnectorFormInputFieldShortAndLongDescription
                  {...{
                    control,
                    trigger,
                    errors,
                  }}
                  item={longDesc}
                  label={
                    <>
                      {t(`step2.${longDesc}`) + ' *'}
                      <IconButton sx={{ color: '#939393' }} size="small">
                        <HelpOutlineIcon />
                      </IconButton>
                    </>
                  }
                  value={
                    (longDesc === 'longDescriptionEN'
                      ? getValues().longDescriptionEN.length
                      : getValues().longDescriptionDE.length) +
                    `/${longDescriptionMaxLength}`
                  }
                  patternKey="longDescriptionEN"
                  patternEN={Patterns.appPage.longDescriptionEN}
                  patternDE={Patterns.appPage.longDescriptionDE}
                  rules={{
                    maxLength: `${t('serviceReleaseForm.maximum')} 255 ${t(
                      'serviceReleaseForm.charactersAllowed'
                    )}`,
                    required:
                      t(`step2.${longDesc}`) +
                      t('serviceReleaseForm.isMandatory'),
                    minLength: `${t('serviceReleaseForm.minimum')} 10 ${t(
                      'serviceReleaseForm.charactersRequired'
                    )}`,
                    pattern: `${t(
                      'serviceReleaseForm.validCharactersIncludes'
                    )} ${
                      longDesc === 'longDescriptionEN'
                        ? `a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:`
                        : `a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:`
                    }`,
                  }}
                  maxLength={255}
                  minLength={10}
                />
              </div>
            )
          )}
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <div className="form-field">
          <InputLabel sx={{ mb: 3, mt: 3 }}>{t('step2.doc')}</InputLabel>
          <Controller
            render={({ field: { onChange: reactHookFormOnChange, value } }) => {
              return (
                <Dropzone
                  files={value}
                  onChange={(files, addedFiles, deletedFiles) => {
                    if (deletedFiles?.length) {
                      //to do: to call 'useDeleteDocumentMutation' on delete
                      console.log('deletedFile', deletedFiles)
                    }
                    reactHookFormOnChange(files)
                    trigger('images')
                    addedFiles && uploadImage(files)
                  }}
                  acceptFormat={{
                    'image/png': [],
                    'image/jpeg': [],
                  }}
                  maxFilesToUpload={1}
                  maxFileSize={819200}
                />
              )
            }}
            name="images"
            control={control}
            rules={{ required: false }}
          />
          <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
            {t('serviceReleaseForm.note')}
          </Typography>
          <Typography variant="body2" mb={3}>
            {t('serviceReleaseForm.max1Images')}
          </Typography>
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>{t('step2.providerDetails')}</InputLabel>
        <ProviderConnectorField
          {...{
            control,
            trigger,
            errors,
          }}
          name="providerHomePage"
          label={t('step2.providerHomePage')}
          pattern={Patterns.URL}
          ruleMessage={t('step2.pleaseEnterValidHomePageURL')}
        />

        <ProviderConnectorField
          {...{
            control,
            trigger,
            errors,
          }}
          name="providerContactEmail"
          label={t('step2.providerContactEmail')}
          pattern={Patterns.MAIL}
          ruleMessage={t('step2.pleaseEnterValidEmail')}
        />
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={appPageNotification}
        pageSnackBarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        pageSnackbar={appPageSnackbar}
        setPageNotification={() => setServicePageNotification(false)}
        setPageSnackbar={() => setServicePageSnackbar(false)}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) => onSubmit(data, 'save'))}
        onSaveAndProceed={handleSubmit((data) =>
          onSubmit(data, 'saveAndProceed')
        )}
        isValid={isValid}
      />
    </div>
  )
}
