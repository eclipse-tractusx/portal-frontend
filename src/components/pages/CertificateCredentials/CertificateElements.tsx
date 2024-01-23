/********************************************************************************
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

import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { Typography } from '@nidhi.garg/portal-shared-components'
import type { CertificateResponse } from 'features/certification/certificationApiSlice'
import { CertificateCard } from 'components/shared/basic/CertificateCard'
import './CertificateCredentials.scss'

export default function CertificateElements({
  data,
}: Readonly<{
  data: CertificateResponse[]
}>) {
  const { t } = useTranslation()

  if (data && data.length === 0) {
    return (
      <Typography variant="body1" className="noData">
        {t('content.certificates.noData')}
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} className="certificate-section">
      {data?.map((item: CertificateResponse) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          className="certificate-card"
          key={item.credentialType}
        >
          <CertificateCard
            credentialType={item.credentialType}
            ssiDetailData={item.ssiDetailData}
          />
        </Grid>
      ))}
    </Grid>
  )
}
