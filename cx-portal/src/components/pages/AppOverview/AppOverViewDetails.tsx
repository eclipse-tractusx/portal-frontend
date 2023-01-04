/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
  Card,
  LanguageSwitch,
  Typography,
  LogoGrayData,
  CustomAccordion,
} from 'cx-portal-shared-components'
import { Grid } from '@mui/material'
import I18nService from 'services/I18nService'
import i18next, { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'
import {
  NewAppDetails,
  useFetchDocumentByIdMutation,
} from 'features/appManagement/apiSlice'
import AppInfo from './components/AppInfo'
import AppConsent from './components/AppConsent'
import { useEffect, useState } from 'react'

export default function AppOverViewDetails({
  item,
  id,
}: {
  item: NewAppDetails
  id: string
}) {
  const { t } = useTranslation()
  const [cardImage, setCardImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

  const items = [
    {
      expanded: false,
      id: 'panel-1',
      title: 'App Details',
      color: 'background.background09',
      children: <AppInfo item={item} id={id} />,
    },
    {
      expanded: false,
      id: 'panel-2',
      title: 'Consent',
      color: 'background.background09',
      children: <AppConsent agreements={item.agreements} />,
    },
    {
      expanded: false,
      id: 'panel-3',
      title: 'Technical Integration',
      color: 'background.background09',
      children: (
        <Typography variant="h5" align="left">
          {t('global.field.toBeUpdated')}
        </Typography>
      ),
    },
    {
      expanded: false,
      id: 'panel-4',
      title: 'Beta Test',
      color: 'background.background09',
      children: (
        <Typography variant="h5" align="left">
          {t('global.field.toBeUpdated')}
        </Typography>
      ),
    },
  ]

  const getDescription = (item: any) => {
    return item?.descriptions[0]?.longDescription
  }

  useEffect(() => {
    const fetchImage = async (documentId: string) => {
      try {
        const response = await fetchDocumentById(documentId).unwrap()
        const file = response.data
        return setCardImage(URL.createObjectURL(file))
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING IMAGE')
      }
    }

    if (
      item?.documents?.APP_LEADIMAGE &&
      item?.documents?.APP_LEADIMAGE[0].documentId
    ) {
      fetchImage(item?.documents?.APP_LEADIMAGE[0].documentId)
    }
  }, [item, fetchDocumentById])

  return (
    <>
      {item && (
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item>
            <Card
              image={{
                src: cardImage || LogoGrayData, // To-Do : Update this with actual data when new api is available
              }}
              title={item.title}
              subtitle={item.provider}
              description={getDescription(item)}
              imageSize="normal"
              imageShape="square"
              variant="text-details"
              expandOnHover={false}
              filledBackground={true}
              buttonText={''}
            />
          </Grid>
          <Grid
            sx={{
              marginLeft: '15%',
              marginTop: '5%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5">
                {t('content.appoverview.details.language')}
              </Typography>
              <LanguageSwitch
                current={i18next.language}
                languages={I18nService.supportedLanguages.map((key) => ({
                  key,
                }))}
                onChange={changeLanguage}
              />
            </div>
            {item?.useCase &&
              item?.useCase?.map((newCase) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5">
                      {t('content.appoverview.details.useCase')}
                    </Typography>
                    <Typography
                      sx={{
                        padding: '0px 10px',
                      }}
                      variant="caption1"
                    >
                      {newCase}
                    </Typography>
                  </div>
                )
              })}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5">
                {t('content.appoverview.details.price')}
              </Typography>
              <Typography
                sx={{
                  padding: '0px 10px',
                }}
                variant="caption1"
              >
                {item.price}
              </Typography>
            </div>
          </Grid>
        </Grid>
      )}
      <div
        style={{
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <CustomAccordion items={items} />
      </div>
    </>
  )
}
