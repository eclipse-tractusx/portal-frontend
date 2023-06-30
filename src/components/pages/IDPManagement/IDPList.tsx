/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import {
  IdentityProvider,
  useFetchIDPListQuery,
} from 'features/admin/idpApiSlice'
import IDPListItem from './IDPListItem'
import './style.scss'

export const IDPList = () => {
  const { data } = useFetchIDPListQuery()
  const allowDisable = data && data.filter((idp) => idp.enabled).length > 1

  return (
    <ul className="idp-list">
      {data &&
        data
          .slice()
          .sort((a: IdentityProvider, b: IdentityProvider) =>
            a.alias.localeCompare(b.alias)
          )
          .map((idp) => (
            <li key={idp.identityProviderId}>
              <IDPListItem idp={idp} allowDisable={allowDisable} />
            </li>
          ))}
    </ul>
  )
}
