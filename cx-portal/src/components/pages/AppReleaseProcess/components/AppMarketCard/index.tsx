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
  Button,
  Input,
  Typography,
  IconButton,
  CardHorizontal,
  Card,
  MultiSelectList,
  Checkbox,
  PageNotifications,
  LogoGrayData,
  SelectList,
  UploadFileStatus,
  PageSnackbar,
  UploadStatus,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid, Divider, Box, InputLabel } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useAddCreateAppMutation,
  useUpdateDocumentUploadMutation,
  useCasesItem,
  useFetchSalesManagerDataQuery,
  salesManagerType,
  useSaveAppMutation,
  useFetchAppStatusQuery,
  useFetchDocumentByIdMutation,
} from 'features/appManagement/apiSlice'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Dropzone, DropzoneFile } from 'components/shared/basic/Dropzone'
import '../ReleaseProcessSteps.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  appStatusDataSelector,
  increment,
} from 'features/appManagement/slice'
import { setAppId, setAppStatus } from 'features/appManagement/actions'
import { isString } from 'lodash'
import Patterns from 'types/Patterns'
import uniqBy from 'lodash/uniqBy'

type FormDataType = {
  title: string
  provider: string
  shortDescriptionEN: string
  shortDescriptionDE: string
  useCaseCategory: string[] | useCasesItem[]
  appLanguage: string[]
  price: string
  uploadImage: {
    leadPictureUri: DropzoneFile | string | null
    alt?: string
  }
  salesManagerId: string | null
}

export const ConnectorFormInputField = ({
  control,
  trigger,
  errors,
  label,
  placeholder,
  name,
  rules,
  type,
  textarea,
  items,
  keyTitle,
  saveKeyTitle,
  notItemsText,
  buttonAddMore,
  filterOptionsArgs,
  acceptFormat,
  maxFilesToUpload,
  maxFileSize,
  defaultValues,
  enableDeleteIcon,
}: any) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, value } }) => {
      if (type === 'input') {
        return (
          <Input
            label={label}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors && errors[name] && errors[name].message}
            value={value}
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            multiline={textarea}
            minRows={textarea && 3}
            maxRows={textarea && 3}
            sx={
              textarea && {
                '.MuiFilledInput-root': { padding: '0px 12px 0px 0px' },
              }
            }
          />
        )
      } else if (type === 'dropzone') {
        return (
          <Dropzone
            files={value ? [value] : undefined}
            onChange={([file]) => {
              trigger(name)
              onChange(file)
            }}
            acceptFormat={acceptFormat}
            maxFilesToUpload={maxFilesToUpload}
            maxFileSize={maxFileSize}
            enableDeleteIcon={enableDeleteIcon}
          />
        )
      } else if (type === 'checkbox') {
        return (
          <>
            <Checkbox
              key={name}
              label={label}
              defaultChecked={defaultValues}
              value={defaultValues}
              checked={value}
              onChange={(event) => {
                trigger(name)
                onChange(event.target.checked)
              }}
            />
            {!!errors[name] && (
              <Typography variant="body2" className="file-error-msg">
                {errors[name].message}
              </Typography>
            )}
          </>
        )
      } else
        return (
          <MultiSelectList
            label={label}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors && errors[name] && errors[name].message}
            value={value}
            items={items}
            keyTitle={keyTitle}
            onAddItem={(items: any[]) => {
              trigger(name)
              onChange(items?.map((item) => item[saveKeyTitle]))
            }}
            notItemsText={notItemsText}
            buttonAddMore={buttonAddMore}
            tagSize="small"
            margin="none"
            filterOptionsArgs={filterOptionsArgs}
            defaultValues={defaultValues}
          />
        )
    }}
  />
)

