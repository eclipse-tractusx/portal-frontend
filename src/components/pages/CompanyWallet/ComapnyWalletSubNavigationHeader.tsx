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
import { Typography, Button } from '@catena-x/portal-shared-components'
import './CompanyWallet.scss'
import EastIcon from '@mui/icons-material/East'
import { useNavigate } from 'react-router'

export default function ComapnyWalletSubNavigationHeader(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const links = [
    {
      title: t('content.companyWallet.subnavigation.button1'),
      link: '/usecase-participation',
    },
    {
      title: t('content.companyWallet.subnavigation.button2'),
      link: '/company-role',
    },
    {
      title: t('content.companyWallet.subnavigation.button3'),
      link: '',
    },
  ]

  return (
    <div className="subnavigation">
      <div className="title">
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
          }}
        >
          {t('content.companyWallet.subnavigation.title')}
        </Typography>
      </div>
      {links.map((nav) => (
        <Button
          key={nav.title}
          onClick={() => {
            if (nav.link !== '') navigate(nav.link)
          }}
          color="secondary"
          variant="text"
          size="medium"
          sx={{
            fontSize: '16px',
          }}
        >
          <EastIcon sx={{ marginRight: '16px', fontSize: '15px' }} />
          {nav.title}
        </Button>
      ))}
    </div>
  )
}
