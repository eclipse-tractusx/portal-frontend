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

import { Typography } from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { CopyToClipboard } from 'components/shared/cfx/CopyToClipboard'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'

export default function CompanyInfo() {
  const { data: companyDetails } = useFetchOwnCompanyDetailsQuery('')
  const { t } = useTranslation()

  return (
    <Box
      className={'cx-company-data__details cx-company-data__details--status'}
    >
      <Box className={'cx-company-data__details--left'}>
        <Box className={'cx-company-data__details--heading'}>
          <Typography variant="body1">
            {t('content.companyData.companyInfo.title')}
          </Typography>
        </Box>
      </Box>
      <Box
        className={
          'cx-company-data__details--right cx-company-data__details--info'
        }
      >
        <Typography variant="body1">{companyDetails?.shortName}</Typography>
        <Typography variant="body1">
          <CopyToClipboard text={companyDetails?.bpn} />
        </Typography>
      </Box>
    </Box>
  )
}
