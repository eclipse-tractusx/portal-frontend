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

export default function AddressDetails({ onEdit }: { readonly onEdit: () => void }) {
  const { t } = useTranslation()
  const addressData = [
    {
      key: t('content.companyData.address.form.companySite.name'),
      value: '',
    },
    {
      key: t('content.companyData.address.form.addressTitle.name'),
      value: '',
    },
    {
      key: t('content.companyData.address.form.street.name'),
      value: '',
    },
    {
      key: t('content.companyData.address.form.postal.name'),
      value: '',
    },
    {
      key: t('content.companyData.address.form.city.name'),
      value: '',
    },
  ]
  return (
    <div>
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
        {t('content.companyData.companyInfo.addressTitle')}
      </Typography>
      <Box
        sx={{
          marginBottom: '50px',
        }}
      >
        {addressData.map((data) => (
          <Box
            key={data.key}
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
              {data.key}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '18px',
              }}
            >
              {data.value}
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
    </div>
  )
}
