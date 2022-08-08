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

import { Button, Input, Typography, IconButton, CardHorizontal, Card } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Grid, InputLabel, Divider, Box } from '@mui/material'
import { useState } from 'react'
import LeftArrowIcon from '@mui/icons-material/ArrowLeft'
import './AppMarketCard.scss'

export default function AppMarketCard() {
  const { t } = useTranslation()
  const [pageScrolled, setPageScrolled] = useState(false)
  const [formData, setFormData] = useState({
    appTitle: '',
    appProvider: '',
    shortDescriptionEN: '',
    shortDescriptionDE: '',
    useCaseCategory: '',
    appLanguage: '',
    pricingInformation: '',
    uploadImage: {
      src: '',
      alt: '',
    },
  })

  window.onscroll = () => setPageScrolled(window.scrollY !== 0)

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
            className={'card'}
          >
            <Card
              image={{
                src: formData.uploadImage.src || 'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png',
                alt: formData.uploadImage.alt || t('content.apprelease.appMarketCard.defaultCardAppImageAlt')
              }}
              title={formData.appTitle || t('content.apprelease.appMarketCard.defaultCardAppTitle')}
              subtitle={formData.appProvider || t('content.apprelease.appMarketCard.defaultCardAppProvider')}
              description={formData.shortDescriptionEN || t('content.apprelease.appMarketCard.defaultCardShortDescriptionEN')}
              imageSize="normal"
              imageShape="square"
              variant="text-details"
              expandOnHover={false}
              filledBackground={true}
              buttonText={''}
            />
          </Grid>
        ) : (
          <Grid
            item
            md={7}
            sx={{ mt: 0, mr: 'auto', mb: 10, ml: 'auto' }}
          >
            <CardHorizontal
              label={formData.appProvider || t('content.apprelease.appMarketCard.defaultCardAppProvider')}
              title={formData.appTitle || t('content.apprelease.appMarketCard.defaultCardAppTitle')}
              imagePath={formData.uploadImage.src || 'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png'}
              imageAlt={formData.uploadImage.alt || t('content.apprelease.appMarketCard.defaultCardAppImageAlt')}
              borderRadius={0}
              description={formData.shortDescriptionEN || t('content.apprelease.appMarketCard.defaultCardShortDescriptionEN')}
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
              placeholder={'name@domain.com'}
              value={formData.appTitle}
              onChange={handleChange}
              className="form-field"
            />
            <Input
              label={t('content.apprelease.appMarketCard.appProvider')}
              name={'appProvider'}
              placeholder={'prefill: [company name]'}
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
              maxLength={100}
              className="text-area form-field"
              onChange={handleChange}
            />
            <InputLabel>
              {t('content.apprelease.appMarketCard.shortDescriptionDE')}
            </InputLabel>
            <textarea
              name="shortDescriptionDE"
              value={formData.shortDescriptionDE}
              rows={4}
              maxLength={100}
              className="text-area form-field"
              onChange={handleChange}
            />
            <InputLabel id="use_case_category">
              {t('content.apprelease.appMarketCard.useCaseCategory')}
            </InputLabel>
            <InputLabel id="app_language">
              {t('content.apprelease.appMarketCard.appLanguage')}
            </InputLabel>
            <Input
              label={t('content.apprelease.appMarketCard.pricingInformation')}
              name={'pricingInformation'}
              placeholder={'Pricing Information'}
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
              <Button variant="outlined" sx={{ mr: 1 }}>
                {t('content.apprelease.appMarketCard.help')}
              </Button>
              <IconButton color="secondary">
                <LeftArrowIcon />
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
