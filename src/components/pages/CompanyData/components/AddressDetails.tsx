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

import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import { companyDataSelector } from 'features/companyData/slice'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'components/shared/cfx/CopyToClipboard'

export default function AddressDetails() {
  const { t } = useTranslation()
  const companyAddressData = useSelector(companyDataSelector)
  const addressData = [
    {
      key: t('content.companyData.site.form.site.name'),
      value: companyAddressData?.site?.name ?? '',
    },
    {
      key: t('content.companyData.address.form.street.name'),
      value:
        companyAddressData?.address?.physicalPostalAddress?.street.name ?? '',
    },
    {
      key: t('content.companyData.address.form.postal.name'),
      value:
        companyAddressData?.address?.physicalPostalAddress?.postalCode ?? '',
    },
    {
      key: t('content.companyData.address.form.city.name'),
      value: companyAddressData?.address?.physicalPostalAddress?.city ?? '',
    },
    {
      key: t('content.companyData.address.form.countryCode.name'),
      value: companyAddressData?.address?.physicalPostalAddress?.country ?? '',
    },
    {
      key: t('content.companyData.address.bpna.name'),
      value: companyAddressData?.address?.addressBpn ?? '-',
    },
  ]
  return (
    <Box
      className={'cx-company-data__details cx-company-data__details--address'}
    >
      <Box className={'cx-company-data__details--heading'}>
        <Typography variant="h3" className="heading-h2">
          {t('content.companyData.companyInfo.addressTitle')}
        </Typography>
      </Box>
      <Box className={'cx-company-data__details--listing'}>
        {addressData.map((data) => (
          <Box className={'cx-company-data__details--item'} key={data.key}>
            <Box className={'cx-company-data__details--left'}>
              <Typography variant="body1">{data?.key}</Typography>
            </Box>
            <Box className={'cx-company-data__details--right'}>
              {data.value === companyAddressData?.address?.addressBpn ? (
                <CopyToClipboard
                  text={companyAddressData?.address?.addressBpn}
                />
              ) : (
                <Typography variant="body1">{data?.value}</Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      {/* TODO: removed the edit button as per requirement */}
    </Box>
  )
}
