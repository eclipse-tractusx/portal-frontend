/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import {
  useFetchIDPListQuery,
  useFetchIDPUserQuery,
} from 'features/admin/idpApiSlice'
import {
  TenantUser,
  useFetchOwnUserDetailsQuery,
} from 'features/admin/userApiSlice'
import { updateIDPSelector } from 'features/control/updatesSlice'
import { useSelector } from 'react-redux'
import './style.scss'

function UserIDP({ userid, idpid }: { userid: string; idpid: string }) {
  const idpuser = useFetchIDPUserQuery({
    companyUserId: userid,
    identityProviderId: idpid,
  }).data
  return (
    <div>
      {'idpuser'}
      <pre>{JSON.stringify(idpuser, null, 2)}</pre>
    </div>
  )
}

export default function IDPTest() {
  const update = useSelector(updateIDPSelector)
  const userdata = useFetchOwnUserDetailsQuery().data
  const idpdata = useFetchIDPListQuery(update).data

  return (
    <section className="idptest">
      {'userdata'}
      <pre>{JSON.stringify(userdata, null, 2)}</pre>
      {'idplist'}
      <ul>
        {idpdata?.map((item) => (
          <li key={item.identityProviderId}>
            {'idp'}
            <pre>{JSON.stringify(item, null, 2)}</pre>
            {userdata && (
              <UserIDP
                userid={userdata.companyUserId}
                idpid={item.identityProviderId}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
