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
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import MarketplaceContentDetails from './MarketplaceContentDetails'
import './Marketplace.scss'
import { useFetchServiceQuery } from 'features/serviceMarketplace/serviceApiSlice'
import { currentSuccessType } from 'features/serviceMarketplace/slice'

export default function ServiceMarketplaceDetail() {
  const navigate = useNavigate()
  const { serviceId } = useParams()

  const { data, refetch } = useFetchServiceQuery(serviceId ?? '')

  const success = useSelector(currentSuccessType)

  useEffect(() => {
    refetch()
  }, [success, refetch])

  return (
    <main className="marketplace-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/servicemarketplace')}
      >
        {t('global.actions.back')}
      </Button>
      {data && <MarketplaceContentDetails item={data} success={success} />}
    </main>
  )
}
