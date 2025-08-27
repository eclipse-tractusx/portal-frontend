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

import { useParams } from 'react-router-dom'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import AppDetailContentDetails from './AppDetailContentDetails'
import './style.scss'
import { useSelector } from 'react-redux'
import { currentSuccessType } from 'features/serviceMarketplace/slice'
import { useEffect } from 'react'

export default function AppDetail({ navigate }: { readonly navigate: string }) {
  const { appId } = useParams()
  const { data, refetch } = useFetchAppDetailsQuery(appId ?? '')

  const success = useSelector(currentSuccessType)

  useEffect(() => {
    refetch()
  }, [success, refetch])

  return <>{data && <AppDetailContentDetails item={data} nav={navigate} />}</>
}
