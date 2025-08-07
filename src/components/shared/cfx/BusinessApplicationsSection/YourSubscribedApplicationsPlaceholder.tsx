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
import './YourSubscribedApplicationsPlaceholder.scss'
import { Typography } from '@mui/material'

export default function YourSubscribedApplicationsPlaceholder() {
  const { t } = useTranslation()

  return (
    <div className="your-subscribe-applications-placeholder">
      <div className="container">
        <Typography sx={{ typography: 'h4', mb: 2.5 }}>
          {t('homepage.placeholder.title')}
        </Typography>
        <Typography sx={{ typography: 'body2', fontWeight: 500 }}>
          {t('homepage.placeholder.description')}
        </Typography>
      </div>
    </div>
  )
}
