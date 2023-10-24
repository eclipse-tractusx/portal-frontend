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

import { SelectList } from '@catena-x/portal-shared-components'
import { UNIQUE_ID_TYPE } from 'features/admin/networkApiSlice'

const UniqueIdSelectList = () => {
  type ItemType = { id: string; title: string; value: string }
  const uniqeIdItems: Array<ItemType> = Object.keys(UNIQUE_ID_TYPE).map(
    (item) => ({
      id: item,
      title: item,
      value: item,
    })
  )

  return (
    <SelectList
      {...{
        items: uniqeIdItems,
        value: uniqeIdItems[0],
        label: 'Select country',
        placeholder: 'Enter country name (type min 2 character)',
        helperText: 'Helper',
        disabled: false,
        error: false,
        margin: 'dense',
        variant: 'filled',
        focused: false,
        clearText: 'clear',
        noOptionsText: 'No Options',
        popperHeight: 0, // 0 = auto size
        onChangeItem: console.log,
        keyTitle: 'title',
      }}
    />
  )
}

export default function Test() {
  return (
    <main>
      <section>
        <UniqueIdSelectList />
      </section>
    </main>
  )
}