export default function AppMarketCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const [pageScrolled, setPageScrolled] = useState(false)

  const useCasesListData = useFetchUseCasesQuery().data
  const useCasesList = useMemo(() => useCasesListData || [], [useCasesListData])

  const appLanguagesListData = useFetchAppLanguagesQuery().data
  const appLanguagesList = useMemo(
    () => appLanguagesListData || [],
    [appLanguagesListData]
  )

  const [addCreateApp] = useAddCreateAppMutation()
  const [saveApp] = useSaveAppMutation()
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const [appCardNotification, setAppCardNotification] = useState(false)
  const [appCardSnackbar, setAppCardSnackbar] = useState<boolean>(false)
  const appStatusData = useSelector(appStatusDataSelector)
  const salesManagerList = useFetchSalesManagerDataQuery().data || []
  const [defaultSalesManagerValue, setDefaultSalesManagerValue] =
    useState<salesManagerType>({
      userId: null,
      firstName: 'none',
      lastName: '',
      fullName: 'none',
    })
  const [salesManagerListData, setSalesManagerListData] = useState<
    salesManagerType[]
  >([defaultSalesManagerValue])
  const [salesManagerId, setSalesManagerId] = useState<string | null>(null)
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [cardImage, setCardImage] = useState(LogoGrayData)
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [defaultUseCaseVal, setDefaultUseCaseVal] = useState<any[]>([])
  const [defaultAppLanguageVal, setDefaultAppLanguageVal] = useState<any[]>([])

  const defaultValues = {
    title: appStatusData?.title,
    provider: appStatusData?.provider,
    price: appStatusData?.price,
    useCaseCategory: appStatusData?.useCase,
    appLanguage: appStatusData?.supportedLanguageCodes,
    salesManagerId: appStatusData?.salesManagerId,
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

  useEffect(() => {
    if (useCasesList.length > 0) {
      const defaultUseCaseIds = useCasesList?.filter((item) =>
        appStatusData?.useCase?.some((x) => x === item.name)
      )
      setDefaultUseCaseVal(defaultUseCaseIds)
    }
    if (appLanguagesList.length > 0) {
      const defaultAppLanguages = appLanguagesList?.filter((item) =>
        appStatusData?.supportedLanguageCodes?.some(
          (x) => x === item.languageShortName
        )
      )
      setDefaultAppLanguageVal(defaultAppLanguages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCasesList, appStatusData, appLanguagesList])

  useEffect(() => {
    dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  useEffect(() => {
    if (salesManagerList.length > 0) {
      let data = salesManagerList?.map((item) => {
        return { ...item, fullName: `${item.firstName} ${item.lastName}` }
      })
      reset(defaultValues)
      const uniqueSalesManagerList = uniqBy(
        salesManagerListData.concat(data),
        'userId'
      )
      setSalesManagerListData(uniqueSalesManagerList)

      if (appStatusData?.salesManagerId) {
        const defaultsalesMgr: any = uniqueSalesManagerList?.filter(
          (item) => item.userId === appStatusData?.salesManagerId
        )
        onSalesManagerChange(defaultsalesMgr && defaultsalesMgr[0]?.userId)
        setDefaultSalesManagerValue(defaultsalesMgr && defaultsalesMgr[0])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesManagerList, appStatusData])

  const onSalesManagerChange = (sales: any) => {
    setSalesManagerId(sales)
  }

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

  const cardAppTitle =
    getValues().title ||
    t('content.apprelease.appMarketCard.defaultCardAppTitle')
  const cardAppProvider =
    getValues().provider ||
    t('content.apprelease.appMarketCard.defaultCardAppProvider')
  const cardDescription =
    getValues().shortDescriptionEN ||
    t('content.apprelease.appMarketCard.defaultCardShortDescriptionEN')
  const cardImageAlt =
    getValues().uploadImage.alt ||
    t('content.apprelease.appMarketCard.defaultCardAppImageAlt')

  window.onscroll = () => setPageScrolled(window.scrollY !== 0)

  const onSubmit = async (data: FormDataType, buttonLabel: string) => {
    const validateFields = await trigger([
      'title',
      'provider',
      'shortDescriptionEN',
      'shortDescriptionDE',
      'useCaseCategory',
      'price',
      'appLanguage',
      'uploadImage',
    ])
    if (validateFields) {
      handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (data: FormDataType, buttonLabel: string) => {
    const saveData = {
      title: data.title,
      provider: data.provider,
      leadPictureUri:
        data.uploadImage.leadPictureUri !== null &&
        Object.keys(data.uploadImage.leadPictureUri).length > 0 &&
        Object.values(data.uploadImage.leadPictureUri)[0],
      salesManagerId: salesManagerId,
      useCaseIds: data.useCaseCategory,
      descriptions: [
        {
          languageCode: 'de',
          longDescription:
            appStatusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'en'
            )[0]?.longDescription || '',
          shortDescription: data.shortDescriptionDE,
        },
        {
          languageCode: 'en',
          longDescription:
            appStatusData?.descriptions?.filter(
              (appStatus: any) => appStatus.languageCode === 'en'
            )[0]?.longDescription || '',
          shortDescription: data.shortDescriptionEN,
        },
      ],
      supportedLanguageCodes: data.appLanguage,
      price: data.price,
      privacyPolicies: [],
    }

    const uploadImageValue = getValues().uploadImage
      .leadPictureUri as unknown as DropzoneFile

    if (appId) {
      const saveAppData = {
        appId: appId,
        body: saveData,
      }

      await saveApp(saveAppData)
        .unwrap()
        .then(() => {
          dispatch(setAppId(appId))
          buttonLabel === 'saveAndProceed' && dispatch(increment())
          buttonLabel === 'save' && setAppCardSnackbar(true)
          dispatch(setAppStatus(fetchAppStatus))
        })
        .catch(() => {
          setAppCardNotification(true)
        })
    } else {
      await addCreateApp(saveData)
        .unwrap()
        .then((result) => {
          if (isString(result)) {
            const setFileStatus = (status: UploadFileStatus) =>
              setValue('uploadImage.leadPictureUri', {
                name: uploadImageValue.name,
                size: uploadImageValue.size,
                status,
              } as any)

            setFileStatus(UploadStatus.UPLOADING)

            uploadDocumentApi(result, 'APP_LEADIMAGE', uploadImageValue)
              .then(() => {
                setFileStatus(UploadStatus.UPLOAD_SUCCESS)
              })
              .catch(() => {
                setFileStatus(UploadStatus.UPLOAD_ERROR)
              })

            dispatch(setAppId(result))
            buttonLabel === 'saveAndProceed' && dispatch(increment())
            buttonLabel === 'save' && setAppCardSnackbar(true)
            dispatch(setAppStatus(fetchAppStatus))
          }
        })
        .catch(() => {
          setAppCardNotification(true)
        })
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

    await updateDocumentUpload(data).unwrap()
  }

  return (
    <div className="app-market-card">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {t('content.apprelease.appMarketCard.headerTitle')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={11} sx={{ mr: 'auto', ml: 'auto' }}>
          <Typography variant="body2" align="center">
            {t('content.apprelease.appMarketCard.headerDescription')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 10 }}>
        {pageScrolled ? (
          <Grid item md={3} className={'app-release-card'}>
            <Card
              image={{
                src: cardImage,
                alt: cardImageAlt,
              }}
              title={cardAppTitle}
              subtitle={cardAppProvider}
              description={cardDescription}
              imageSize="normal"
              imageShape="square"
              variant="text-details"
              expandOnHover={false}
              filledBackground={true}
              buttonText={''}
              positionValue="sticky"
              topValue={50}
            />
          </Grid>
        ) : (
          <Grid item md={7} sx={{ mt: 0, mr: 'auto', mb: 10, ml: 'auto' }}>
            <CardHorizontal
              label={cardAppProvider}
              title={cardAppTitle}
              imagePath={cardImage}
              imageAlt={cardImageAlt}
              borderRadius={0}
              description={cardDescription}
              backgroundColor="#F3F3F3"
            />
          </Grid>
        )}

        <Grid
          item
          md={8}
          sx={{ mt: 0, mr: 'auto', mb: 0, ml: pageScrolled ? 0 : 'auto' }}
        >
          <form>
            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'title',
                  label: t('content.apprelease.appMarketCard.appTitle') + ' *',
                  type: 'input',
                  rules: {
                    required: {
                      value: true,
                      message: `${t(
                        'content.apprelease.appMarketCard.appTitle'
                      )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                    },
                    minLength: {
                      value: 5,
                      message: `${t(
                        'content.apprelease.appReleaseForm.minimum'
                      )} 5 ${t(
                        'content.apprelease.appReleaseForm.charactersRequired'
                      )}`,
                    },
                    pattern: {
                      value: Patterns.appMarketCard.appTitle,
                      message: `${t(
                        'content.apprelease.appReleaseForm.validCharactersIncludes'
                      )} A-Za-z0-9.:_- @&`,
                    },
                    maxLength: {
                      value: 40,
                      message: `${t(
                        'content.apprelease.appReleaseForm.maximum'
                      )} 40 ${t(
                        'content.apprelease.appReleaseForm.charactersAllowed'
                      )}`,
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
                  name: 'provider',
                  label:
                    t('content.apprelease.appMarketCard.appProvider') + ' *',
                  type: 'input',
                  rules: {
                    required: {
                      value: true,
                      message: `${t(
                        'content.apprelease.appMarketCard.appProvider'
                      )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                    },
                    minLength: {
                      value: 3,
                      message: `${t(
                        'content.apprelease.appReleaseForm.minimum'
                      )} 3 ${t(
                        'content.apprelease.appReleaseForm.charactersRequired'
                      )}`,
                    },
                    pattern: {
                      value: Patterns.appMarketCard.appProvider,
                      message: `${t(
                        'content.apprelease.appReleaseForm.validCharactersIncludes'
                      )} A-Z a-z`,
                    },
                    maxLength: {
                      value: 30,
                      message: `${t(
                        'content.apprelease.appReleaseForm.maximum'
                      )} 30 ${t(
                        'content.apprelease.appReleaseForm.charactersAllowed'
                      )}`,
                    },
                  },
                }}
              />
            </div>

            <div className="form-field">
              {['shortDescriptionEN', 'shortDescriptionDE'].map(
                (item: string, i) => (
                  <div key={i}>
                    <ConnectorFormInputField
                      {...{
                        control,
                        trigger,
                        errors,
                        name: item,
                        label: (
                          <>
                            {t(`content.apprelease.appMarketCard.${item}`) +
                              ' *'}
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
                            message: `${t(
                              `content.apprelease.appMarketCard.${item}`
                            )} ${t(
                              'content.apprelease.appReleaseForm.isMandatory'
                            )}`,
                          },
                          minLength: {
                            value: 10,
                            message: `${t(
                              'content.apprelease.appReleaseForm.minimum'
                            )} 10 ${t(
                              'content.apprelease.appReleaseForm.charactersRequired'
                            )}`,
                          },
                          pattern: {
                            value:
                              item === 'shortDescriptionEN'
                                ? Patterns.appMarketCard.shortDescriptionEN
                                : Patterns.appMarketCard.shortDescriptionDE,
                            message: `${t(
                              'content.apprelease.appReleaseForm.validCharactersIncludes'
                            )} ${
                              item === 'shortDescriptionEN'
                                ? `a-zA-Z0-9 !?@&#'"()_-=/*.,;:`
                                : `a-zA-ZÀ-ÿ0-9 !?@&#'"()_-=/*.,;:`
                            }`,
                          },
                          maxLength: {
                            value: 255,
                            message: `${t(
                              'content.apprelease.appReleaseForm.maximum'
                            )} 255 ${t(
                              'content.apprelease.appReleaseForm.charactersAllowed'
                            )}`,
                          },
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      className="form-field"
                      align="right"
                    >
                      {(item === 'shortDescriptionEN'
                        ? getValues().shortDescriptionEN.length
                        : getValues().shortDescriptionDE.length) + `/255`}
                    </Typography>
                  </div>
                )
              )}
            </div>

            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'useCaseCategory',
                  label:
                    t('content.apprelease.appMarketCard.useCaseCategory') +
                    ' *',
                  placeholder: t(
                    'content.apprelease.appMarketCard.useCaseCategoryPlaceholder'
                  ),
                  type: 'multiSelectList',
                  rules: {
                    required: {
                      value: true,
                      message: `${t(
                        'content.apprelease.appMarketCard.useCaseCategory'
                      )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                    },
                    pattern: {
                      value: Patterns.appMarketCard.useCaseCategory,
                      message: `${t(
                        'content.apprelease.appReleaseForm.validCharactersIncludes'
                      )} A-Za-z`,
                    },
                  },
                  items: useCasesList,
                  keyTitle: 'name',
                  saveKeyTitle: 'useCaseId',
                  notItemsText: t(
                    'content.apprelease.appReleaseForm.noItemsSelected'
                  ),
                  buttonAddMore: t('content.apprelease.appReleaseForm.addMore'),
                  defaultValues: defaultUseCaseVal,
                }}
              />
            </div>

            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'appLanguage',
                  label:
                    t('content.apprelease.appMarketCard.appLanguage') + ' *',
                  placeholder: t(
                    'content.apprelease.appMarketCard.appLanguagePlaceholder'
                  ),
                  type: 'multiSelectList',
                  rules: {
                    required: {
                      value: true,
                      message: `${t(
                        'content.apprelease.appMarketCard.appLanguage'
                      )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                    },
                    pattern: {
                      value: Patterns.appMarketCard.appLanguage,
                      message: `${t(
                        'content.apprelease.appReleaseForm.validCharactersIncludes'
                      )} A-Z a-z`,
                    },
                  },
                  items: appLanguagesList,
                  keyTitle: 'languageShortName',
                  saveKeyTitle: 'languageShortName',
                  notItemsText: t(
                    'content.apprelease.appReleaseForm.noItemsSelected'
                  ),
                  buttonAddMore: t('content.apprelease.appReleaseForm.addMore'),
                  filterOptionsArgs: {
                    matchFrom: 'any',
                    stringify: (option: any) =>
                      option.languageShortName +
                      option.languageLongNames.de +
                      option.languageLongNames.en,
                  },
                  defaultValues: defaultAppLanguageVal,
                }}
              />
            </div>

            <div className="form-field">
              <Typography
                sx={{ fontFamily: 'LibreFranklin-Medium' }}
                variant="subtitle2"
              >
                {t('content.apprelease.appMarketCard.salesManager')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t('content.apprelease.appMarketCard.salesManagerDescription')}
              </Typography>
              <SelectList
                defaultValue={defaultSalesManagerValue}
                items={salesManagerListData}
                label={''}
                placeholder={t(
                  'content.apprelease.appMarketCard.salesManagerPlaceholder'
                )}
                onChangeItem={(e) => onSalesManagerChange(e.userId)}
                keyTitle={'fullName'}
              />
            </div>

            <div className="form-field">
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'price',
                  label:
                    t('content.apprelease.appMarketCard.pricingInformation') +
                    ' *',
                  type: 'input',
                  rules: {
                    required: {
                      value: true,
                      message: `${t(
                        'content.apprelease.appMarketCard.pricingInformation'
                      )} ${t('content.apprelease.appReleaseForm.isMandatory')}`,
                    },
                    minLength: {
                      value: 1,
                      message: `${t(
                        'content.apprelease.appReleaseForm.minimum'
                      )} 1 ${t(
                        'content.apprelease.appReleaseForm.charactersRequired'
                      )}`,
                    },
                    pattern: {
                      value: Patterns.appMarketCard.pricingInformation,
                      message: `${t(
                        'content.apprelease.appReleaseForm.validCharactersIncludes'
                      )} A-Za-z0-9/ €`,
                    },
                    maxLength: {
                      value: 15,
                      message: `${t(
                        'content.apprelease.appReleaseForm.maximum'
                      )} 15 ${t(
                        'content.apprelease.appReleaseForm.charactersAllowed'
                      )}`,
                    },
                  },
                }}
              />
            </div>

            <div className="form-field">
              <InputLabel sx={{ mb: 3, mt: 3 }}>
                {t('content.apprelease.appMarketCard.appLeadImageUpload') +
                  ' *'}
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
                  {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
                </Typography>
              )}

              <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
                {t('content.apprelease.appReleaseForm.note')}
              </Typography>
              <Typography variant="body2" mb={3}>
                {t('content.apprelease.appReleaseForm.OnlyOneFileAllowed')}
              </Typography>
            </div>
          </form>
        </Grid>
      </Grid>

      <Box mb={2}>
        {appCardNotification && (
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
                onCloseNotification={() => setAppCardNotification(false)}
              />
            </Grid>
          </Grid>
        )}
        <PageSnackbar
          open={appCardSnackbar}
          onCloseNotification={() => setAppCardSnackbar(false)}
          severity="success"
          description={t(
            'content.apprelease.appReleaseForm.dataSavedSuccessMessage'
          )}
          autoClose={true}
        />

        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          startIcon={<HelpOutlineIcon />}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton
          color="secondary"
          onClick={() => navigate('/appmanagement')}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          variant="contained"
          disabled={!isValid}
          sx={{ float: 'right' }}
          onClick={handleSubmit((data) => onSubmit(data, 'saveAndProceed'))}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit((data) => onSubmit(data, 'save'))}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </div>
  )
}
