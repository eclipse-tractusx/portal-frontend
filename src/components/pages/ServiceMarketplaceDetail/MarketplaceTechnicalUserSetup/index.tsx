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

import { useTranslation } from 'react-i18next'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import type { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import { useFetchServiceTechnicalUserProfilesQuery } from 'features/serviceManagement/apiSlice'
import { TechUserTable } from 'components/shared/basic/ReleaseProcess/TechnicalIntegration/TechUserTable'

export default function MarketplaceTechnicalUserSetup({
  item,
}: Readonly<{
  item: ServiceRequest
}>) {
  const { t } = useTranslation('')
  const { data: technicalUserProfiles } =
    useFetchServiceTechnicalUserProfilesQuery(item.id ?? '')
  return (
    <>
      <Typography variant="h3">
        {t('content.appdetail.technicalUserSetup.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('content.appdetail.technicalUserSetup.message')}
      </Typography>
      <TechUserTable
        userProfiles={technicalUserProfiles ?? []}
        disableActions={true}
      />
    </>
  )
}
