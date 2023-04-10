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

import { CircleProgress } from 'cx-portal-shared-components'
import {
  useFetchIDPListQuery,
  IdentityProvider,
} from 'features/admin/idpApiSlice'
import { AddUserContent } from './AddUserContent'
import { AddUserDeny } from './AddUserDeny'
import { useEffect, useState } from 'react'

export const AddUser = () => {
  const { data, isFetching } = useFetchIDPListQuery()
  const [idps, setIdps] = useState<IdentityProvider[]>([])

  useEffect(
    () =>
      setIdps(data ? data.filter((idp: IdentityProvider) => idp.enabled) : []),
    [data]
  )

  return isFetching ? (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircleProgress
        colorVariant="primary"
        size={80}
        thickness={8}
        variant="indeterminate"
      />
    </div>
  ) : idps.length === 1 ? (
    <AddUserContent idp={idps[0]} />
  ) : (
    <AddUserDeny idps={idps} />
  )
}
