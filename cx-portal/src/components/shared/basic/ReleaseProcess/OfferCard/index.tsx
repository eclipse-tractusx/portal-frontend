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
import { useState, useEffect, useCallback, useMemo } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import ConnectorFormInputFieldShortAndLongDescription from '../components/ConnectorFormInputFieldShortAndLongDescription'
import CommonConnectorFormInputField from '../components/CommonConnectorFormInputField'
import ConnectorFormInputFieldImage from '../components/ConnectorFormInputFieldImage'
import Patterns from 'types/Patterns'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import { DropzoneFile } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import { LanguageStatusType } from 'features/appManagement/types'
import {
  serviceIdSelector,
  serviceStatusDataSelector,
  serviceReleaseStepIncrement,
} from 'features/serviceManagement/slice'
import {
  CreateServiceStep1Item,
  ServiceTypeIdsType,
  useCreateServiceMutation,
  useFetchNewDocumentByIdMutation,
  useFetchServiceStatusQuery,
  useFetchServiceTypeIdsQuery,
  useSaveServiceMutation,
} from 'features/serviceManagement/apiSlice'
import {
  setServiceId,
  setServiceStatus,
} from 'features/serviceManagement/actions'
import { ButtonLabelTypes } from '..'

type FormDataType = {
  title: string
  serviceTypeIds: string[]
  shortDescriptionEN: string
  shortDescriptionDE: string
  uploadImage: {
    leadPictureUri: DropzoneFile | string | null
    alt?: string
  }
  price: string | null
}

