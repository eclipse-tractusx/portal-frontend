/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { type SyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Box } from '@mui/material'
import {
  Typography,
  Tabs,
  Tab,
  TabPanel,
  Image,
} from '@arena2036/portal-shared-components-construct-x'
import CommonService from 'services/CommonService'
import { getAssetBase } from 'services/EnvironmentService'
import { uniqueId } from 'lodash'

export type RoleDescData = {
  title: string
  subTitles: string[]
  descriptions: string[]
}

export default function RoleDetails() {
  const { t } = useTranslation('', { keyPrefix: 'content.roleDetails' })

  const [dataArray, setDataArray] = useState<RoleDescData[]>()

  useEffect(() => {
    CommonService.getRoleDescription((data: RoleDescData[]) => {
      setDataArray(data)
    })
  }, [])

  const [activeTab, setActiveTab] = useState<number>(0)

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ marginTop: '20px' }} className="overview-section">
      <section>
        <div className="heading">
          <Typography
            sx={{
              fontFamily: 'Montserrat-Light',
              marginBottom: '40px !important',
              maxWidth: '30%',
              margin: '0 auto',
              fontWeight: '600',
            }}
            variant="h3"
            className="section-title"
          >
            {t('heading')}
          </Typography>
        </div>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab
            sx={{
              fontSize: '18px',
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
            }}
            label={t('tab1')}
            id={`simple-tab-${activeTab}`}
            aria-controls={`simple-tabpanel-${activeTab}`}
          />
          <Tab
            sx={{
              fontSize: '18px',
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
            }}
            label={t('tab2')}
            id={`simple-tab-${activeTab}`}
            aria-controls={`simple-tabpanel-${activeTab}`}
          />
        </Tabs>
        <div style={{ margin: '20px' }}>
          <TabPanel value={activeTab} index={0}>
            {dataArray?.map((data: RoleDescData) => (
              <div key={uniqueId(data.title)}>
                <Typography
                  variant="h4"
                  sx={{ textDecoration: 'underline', marginBottom: '5px' }}
                >
                  {data.title}
                </Typography>
                <Grid container spacing={2} sx={{ margin: '0px 0 40px' }}>
                  <>
                    {data.subTitles.map((subTitle: string, index: number) => (
                      <Grid item xs={6} key={uniqueId(subTitle)}>
                        <Typography variant="h5">{subTitle}</Typography>
                        <Typography variant="caption3">
                          {data.descriptions[index]}
                        </Typography>
                      </Grid>
                    ))}
                  </>
                </Grid>
              </div>
            ))}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Image
              src={`${getAssetBase()}/images/content/PortalRoleAndPermissionMatrix.png`}
              style={{
                width: '100%',
              }}
            />
            <Image
              src={`${getAssetBase()}/images/content/RegistrationRoleAndPermissionMatrix.png`}
              style={{
                width: '100%',
              }}
            />
          </TabPanel>
        </div>
      </section>
    </Box>
  )
}
