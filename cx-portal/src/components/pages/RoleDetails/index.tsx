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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { Typography, Tabs, Tab } from 'cx-portal-shared-components'
import './RoleDetails.scss'

export default function RoleDetails() {
  const { t } = useTranslation('', { keyPrefix: 'content.roleDetails' })

  const [activeTab, setActiveTab] = useState<number>(0)

  const handleChange = (event: any, newValue: number) => {
    // setHeight(
    //   modalElement && modalElement.current
    //     ? `${modalElement?.current?.clientHeight}px`
    //     : '400px'
    // )
    setActiveTab(newValue)
  }

  return (
    <div className="role-details">
      <div className="role-details-main">
        <Box sx={{ marginTop: '20px' }} className="overview-section">
          <section>
            <div className="heading">
              <Typography
                sx={{ fontFamily: 'LibreFranklin-Light' }}
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
                  '&.Mui-selected': {
                    borderBottom: '3px solid #0f71cb',
                  },
                }}
                label={t('tab2')}
                id={`simple-tab-${activeTab}`}
                aria-controls={`simple-tabpanel-${activeTab}`}
              />
            </Tabs>
          </section>
        </Box>
      </div>
    </div>
  )
}
