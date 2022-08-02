/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TechnicalUserDetailsGrid } from '../TechnicalUserDetails/TechnicalUserDetailsGrid'
import { Box } from '@mui/material'
import { ServiceAccountDetail } from 'features/admin/service/apiSlice'

export default function Render({ item }: { item: ServiceAccountDetail }) {
  const { t } = useTranslation()

  const removeTechnicalUser = () => {
    console.log('TODO: Remove technical user function!')
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        startIcon={<HighlightOffIcon />}
        onClick={removeTechnicalUser}
      >
        {t('content.usermanagement.technicalUser.delete')}
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '130px',
          marginBottom: '92px',
          width: '100%',
        }}
      >
        <TechnicalUserDetailsGrid
          items={[item.clientId, item.authenticationType, item.secret]}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.userDetails'
          )}
        />

        <TechnicalUserDetailsGrid
          items={[item.description]}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.description'
          )}
        />

        <TechnicalUserDetailsGrid
          items={['Organisation name', 'User Name', 'admin@gmail.com']}
          title={t('content.usermanagement.technicalUser.detailsPage.spoc')}
        />

        <TechnicalUserDetailsGrid
          items={['load registry data', 'view registry data', 'access_xy']}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.permission'
          )}
        />
      </Box>
    </>
  )
}
