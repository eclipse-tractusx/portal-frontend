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
import { PAGES } from 'types/Constants'
import PageHeaderWithCrumbs from 'components/shared/frame/PageHeaderWithCrumbs'
import TechnicalUserDetailsContent from './TechnicalUserDetailsContent'
import { useFetchServiceAccountDetailQuery } from 'features/admin/serviceApiSlice'
import { Empty } from 'components/shared/basic/Empty'

export default function TechnicalUserDetails() {
  const { userId } = useParams()
  const { data } = useFetchServiceAccountDetailQuery(userId ?? '')
  return (
    <main>
      <PageHeaderWithCrumbs
        crumbs={[
          PAGES.USER_MANAGEMENT,
          PAGES.TECHUSER_MANAGEMENT,
          PAGES.TECHUSER_DETAILS,
        ]}
      />
      {data ? <TechnicalUserDetailsContent data={data} /> : <Empty />}
    </main>
  )
}
