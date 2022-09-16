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
  Checkbox,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid, Divider, Box } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useAddCreateAppMutation,
} from 'features/appManagement/apiSlice'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Dropzone } from 'components/shared/basic/Dropzone'
import '../ReleaseProcessSteps.scss'
import { useDispatch } from 'react-redux'
import { increment } from 'features/appManagement/slice'
import { setAppId } from 'features/appManagement/actions'
import { isString } from 'lodash'
import Patterns from 'types/Patterns'

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
            onFileDrop={(files: any) => {
              trigger(name)
              onChange(files[0].name)
            }}
          />
        )
      } else if (type === 'checkbox') {
        return (
          <>
            <Checkbox
              label={label}
              checked={value}
              onChange={(event) => {
                trigger(name)
                onChange(event.target.checked)
              }}
            />
            {!!errors[name] && (
              <p className="file-error-msg">{errors[name].message}</p>
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
          />
        )
    }}
  />
)

export default function AppMarketCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    providerCompanyId: '2dc4249f-b5ca-4d42-bef1-7a7a950a4f87',
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

    await addCreateApp(saveData)
      .unwrap()
      .then((result) => {
        isString(result) && dispatch(setAppId(result))
        dispatch(increment())
      })
      .catch((error) => {})
  }

  return (
    <div className="app-market-card">
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
            className={'app-release-card'}
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
              <ConnectorFormInputField
                {...{
                  control,
                  trigger,
                  errors,
                  name: 'title',
                  label: t('content.apprelease.appMarketCard.appTitle') + ' *',
                  placeholder: t(
                    'content.apprelease.appMarketCard.appTitlePlaceholder'
                  ),
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
                  placeholder: t(
                    'content.apprelease.appMarketCard.appProviderPlaceholder'
                  ),
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
                (item: string) => (
                  <>
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
                        placeholder: t(
                          `content.apprelease.appMarketCard.${item}`
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
                            value: Patterns.appMarketCard.shortDescription,
                            message: `${t(
                              'content.apprelease.appReleaseForm.validCharactersIncludes'
                            )} A-Za-z0-9.: @&`,
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
                  </>
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
                }}
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
                  placeholder: t(
                    'content.apprelease.appMarketCard.pricingInformationPlaceholder'
                  ),
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

            <ConnectorFormInputField
              {...{
                control,
                trigger,
                errors,
                name: 'uploadImage.leadPictureUri',
                type: 'dropzone',
                rules: {
                  required: {
                    value: true,
                  },
                },
              }}
            />
            {errors?.uploadImage?.leadPictureUri?.type === 'required' && (
              <p className="file-error-msg">
                {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
              </p>
            )}

            <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
              {t('content.apprelease.appReleaseForm.note')}
            </Typography>
            <Typography variant="body2" mb={3}>
              {t('content.apprelease.appReleaseForm.OnlyOneFileAllowed')}
            </Typography>
          </form>
        </Grid>
      </Grid>

      <Box mb={2}>
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
          onClick={handleSubmit(onSubmit)}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit(onSubmit)}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
    </div>
  )
}
