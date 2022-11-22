/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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
import '../../CompanyRoles.scss'
import EastIcon from '@mui/icons-material/East'
import { Box } from '@mui/material'

export const StageSubNavigation = () => {
  const { t } = useTranslation()
  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    const top = element?.offsetTop
    window.scrollTo({
      top: top,
      behavior: 'smooth',
    })
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 113, 203, 0.05)',
        height: '100px',
      }}
    >
      <div className="subNavigationContainer">
        <Button
          onClick={() => scrollToId('provider-id')}
          color="secondary"
          variant="text"
          size="medium"
        >
          <EastIcon sx={{ marginRight: '16px' }} />
          {t('navigation.companyRoleSubNavigation.link1Label')}
        </Button>
        <Button
          onClick={() => scrollToId('operations-id')}
          color="secondary"
          variant="text"
          size="medium"
        >
          <EastIcon sx={{ marginRight: '16px' }} />
          {t('navigation.companyRoleSubNavigation.link2Label')}
        </Button>
        <Button
          onClick={() => scrollToId('participant-id')}
          color="secondary"
          variant="text"
          size="medium"
        >
          <EastIcon sx={{ marginRight: '16px' }} />
          {t('navigation.companyRoleSubNavigation.link3Label')}
        </Button>
      </div>
    </Box>
  )
}
