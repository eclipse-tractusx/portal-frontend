/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { ParentSubNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import '../../CompanyRoles.scss'
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

  const linkArray = [
    {
      index: 1,
      title: t('navigation.companyRoleSubNavigation.link1Label'),
      navigation: 'provider-id',
    },
    {
      index: 2,
      title: t('navigation.companyRoleSubNavigation.link2Label'),
      navigation: 'operations-id',
    },
    {
      index: 3,
      title: t('navigation.companyRoleSubNavigation.link3Label'),
      navigation: 'participant-id',
    },
  ]

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 113, 203, 0.05)',
        height: '100px',
      }}
    >
      <div className="subNavigationContainer">
        <ParentSubNavigation
          navigationArray={linkArray}
          onClick={(value: string) => scrollToId(value)}
        />
      </div>
    </Box>
  )
}
