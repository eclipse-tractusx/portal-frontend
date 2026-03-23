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
import { BackButton } from '@arena2036/portal-shared-components-construct-x'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import MarketplaceContentDetails from './MarketplaceContentDetails'
import { useFetchServiceQuery } from 'features/serviceMarketplace/serviceApiSlice'
import {
  currentSuccessType,
  setSuccessType,
} from 'features/serviceMarketplace/slice'
import { PAGES } from 'types/Constants'
import './style.scss'

export default function ServiceMarketplaceDetail() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const dispatch = useDispatch()

  const { data, refetch } = useFetchServiceQuery(serviceId ?? '')

  const success = useSelector(currentSuccessType)

  useEffect(() => {
    refetch()
  }, [success, refetch])

  return (
    <main className="marketplace-main">
      <Box className="service-back app-back">
        <BackButton
          backButtonLabel={t('global.actions.back')}
          backButtonVariant="text"
          onBackButtonClick={() => {
            dispatch(setSuccessType(false))
            navigate(`/${PAGES.SERVICE_MARKETPLACE}`)
          }}
        />
      </Box>
      {data && (
        <Box className="service-marketplace-content">
          <MarketplaceContentDetails item={data} success={success} />
        </Box>
      )}
    </main>
  )
}
