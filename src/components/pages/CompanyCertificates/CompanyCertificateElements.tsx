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

import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { Typography } from '@catena-x/portal-shared-components'
import './CompanyCertificate.scss'
import { type ComapnyCertificateData } from 'features/companyCertification/companyCertificateApiSlice'
import CompanyCertificateCard from './CompanyCertificateCard'

export default function CompanyCertificateElements({
  data,
}: Readonly<{
  data: ComapnyCertificateData[]
}>): JSX.Element {
  const { t } = useTranslation()

  if (data?.length === 0) {
    return (
      <Typography variant="body1" className="noData">
        {t('content.companyCertificate.noData')}
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} className="company-certificate-section">
      {data?.map((item: ComapnyCertificateData) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          className="company-certificate-card"
          key={item.companyCertificateType}
        >
          <CompanyCertificateCard item={item} />
        </Grid>
      ))}
    </Grid>
  )
}
