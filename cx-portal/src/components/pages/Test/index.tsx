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
import {
  ServiceAccountType,
  useRemoveServiceAccountMutation,
  useAddServiceAccountMutation,
  useFetchServiceAccountListQuery,
} from 'features/admin/service/apiSlice'
import { useFetchUserAppRolesQuery } from 'features/admin/user/app/apiSlice'
import { sample } from 'lodash'

const ROLE_IDS = [
  '607818be-4978-41f4-bf63-fa8d2de51155',
  '607818be-4978-41f4-bf63-fa8d2de51156',
  '607818be-4978-41f4-bf63-fa8d2de51157',
]

export default function Test() {
  const roles = useFetchUserAppRolesQuery('5cf74ef8-e0b7-4984-a872-474828beb5d8').data
  //useFetchServiceAccountDetailQuery c0c52362-4a18-4dc7-a2bb-68880198204a
  const { data } = useFetchServiceAccountListQuery(0)

  const [addServiceAccount] = useAddServiceAccountMutation()
  const [removeServiceAccount] = useRemoveServiceAccountMutation()

  const handleAdd = async () => {
    try {
      const result = await addServiceAccount({
        name: `testaccount-${Math.random()}`,
        description: 'none',
        authenticationType: ServiceAccountType.SECRET,
        roleIds: [sample(ROLE_IDS)!],
      }).unwrap()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = async () => {
    if (!data || !data.content) return
    try {
      const result = await removeServiceAccount(
        data.content[0].serviceAccountId
      ).unwrap()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <Button onClick={handleAdd}>Add</Button>
      <Button onClick={handleRemove}>Remove</Button>
      <pre>{JSON.stringify(roles, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
