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
import { useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import AppDetailContentDetails from './AppDetailContentDetails'
import './AppDetail.scss'

export default function AppDetail() {
  const navigate = useNavigate()
  const { appId } = useParams()
  const { data } = useFetchAppDetailsQuery(appId!)

  return (
    <main className="appdetail-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/appmarketplace')}
      >
        {t('global.actions.back')}
      </Button>
      {data && <AppDetailContentDetails item={data} />}
    </main>
  )
}
