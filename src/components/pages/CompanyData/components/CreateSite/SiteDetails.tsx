/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Box, Divider } from '@mui/material'
import CompanyInfo from '../CompanyInfo'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from '@catena-x/portal-shared-components'

export default function SiteDetails({ onEdit }: { onEdit: () => void }) {
  const { t } = useTranslation()
  const siteData = [
    {
      attr: t('content.companyData.site.form.site.name'),
      val: '',
    },
    {
      attr: t('content.companyData.site.form.street.name'),
      val: '',
    },
    {
      attr: t('content.companyData.site.form.postal.name'),
      val: '',
    },
    {
      attr: t('content.companyData.site.form.city.name'),
      val: '',
    },
    {
      attr: t('content.companyData.site.form.countryCode.name'),
      val: '',
    },
  ]
  return (
    <Box>
      <CompanyInfo />
      <Divider
        sx={{
          borderColor: '#111111',
          margin: '0px 5%',
        }}
      />
      <Typography
        variant="h2"
        sx={{
          fontSize: '18px',
          marginTop: '50px',
          padding: '0px 10%',
        }}
      >
        {t('content.companyData.companyInfo.siteTitle')}
      </Typography>
      <Box
        sx={{
          marginBottom: '50px',
        }}
      >
        {siteData.map((item) => (
          <Box
            key={item.attr}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '30px',
              marginTop: '30px',
              padding: '0px 10%',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '18px',
              }}
            >
              {item.attr}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '18px',
              }}
            >
              {item.val}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider
        sx={{
          borderColor: '#111111',
          margin: '0px 5%',
        }}
      />
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        <Button size="medium" onClick={onEdit}>
          {t('global.actions.edit')}
        </Button>
      </Box>
    </Box>
  )
}
