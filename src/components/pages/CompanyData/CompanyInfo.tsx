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

import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import LabelWithTooltips from './LabelWithTooltips'

export default function CompanyInfo() {
  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery('')
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: '30px',
        padding: '0px 10%',
        marginTop: '50px',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '18px',
          width: '200px',
        }}
      >
        {t('content.companyData.companyInfo.title')}
      </Typography>
      <Box
        sx={{
          marginLeft: '20%',
        }}
      >
        <LabelWithTooltips
          value={companyDetails?.shortName}
          label={t('content.companyData.companyInfo.legalEntityNameTooltip')}
          tooltipMsg={t('content.companyData.companyInfo.legalEntityName')}
        />
        <LabelWithTooltips
          value={companyDetails?.bpn}
          label={t('content.companyData.companyInfo.legalEntityNumberTooltip')}
          tooltipMsg={t('content.companyData.companyInfo.legalEntityNumber')}
        />
      </Box>
    </Box>
  )
}
