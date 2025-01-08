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
import { useTranslation } from 'react-i18next'
import { Button, Typography } from '@catena-x/portal-shared-components'
import { companyDataSelector } from 'features/companyData/slice'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'components/shared/cfx/CopyToClipboard'

export default function SiteDetails({
  onEdit,
}: {
  readonly onEdit: () => void
}) {
  const { t } = useTranslation()
  const companySiteData = useSelector(companyDataSelector)
  const siteData = [
    {
      attr: t('content.companyData.site.form.site.name'),
      val: companySiteData.site.name ?? '',
    },
    {
      attr: t('content.companyData.site.form.street.name'),
      val: companySiteData.address.physicalPostalAddress.street?.name ?? '',
    },
    {
      attr: t('content.companyData.site.form.postal.name'),
      val: companySiteData.address.physicalPostalAddress.postalCode ?? '',
    },
    {
      attr: t('content.companyData.site.form.city.name'),
      val: companySiteData.address.physicalPostalAddress.city ?? '',
    },
    {
      attr: t('content.companyData.site.form.countryCode.name'),
      val: companySiteData.address.physicalPostalAddress.country ?? '',
    },
    {
      attr: t('content.companyData.site.bpns.name'),
      val: companySiteData?.site.siteBpn ?? '-',
    },
  ]
  return (
    <Box className={'cx-company-data__details cx-company-data__details--site'}>
      <Box className={'cx-company-data__details--heading'}>
        <Typography variant="h3" className="heading-h2">
          {t('content.companyData.companyInfo.siteTitle')}
        </Typography>
      </Box>

      <Box className={'cx-company-data__details--listing'}>
        {siteData.map((item) => (
          <Box className={'cx-company-data__details--item'} key={item.attr}>
            <Box className={'cx-company-data__details--left'}>
              <Typography variant="body1">{item.attr}</Typography>
            </Box>
            <Box className={'cx-company-data__details--right'}>
              {item.val === companySiteData?.site?.siteBpn ? (
                <CopyToClipboard text={companySiteData?.site?.siteBpn} />
              ) : (
                <Typography variant="body1">{item.val}</Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <Divider className={'cx-company-data__details--divider'} />
      <Box className={'cx-company-data__details--actions'}>
        <Button size="medium" onClick={onEdit}>
          {t('global.actions.edit')}
        </Button>
      </Box>
    </Box>
  )
}