export default function OfferCard() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const serviceId = 'd0e16a33-7415-48d9-be5a-385cb1f7d1cb'
  const [serviceCardNotification, setServiceCardNotification] = useState(false)
  const [serviceCardSnackbar, setServiceCardSnackbar] = useState<boolean>(false)
  const serviceStatusData = useSelector(serviceStatusDataSelector)
  const [fetchDocumentById] = useFetchNewDocumentByIdMutation()
  const [cardImage, setCardImage] = useState(LogoGrayData)
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId ?? '').data
  const [createService] = useCreateServiceMutation()
  const [saveService] = useSaveServiceMutation()
  const [defaultServiceTypeVal, setDefaultServiceTypeVal] = useState<
    ServiceTypeIdsType[]
  >([])
  const serviceTypeData = useFetchServiceTypeIdsQuery()
  const serviceTypeIds = useMemo(() => serviceTypeData.data, [serviceTypeData])

  const defaultValues = useMemo(() => {
    return {
      title: fetchServiceStatus?.title,
      serviceTypeIds: fetchServiceStatus?.serviceTypeIds.map(
        (item: string, index: number) => {
          return {
            name: item,
            serviceTypeId: index,
          }
        }
      ),
      price: null,
      shortDescriptionEN:
        fetchServiceStatus?.descriptions?.filter(
          (serviceStatus: LanguageStatusType) =>
            serviceStatus.languageCode === 'en'
        )[0]?.shortDescription || '',
      shortDescriptionDE:
        fetchServiceStatus?.descriptions?.filter(
          (serviceStatus: LanguageStatusType) =>
            serviceStatus.languageCode === 'de'
        )[0]?.shortDescription || '',
      uploadImage: {
        leadPictureUri: cardImage === LogoGrayData ? null : cardImage,
        alt: fetchServiceStatus?.leadPictureUri || '',
      },
    }
  }, [fetchServiceStatus, cardImage])

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const fetchCardImage = useCallback(
    async (documentId: string, documentName: string) => {
      try {
        const response = await fetchDocumentById({
          appId: serviceId,
          documentId,
        }).unwrap()
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
    },
    [fetchDocumentById, serviceId, setValue]
  )

  useEffect(() => {
    if (
      serviceStatusData?.documents?.APP_LEADIMAGE &&
      serviceStatusData?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchCardImage(
        serviceStatusData?.documents?.APP_LEADIMAGE[0].documentId,
        serviceStatusData?.documents?.APP_LEADIMAGE[0].documentName
      )
    }
    if (serviceStatusData && serviceStatusData.serviceTypeIds) {
      setDefaultServiceTypeVal(
        serviceStatusData?.serviceTypeIds.map((item: string, index: number) => {
          return {
            name: item,
            serviceTypeId: index,
          }
        })
      )
    }
  }, [serviceStatusData, fetchCardImage])

  useEffect(() => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
    reset(defaultValues)
  }, [dispatch, fetchServiceStatus, defaultValues, reset])

  const handleSave = async (
    apiBody: CreateServiceStep1Item,
    buttonLabel: string
  ) => {
    await saveService({
      id: serviceId,
      body: apiBody,
    })
      .unwrap()
      .then(() => {
        dispatch(setServiceId(serviceId))
        buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
          dispatch(serviceReleaseStepIncrement())
        buttonLabel === ButtonLabelTypes.SAVE && setServiceCardSnackbar(true)
        if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
      })
      .catch(() => {
        setServiceCardNotification(true)
      })
  }

  const handleCreate = async (
    apiBody: CreateServiceStep1Item,
    buttonLabel: string
  ) => {
    await createService({
      id: '',
      body: apiBody,
    })
      .unwrap()
      .then((result) => {
        if (isString(result)) {
          //TO-DO Image file upload
          dispatch(setServiceId(result))
          buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED &&
            dispatch(serviceReleaseStepIncrement())
          buttonLabel === ButtonLabelTypes.SAVE && setServiceCardSnackbar(true)
        }
      })
      .catch(() => {
        setServiceCardNotification(true)
      })
  }

  const onSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger([
      'title',
      'serviceTypeIds',
      'shortDescriptionEN',
      'shortDescriptionDE',
    ])
    const apiBody = {
      serviceTypeIds: data.serviceTypeIds,
      title: data.title,
      leadPictureUri:
        data.uploadImage.leadPictureUri !== null &&
        Object.keys(data.uploadImage.leadPictureUri).length > 0 &&
        Object.values(data.uploadImage.leadPictureUri)[0],
      descriptions: [
        {
          languageCode: 'de',
          longDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: LanguageStatusType) =>
                serviceStatus.languageCode === 'de'
            )[0]?.longDescription || '',
          shortDescription: data.shortDescriptionDE || '',
        },
        {
          languageCode: 'en',
          longDescription:
            serviceStatusData?.descriptions?.filter(
              (serviceStatus: LanguageStatusType) =>
                serviceStatus.languageCode === 'en'
            )[0]?.longDescription || '',
          shortDescription: data.shortDescriptionEN || '',
        },
      ],
      privacyPolicies: [],
      salesManager: null,
      price: '',
      providerUri: '',
      contactEmail: '',
    }
    if (validateFields) {
      if (serviceId) {
        handleSave(apiBody, buttonLabel)
      } else {
        handleCreate(apiBody, buttonLabel)
      }
    }
  }

  return (
    <div className="app-market-card">
      <ReleaseStepHeader
        title={t('step1.headerTitle')}
        description={t('step1.headerDescription')}
      />
      <Grid container spacing={2}>
        <Grid item md={8} sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}>
          <form>
            <CommonConnectorFormInputField
              {...{
                control,
                trigger,
                errors,
              }}
              name="title"
              pattern={Patterns.offerCard.serviceName}
              label={t('step1.serviceName')}
              rules={{
                required: `${t('step1.serviceName')} ${t(
                  'serviceReleaseForm.isMandatory'
                )}`,
                minLength: `${t('serviceReleaseForm.minimum')} 3 ${t(
                  'serviceReleaseForm.charactersRequired'
                )}`,
                pattern: `${t(
                  'serviceReleaseForm.validCharactersIncludes'
                )} A-Za-z0-9.:_- @&`,
                maxLength: `${t('serviceReleaseForm.maximum')} 20 ${t(
                  'serviceReleaseForm.charactersAllowed'
                )}`,
              }}
              maxLength={20}
              minLength={3}
            />

            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'serviceTypeIds',
                  label: t('step1.serviceType'),
                  placeholder: t('step1.serviceTypePlaceholder'),
                  type: 'multiSelectList',
                  rules: {
                    required: {
                      value: true,
                      message: `${t('step1.serviceType')} ${t(
                        'serviceReleaseForm.isMandatory'
                      )}`,
                    },
                    pattern: {
                      value: Patterns.offerCard.serviceType,
                      message: `${t(
                        'serviceReleaseForm.validCharactersIncludes'
                      )} A-Za-z`,
                    },
                  },
                  items: serviceTypeIds || [],
                  keyTitle: 'name',
                  saveKeyTitle: 'name',
                  notItemsText: t('serviceReleaseForm.noItemsSelected'),
                  buttonAddMore: t('serviceReleaseForm.addMore'),
                  defaultValues: defaultServiceTypeVal,
                }}
              />
            </div>

            <div className="form-field">
              {['shortDescriptionEN', 'shortDescriptionDE'].map(
                (desc: string, i) => (
                  <div key={desc}>
                    <ConnectorFormInputFieldShortAndLongDescription
                      {...{
                        control,
                        trigger,
                        errors,
                      }}
                      item={desc}
                      label={
                        <>
                          {t(`step1.${desc}`)}
                          <IconButton sx={{ color: '#939393' }} size="small">
                            <HelpOutlineIcon />
                          </IconButton>
                        </>
                      }
                      value={
                        (desc === 'shortDescriptionEN'
                          ? getValues().shortDescriptionEN.length
                          : getValues().shortDescriptionDE.length) + `/120`
                      }
                      patternKey="shortDescriptionEN"
                      patternEN={Patterns.offerCard.shortDescriptionEN}
                      patternDE={Patterns.offerCard.shortDescriptionDE}
                      isRequired={false}
                      rules={{
                        required:
                          t(`step1.${desc}`) +
                          t('serviceReleaseForm.isMandatory'),
                        minLength: `${t('serviceReleaseForm.minimum')} 10 ${t(
                          'serviceReleaseForm.charactersRequired'
                        )}`,
                        pattern: `${t(
                          'serviceReleaseForm.validCharactersIncludes'
                        )} ${
                          desc === 'shortDescriptionEN'
                            ? `a-zA-Z0-9 !?@&#'"()_-=/*.,;:`
                            : `a-zA-ZÀ-ÿ0-9 !?@&#'"()_-=/*.,;:`
                        }`,
                        maxLength: `${t('serviceReleaseForm.maximum')} 120 ${t(
                          'serviceReleaseForm.charactersAllowed'
                        )}`,
                      }}
                      maxLength={120}
                      minLength={10}
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
              label={t('step1.serviceLeadImageUpload')}
              noteDescription={t('serviceReleaseForm.OnlyOneFileAllowed')}
              note={t('serviceReleaseForm.note')}
              requiredText={t('serviceReleaseForm.fileUploadIsMandatory')}
              isRequired={false}
            />
          </form>
        </Grid>
      </Grid>
      <SnackbarNotificationWithButtons
        pageNotification={serviceCardNotification}
        pageSnackbar={serviceCardSnackbar}
        pageSnackBarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        setPageNotification={() => setServiceCardNotification(false)}
        setPageSnackbar={() => setServiceCardSnackbar(false)}
        onBackIconClick={() => navigate('/home')}
        onSave={handleSubmit((data: any) =>
          onSubmit(data, ButtonLabelTypes.SAVE)
        )}
        onSaveAndProceed={handleSubmit((data: any) =>
          onSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={isValid}
      />
    </div>
  )
}
