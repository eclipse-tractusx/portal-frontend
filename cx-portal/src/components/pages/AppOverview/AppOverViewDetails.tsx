/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { getAppImage } from 'features/apps/mapper'
import {
  Card,
  Cards,
  LanguageSwitch,
  Typography,
  CustomAccordion,
} from 'cx-portal-shared-components'
import { Grid } from '@mui/material'
import I18nService from 'services/I18nService'
import i18next, { changeLanguage } from 'i18next'
import { AppDetails } from 'features/apps/apiSlice'
import AppDetailHowToUse from '../AppDetail/components/AppDetailHowToUse'
import AppDetailPrivacy from '../AppDetail/components/AppDetailPrivacy'
import AppDetailProvider from '../AppDetail/components/AppDetailProvider'
import AppDetailTags from '../AppDetail/components/AppDetailTags'

export default function AppOverViewDetails({ item }: { item: AppDetails }) {
  const items = [
    {
      expanded: false,
      id: 'panel-1',
      title: 'Privacy',
      color: 'background.background09',
      children: <AppDetailPrivacy />,
    },
    {
      expanded: false,
      id: 'panel-2',
      title: 'Terms',
      color: 'background.background09',
      children: <AppDetailHowToUse item={item} />,
    },
    {
      expanded: false,
      id: 'panel-3',
      title: 'Provider',
      color: 'background.background09',
      children: <AppDetailProvider item={item} />,
    },
    {
      expanded: false,
      id: 'panel-4',
      title: 'Tags',
      color: 'background.background09',
      children: <AppDetailTags item={item} />,
    },
  ]

  return (
    <>
      {item && (
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item>
            <Card
              image={{
                src: 'https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Default.png',
              }}
              title={item.title}
              subtitle={item.provider}
              description={item.longDescription}
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
              marginLeft: '20%',
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
              <Typography variant="h5">Language:</Typography>
              <LanguageSwitch
                current={i18next.language}
                languages={I18nService.supportedLanguages.map((key) => ({
                  key,
                }))}
                onChange={changeLanguage}
              />
            </div>
            {item?.useCases &&
              item?.useCases?.map((newCase) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5">Use Case:</Typography>
                    <Typography
                      sx={{
                        padding: '0px 10px',
                        fontSize: '18px',
                      }}
                      variant="caption"
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
              <Typography variant="h5">Price:</Typography>
              <Typography
                sx={{
                  padding: '0px 10px',
                  fontSize: '18px',
                }}
                variant="caption"
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
