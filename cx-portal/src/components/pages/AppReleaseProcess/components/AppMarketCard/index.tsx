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
import { Grid, InputLabel, Divider, Box } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  useFetchUseCasesQuery,
  useFetchAppLanguagesQuery,
  useCasesItem,
  appLanguagesItem,
} from 'features/appManagement/apiSlice'
import './AppMarketCard.scss'
import { useNavigate } from 'react-router-dom'

type FormDataType = {
  appTitle: string
  appProvider: string
  shortDescriptionEN: string
  shortDescriptionDE: string
  useCaseCategory: useCasesItem[]
  appLanguage: appLanguagesItem[]
  pricingInformation: string
  uploadImage: {
    src: string
    alt: string
  }
}

export default function AppMarketCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [pageScrolled, setPageScrolled] = useState(false)
  const [shortDescriptionENCount, setShortDescriptionENCount] = useState(0)
  const [shortDescriptionDECount, setShortDescriptionDECount] = useState(0)
  const useCasesList = useFetchUseCasesQuery().data || []
  const appLanguagesList = useFetchAppLanguagesQuery().data || []
  const [formData, setFormData] = useState<FormDataType>({
    appTitle: '',
    appProvider: '',
    shortDescriptionEN: '',
    shortDescriptionDE: '',
    useCaseCategory: [],
    appLanguage: [],
    pricingInformation: '',
    uploadImage: {
      src: '',
      alt: '',
    },
  })
  const cardAppTitle =
    formData.appTitle ||
    t('content.apprelease.appMarketCard.defaultCardAppTitle')

  window.onscroll = () => setPageScrolled(window.scrollY !== 0)

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
    event.target.name === 'shortDescriptionEN' &&
      setShortDescriptionENCount(event.target.value.length)
    event.target.name === 'shortDescriptionDE' &&
      setShortDescriptionDECount(event.target.value.length)
  }

  const handleUseCaseChange = (event: any[], name: string) => {
    setFormData({
      ...formData,
      [name]: event,
    })
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
            className={'app-markt-card'}
          >
            <Card
              image={{
                src:
                  formData.uploadImage.src ||
                  'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png',
                alt:
                  formData.uploadImage.alt ||
                  t('content.apprelease.appMarketCard.defaultCardAppImageAlt'),
              }}
              title={cardAppTitle}
              subtitle={
                formData.appProvider ||
                t('content.apprelease.appMarketCard.defaultCardAppProvider')
              }
              description={
                formData.shortDescriptionEN ||
                t(
                  'content.apprelease.appMarketCard.defaultCardShortDescriptionEN'
                )
              }
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
              label={
                formData.appProvider ||
                t('content.apprelease.appMarketCard.defaultCardAppProvider')
              }
              title={cardAppTitle}
              imagePath={
                formData.uploadImage.src ||
                'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png'
              }
              imageAlt={
                formData.uploadImage.alt ||
                t('content.apprelease.appMarketCard.defaultCardAppImageAlt')
              }
              borderRadius={0}
              description={
                formData.shortDescriptionEN ||
                t(
                  'content.apprelease.appMarketCard.defaultCardShortDescriptionEN'
                )
              }
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
            <Input
              label={t('content.apprelease.appMarketCard.appTitle')}
              name={'appTitle'}
              placeholder={t(
                'content.apprelease.appMarketCard.appTitlePlaceholder'
              )}
              value={formData.appTitle}
              onChange={handleChange}
              className="form-field"
            />
            <Input
              label={t('content.apprelease.appMarketCard.appProvider')}
              name={'appProvider'}
              placeholder={t(
                'content.apprelease.appMarketCard.appProviderPlaceholder'
              )}
              value={formData.appProvider}
              className="form-field"
              onChange={handleChange}
            />
            <InputLabel>
              {t('content.apprelease.appMarketCard.shortDescriptionEN')}
            </InputLabel>
            <textarea
              name="shortDescriptionEN"
              value={formData.shortDescriptionEN}
              rows={4}
              maxLength={255}
              className="text-area"
              style={{ fontFamily: 'LibreFranklin-Light' }}
              onChange={handleChange}
            />
            <Typography variant="body2" className="form-field" align="right">
              {`${shortDescriptionENCount}/255`}
            </Typography>

            <InputLabel>
              {t('content.apprelease.appMarketCard.shortDescriptionDE')}
            </InputLabel>
            <textarea
              name="shortDescriptionDE"
              value={formData.shortDescriptionDE}
              rows={4}
              maxLength={255}
              className="text-area"
              style={{ fontFamily: 'LibreFranklin-Light' }}
              onChange={handleChange}
            />
            <Typography variant="body2" className="form-field" align="right">
              {`${shortDescriptionDECount}/255`}
            </Typography>
            <div className="form-field">
              <MultiSelectList
                items={useCasesList}
                label={t('content.apprelease.appMarketCard.useCaseCategory')}
                placeholder={t(
                  'content.apprelease.appMarketCard.useCaseCategoryPlaceholder'
                )}
                keyTitle="name"
                buttonAddMore={t('content.apprelease.appMarketCard.addMore')}
                notItemsText={t(
                  'content.apprelease.appMarketCard.noItemsSelected'
                )}
                onAddItem={(items: useCasesItem[]) =>
                  handleUseCaseChange(items, 'useCaseCategory')
                }
                tagSize="small"
                margin="none"
              />
            </div>
            <div className="form-field">
              <MultiSelectList
                items={appLanguagesList}
                label={t('content.apprelease.appMarketCard.appLanguage')}
                placeholder={t(
                  'content.apprelease.appMarketCard.appLanguagePlaceholder'
                )}
                onAddItem={(items: appLanguagesItem[]) =>
                  handleUseCaseChange(items, 'appLanguage')
                }
                keyTitle="languageShortName"
                buttonAddMore={t('content.apprelease.appMarketCard.addMore')}
                notItemsText={t(
                  'content.apprelease.appMarketCard.noItemsSelected'
                )}
                tagSize="small"
                margin="none"
              />
            </div>
            <Input
              label={t('content.apprelease.appMarketCard.pricingInformation')}
              name={'pricingInformation'}
              placeholder={t(
                'content.apprelease.appMarketCard.pricingInformationPlaceholder'
              )}
              value={formData.pricingInformation}
              className="form-field"
              onChange={handleChange}
            />
            <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
              {t('content.apprelease.appMarketCard.note')}
            </Typography>
            <Typography variant="body2" mb={3}>
              {t('content.apprelease.appMarketCard.OnlyOneFileAllowed')}
            </Typography>
            <Box mb={2}>
              <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
              <Button variant="outlined" sx={{ mr: 1 }} startIcon={<HelpOutlineIcon />}>
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
                disabled={true}
                sx={{ float: 'right' }}
              >
                {t('content.apprelease.appMarketCard.saveAndProceed')}
              </Button>
              <Button
                variant="outlined"
                name="send"
                className={'form-buttons'}
                sx={{ float: 'right', mr: 1 }}
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
