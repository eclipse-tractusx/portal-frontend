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
  Input,
  Typography,
  IconButton,
  CardHorizontal,
  Card,
  MultiSelectList,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid, Divider, Box } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useCasesItem,
  appLanguagesItem,
  useAddCreateAppMutation,
} from 'features/appManagement/apiSlice'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Dropzone } from 'components/shared/basic/Dropzone'
import './AppMarketCard.scss'

type FormDataType = {
  title: string
  provider: string
  shortDescriptionEN: string
  shortDescriptionDE: string
  useCaseCategory: string[]
  appLanguage: string[]
  price: string
  uploadImage: {
    leadPictureUri: string
    alt: string
  }
  providerCompanyId: string
}

export default function AppMarketCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [pageScrolled, setPageScrolled] = useState(false)
  const useCasesList = useFetchUseCasesQuery().data || []
  const appLanguagesList = useFetchAppLanguagesQuery().data || []
  const [addCreateApp] = useAddCreateAppMutation()

  const defaultValues = {
    title: '',
    provider: '',
    price: '',
    useCaseCategory: [],
    appLanguage: [],
    //To do: to be changed once api is available
    providerCompanyId: '220330ac-170d-4e22-8d72-9467ed042149',
    shortDescriptionEN: '',
    shortDescriptionDE: '',
    uploadImage: {
      leadPictureUri: '',
      alt: '',
    },
  }

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const cardAppTitle =
    getValues().title ||
    t('content.apprelease.appMarketCard.defaultCardAppTitle')
  const cardAppProvider =
    getValues().provider ||
    t('content.apprelease.appMarketCard.defaultCardAppProvider')
  const cardDescription =
    getValues().shortDescriptionEN ||
    t('content.apprelease.appMarketCard.defaultCardShortDescriptionEN')
  const cardImageSrc =
    getValues().uploadImage.leadPictureUri ||
    'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png'
  const cardImageAlt =
    getValues().uploadImage.alt ||
    t('content.apprelease.appMarketCard.defaultCardAppImageAlt')

  window.onscroll = () => setPageScrolled(window.scrollY !== 0)

  const onSubmit = async (data: FormDataType) => {
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
      handleSave(data)
    }
  }

  const handleSave = async (data: FormDataType) => {
    const saveData = {
      title: data.title,
      provider: data.provider,
      leadPictureUri: data.uploadImage.leadPictureUri,
      providerCompanyId: data.providerCompanyId,
      useCaseIds: data.useCaseCategory,
      descriptions: [
        {
          languageCode: 'de',
          longDescription: '',
          shortDescription: data.shortDescriptionDE,
        },
        {
          languageCode: 'en',
          longDescription: '',
          shortDescription: data.shortDescriptionEN,
        },
      ],
      supportedLanguageCodes: data.appLanguage,
      price: data.price,
    }

    try {
      const result = await addCreateApp(saveData).unwrap()
      console.log('result', result)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <>
      {!pageScrolled && (
        <>
          <Typography variant="h3" mt={10} mb={4} align="center">
            {t('content.apprelease.appMarketCard.headerTitle')}
          </Typography>
          <Typography
            variant="body2"
            className="header-description"
            align="center"
          >
            {t('content.apprelease.appMarketCard.headerDescription')}
          </Typography>
        </>
      )}

      <Grid container spacing={2} sx={{ mt: pageScrolled ? 10 : 0 }}>
        {pageScrolled ? (
          <Grid
            item
            md={3}
            sx={{ mt: 0, mr: 'auto', mb: 10, ml: 'auto' }}
            className={'app-market-card'}
          >
            <Card
              image={{
                src: cardImageSrc,
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
            />
          </Grid>
        ) : (
          <Grid item md={7} sx={{ mt: 0, mr: 'auto', mb: 10, ml: 'auto' }}>
            <CardHorizontal
              label={cardAppProvider}
              title={cardAppTitle}
              imagePath={cardImageSrc}
              imageAlt={cardImageAlt}
              borderRadius={0}
              description={cardDescription}
              backgroundColor="#F3F3F3"
            />
          </Grid>
        )}

        <Grid
          item
          md={pageScrolled ? 9 : 8}
          sx={{ mt: 0, mr: 'auto', mb: 0, ml: 'auto' }}
        >
          <form>
            <div className="form-field">
              <Controller
                name={'title'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.appTitle'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  minLength: {
                    value: 5,
                    message: `${t(
                      'content.apprelease.appMarketCard.minimum'
                    )} 5 ${t(
                      'content.apprelease.appMarketCard.charactersRequired'
                    )}`,
                  },
                  pattern: {
                    value: /^([A-Za-z.:_@&0-9 -]){5,40}$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Za-z0-9.:_- @&`,
                  },
                  maxLength: {
                    value: 40,
                    message: `${t(
                      'content.apprelease.appMarketCard.maximum'
                    )} 40 ${t(
                      'content.apprelease.appMarketCard.charactersAllowed'
                    )}`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['title']}
                    helperText={errors?.title?.message}
                    label={t('content.apprelease.appMarketCard.appTitle') + '*'}
                    placeholder={t(
                      'content.apprelease.appMarketCard.appTitlePlaceholder'
                    )}
                    onChange={(event) => {
                      trigger('title')
                      onChange(event)
                    }}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="form-field">
              <Controller
                name={'provider'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.appProvider'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  minLength: {
                    value: 3,
                    message: `${t(
                      'content.apprelease.appMarketCard.minimum'
                    )} 3 ${t(
                      'content.apprelease.appMarketCard.charactersRequired'
                    )}`,
                  },
                  pattern: {
                    value: /^([A-Za-z ]){3,30}$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Z a-z`,
                  },
                  maxLength: {
                    value: 30,
                    message: `${t(
                      'content.apprelease.appMarketCard.maximum'
                    )} 30 ${t(
                      'content.apprelease.appMarketCard.charactersAllowed'
                    )}`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['provider']}
                    helperText={errors?.provider?.message}
                    label={
                      t('content.apprelease.appMarketCard.appProvider') + '*'
                    }
                    placeholder={t(
                      'content.apprelease.appMarketCard.appProviderPlaceholder'
                    )}
                    onChange={(event) => {
                      trigger('provider')
                      onChange(event)
                    }}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="form-field">
              <Controller
                name={'shortDescriptionEN'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.shortDescriptionEN'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  minLength: {
                    value: 10,
                    message: `${t(
                      'content.apprelease.appMarketCard.minimum'
                    )} 10 ${t(
                      'content.apprelease.appMarketCard.charactersRequired'
                    )}`,
                  },
                  pattern: {
                    value: /^([A-Za-z.:@0-9& ]){10,255}$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Za-z0-9.: @&`,
                  },
                  maxLength: {
                    value: 255,
                    message: `${t(
                      'content.apprelease.appMarketCard.maximum'
                    )} 255 ${t(
                      'content.apprelease.appMarketCard.charactersAllowed'
                    )}`,
                  },
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input
                      error={!!errors['shortDescriptionEN']}
                      helperText={errors?.shortDescriptionEN?.message}
                      label={
                        <>
                          {t(
                            'content.apprelease.appMarketCard.shortDescriptionEN'
                          )}
                          <IconButton sx={{ color: '#939393' }} size="small">
                            {' '}
                            <HelpOutlineIcon />{' '}
                          </IconButton>
                        </>
                      }
                      placeholder={'Short Description - EN'}
                      onChange={(event) => {
                        trigger('shortDescriptionEN')
                        onChange(event)
                      }}
                      value={value}
                      multiline
                      minRows={3}
                      maxRows={3}
                      sx={{ '.MuiFilledInput-root': { padding: 0 } }}
                    />
                  )
                }}
              />
              <Typography variant="body2" className="form-field" align="right">
                {`${getValues().shortDescriptionEN.length}/255`}
              </Typography>
            </div>

            <div className="form-field">
              <Controller
                name={'shortDescriptionDE'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.shortDescriptionDE'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  minLength: {
                    value: 10,
                    message: `${t(
                      'content.apprelease.appMarketCard.minimum'
                    )} 10 ${t(
                      'content.apprelease.appMarketCard.charactersRequired'
                    )}`,
                  },
                  pattern: {
                    value: /^([A-Za-z.:@0-9& ]){10,255}$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Za-z0-9.: @&`,
                  },
                  maxLength: {
                    value: 255,
                    message: `${t(
                      'content.apprelease.appMarketCard.maximum'
                    )} 255 ${t(
                      'content.apprelease.appMarketCard.charactersAllowed'
                    )}`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['shortDescriptionDE']}
                    helperText={errors?.shortDescriptionDE?.message}
                    label={
                      <>
                        {t(
                          'content.apprelease.appMarketCard.shortDescriptionDE'
                        )}
                        <IconButton sx={{ color: '#939393' }} size="small">
                          {' '}
                          <HelpOutlineIcon />{' '}
                        </IconButton>
                      </>
                    }
                    placeholder={'Short Description - EN'}
                    onChange={(event) => {
                      trigger('shortDescriptionDE')
                      onChange(event)
                    }}
                    value={value}
                    multiline
                    minRows={3}
                    maxRows={3}
                    sx={{ '.MuiFilledInput-root': { padding: 0 } }}
                  />
                )}
              />
              <Typography variant="body2" className="form-field" align="right">
                {`${getValues().shortDescriptionDE.length}/255`}
              </Typography>
            </div>

            <div className="form-field">
              <Controller
                name={'useCaseCategory'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.useCaseCategory'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  pattern: {
                    value: /^([A-Za-z])$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Za-z`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelectList
                    label={
                      t('content.apprelease.appMarketCard.useCaseCategory') +
                      '*'
                    }
                    placeholder={t(
                      'content.apprelease.appMarketCard.useCaseCategoryPlaceholder'
                    )}
                    error={!!errors['useCaseCategory']}
                    helperText={`${t(
                      'content.apprelease.appMarketCard.useCaseCategory'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`}
                    value={value}
                    items={useCasesList}
                    keyTitle="name"
                    buttonAddMore={t(
                      'content.apprelease.appMarketCard.addMore'
                    )}
                    notItemsText={t(
                      'content.apprelease.appMarketCard.noItemsSelected'
                    )}
                    onAddItem={(items: useCasesItem[]) => {
                      trigger('useCaseCategory')
                      onChange(items.map((item) => item.useCaseId))
                    }}
                    tagSize="small"
                    margin="none"
                  />
                )}
              />
            </div>

            <div className="form-field">
              <Controller
                name={'appLanguage'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.appLanguage'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  pattern: {
                    value: /^([A-Za-z ])$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Z a-z`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelectList
                    label={
                      t('content.apprelease.appMarketCard.appLanguage') + '*'
                    }
                    placeholder={t(
                      'content.apprelease.appMarketCard.appLanguagePlaceholder'
                    )}
                    items={appLanguagesList}
                    onAddItem={(items: appLanguagesItem[]) => {
                      trigger('appLanguage')
                      onChange(items)
                      onChange(items.map((item) => item.languageShortName))
                    }}
                    keyTitle="languageShortName"
                    buttonAddMore={t(
                      'content.apprelease.appMarketCard.addMore'
                    )}
                    notItemsText={t(
                      'content.apprelease.appMarketCard.noItemsSelected'
                    )}
                    tagSize="small"
                    margin="none"
                    filterOptionsArgs={{
                      matchFrom: 'any',
                      stringify: (option: any) =>
                        option.languageShortName +
                        option.languageLongNames.de +
                        option.languageLongNames.en,
                    }}
                    error={!!errors['appLanguage']}
                    helperText={`${t(
                      'content.apprelease.appMarketCard.appLanguage'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="form-field">
              <Controller
                name={'price'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `${t(
                      'content.apprelease.appMarketCard.shortDescriptionEN'
                    )} ${t('content.apprelease.appMarketCard.isMandatory')}`,
                  },
                  minLength: {
                    value: 1,
                    message: `${t(
                      'content.apprelease.appMarketCard.minimum'
                    )} 1 ${t(
                      'content.apprelease.appMarketCard.charactersRequired'
                    )}`,
                  },
                  pattern: {
                    value: /^([A-Za-z0-9/€ ]){1,15}$/,
                    message: `${t(
                      'content.apprelease.appMarketCard.validCharactersIncludes'
                    )} A-Za-z0-9/ €`,
                  },
                  maxLength: {
                    value: 15,
                    message: `${t(
                      'content.apprelease.appMarketCard.maximum'
                    )} 15 ${t(
                      'content.apprelease.appMarketCard.charactersAllowed'
                    )}`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={!!errors['price']}
                    helperText={errors?.price?.message}
                    label={
                      t('content.apprelease.appMarketCard.pricingInformation') +
                      '*'
                    }
                    placeholder={t(
                      'content.apprelease.appMarketCard.pricingInformationPlaceholder'
                    )}
                    onChange={(event) => {
                      trigger('price')
                      onChange(event)
                    }}
                    value={value}
                  />
                )}
              />
            </div>

            <Controller
              name={'uploadImage.leadPictureUri'}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Dropzone
                  onFileDrop={(files: File[]) => {
                    onChange(files[0].name)
                    trigger('uploadImage.leadPictureUri')
                  }}
                />
              )}
            />
            {errors?.uploadImage?.leadPictureUri?.type === 'required' && (
              <p className="file-error-msg">
                {t('content.apprelease.appMarketCard.fileUploadIsMandatory')}
              </p>
            )}

            <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
              {t('content.apprelease.appMarketCard.note')}
            </Typography>
            <Typography variant="body2" mb={3}>
              {t('content.apprelease.appMarketCard.OnlyOneFileAllowed')}
            </Typography>

            <Box mb={2}>
              <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                startIcon={<HelpOutlineIcon />}
              >
                {t('content.apprelease.appMarketCard.help')}
              </Button>
              <IconButton
                color="secondary"
                onClick={() => navigate('/appmanagement')}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Button
                variant="outlined"
                disabled={!isValid}
                sx={{ float: 'right' }}
                onClick={handleSubmit(onSubmit)}
              >
                {t('content.apprelease.appMarketCard.saveAndProceed')}
              </Button>
              <Button
                variant="outlined"
                name="send"
                className={'form-buttons'}
                sx={{ float: 'right', mr: 1 }}
                onClick={handleSubmit(onSubmit)}
              >
                {t('content.apprelease.appMarketCard.save')}
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  )
}
