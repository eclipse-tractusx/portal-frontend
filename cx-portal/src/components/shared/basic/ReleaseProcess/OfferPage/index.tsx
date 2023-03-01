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

import {
  Typography,
  IconButton,
  UploadFileStatus,
  UploadStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Divider, InputLabel, Grid } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Controller, useForm } from 'react-hook-form'
import Patterns from 'types/Patterns'
import { ConnectorFormInputField } from '../AppMarketCard'
import { useEffect, useState } from 'react'
import '../ReleaseProcessSteps.scss'
import { useSelector } from 'react-redux'
import {
  appIdSelector,
} from 'features/appManagement/slice'
import {
  useFetchAppStatusQuery,
  useUpdateDocumentUploadMutation,
} from 'features/appManagement/apiSlice'
import { Dropzone } from 'components/shared/basic/Dropzone'
import SnackbarNotificationWithButtons from '../SnackbarNotificationWithButtons'

export default function OfferPage() {
  const { t } = useTranslation('servicerelease')
  const [appPageNotification, setAppPageNotification] = useState(false)
  const [appPageSnackbar, setAppPageSnackbar] = useState<boolean>(false)
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const appId = useSelector(appIdSelector)
  const longDescriptionMaxLength = 2000
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data

  const defaultValues = {
    longDescriptionEN:
      fetchAppStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'en'
      )[0]?.longDescription || '',
    longDescriptionDE:
      fetchAppStatus?.descriptions?.filter(
        (appStatus: any) => appStatus.languageCode === 'de'
      )[0]?.longDescription || '',
    images: fetchAppStatus?.documents?.APP_IMAGE || [],
    providerHomePage: fetchAppStatus?.providerUri || '',
    providerContactEmail: fetchAppStatus?.contactEmail || '',
  }

  const {
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const defaultImages = defaultValues.images

  useEffect(() => {
    const images = defaultImages?.map((item: { documentName: string }) => {
      return {
        name: item.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      }
    })

    if (images.length > 0) {
      const setFileStatus = (fileIndex: number, status: UploadFileStatus) => {
        const nextFiles = images
        nextFiles[fileIndex] = {
          name: images[fileIndex].name,
          status,
        }
        setValue('images', nextFiles)
      }

      for (let fileIndex = 0; fileIndex < images.length; fileIndex++) {
        setFileStatus(fileIndex, UploadStatus.UPLOAD_SUCCESS)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultImages])

  const uploadImages = (files: any) => {
    const value = files
    if (value.length > 0) {
      const setFileStatus = (fileIndex: number, status: UploadFileStatus) => {
        const nextFiles = [...getValues().images] as any[]
        nextFiles[fileIndex] = {
          name: value[fileIndex].name,
          size: value[fileIndex].size,
          status,
        }
        setValue('images', nextFiles as any)
      }

      for (let fileIndex = 0; fileIndex < value.length; fileIndex++) {
        setFileStatus(fileIndex, UploadStatus.UPLOADING)
        uploadDocumentApi(appId, 'APP_IMAGE', value[fileIndex])
          .then(() => setFileStatus(fileIndex, UploadStatus.UPLOAD_SUCCESS))
          .catch(() => setFileStatus(fileIndex, UploadStatus.UPLOAD_ERROR))
      }
    }
  }

  const uploadDocumentApi = async (
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

  return (
    <div className="app-page">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('step2.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto', mb: 9 }}>
          <Typography variant="body2" align="center">
            {t('step2.headerDescription')}
          </Typography>
        </Grid>
      </Grid>
      <form className="header-description">
        <div className="form-field">
          {['longDescriptionEN', 'longDescriptionDE'].map((item: string) => (
            <div key={item}>
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: item,
                  label: (
                    <>
                      {t(`step2.${item}`) + ' *'}
                      <IconButton sx={{ color: '#939393' }} size="small">
                        <HelpOutlineIcon />
                      </IconButton>
                    </>
                  ),
                  type: 'input',
                  textarea: true,
                  rules: {
                    required: {
                      value: true,
                      message:
                        t(`step2.${item}`) +
                        t('serviceReleaseForm.isMandatory'),
                    },
                    minLength: {
                      value: 10,
                      message: `${t('serviceReleaseForm.minimum')} 10 ${t(
                        'serviceReleaseForm.charactersRequired'
                      )}`,
                    },
                    pattern: {
                      value:
                        item === 'longDescriptionEN'
                          ? Patterns.appPage.longDescriptionEN
                          : Patterns.appPage.longDescriptionDE,
                      message: `${t(
                        'serviceReleaseForm.validCharactersIncludes'
                      )} ${
                        item === 'longDescriptionEN'
                          ? `a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:`
                          : `a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:`
                      }`,
                    },
                    maxLength: {
                      value: longDescriptionMaxLength,
                      message: `${t(
                        'serviceReleaseForm.maximum'
                      )} ${longDescriptionMaxLength} ${t(
                        'serviceReleaseForm.charactersAllowed'
                      )}`,
                    },
                  },
                }}
              />
              <Typography variant="body2" className="form-field" align="right">
                {(item === 'longDescriptionEN'
                  ? getValues().longDescriptionEN.length
                  : getValues().longDescriptionDE.length) +
                  `/${longDescriptionMaxLength}`}
              </Typography>
            </div>
          ))}
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <div className="form-field">
          <InputLabel sx={{ mb: 3, mt: 3 }}>
            {t('step2.images') + ' *'}
          </InputLabel>
          <Controller
            name="images"
            control={control}
            rules={{ required: true }}
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
                    addedFiles && uploadImages(files)
                  }}
                  acceptFormat={{
                    'image/png': [],
                    'image/jpeg': [],
                  }}
                  maxFilesToUpload={3}
                  maxFileSize={819200}
                />
              )
            }}
          />
          {errors?.images?.type === 'required' && (
            <Typography variant="body2" className="file-error-msg">
              {t('serviceReleaseForm.fileUploadIsMandatory')}
            </Typography>
          )}
        </div>

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <InputLabel sx={{ mb: 3 }}>{t('step2.providerDetails')}</InputLabel>
        <div className="form-field">
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'providerHomePage',
              label: t('step2.providerHomePage'),
              type: 'input',
              rules: {
                pattern: {
                  value: Patterns.URL,
                  message: t('step2.pleaseEnterValidHomePageURL'),
                },
              },
            }}
          />
        </div>

        <div className="form-field">
          <ConnectorFormInputField
            {...{
              control,
              trigger,
              errors,
              name: 'providerContactEmail',
              label: t('step2.providerContactEmail'),
              type: 'input',
              rules: {
                pattern: {
                  value: Patterns.MAIL,
                  message: t('step2.pleaseEnterValidEmail'),
                },
              },
            }}
          />
        </div>
      </form>
      <SnackbarNotificationWithButtons
        appPageNotification={appPageNotification}
        appPageSnackbar={appPageSnackbar}
        setAppPageNotification={setAppPageNotification}
        setAppPageSnackbar={setAppPageSnackbar}
      />
    </div>
  )
}
