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

import { multiMapBy } from 'utils/multiMapBy'
import { RawItemView } from '../RawItemView'
import './GroupItemView.scss'

export const GroupItemView = ({
  items,
  groupKey,
}: {
  items: any[]
  groupKey: string
}) => {
  if (!groupKey || groupKey === '') {
    return <RawItemView items={items} />
  }

  const group = multiMapBy(items, (item) => item[groupKey])

  return (
    <ul className="GroupItemView">
      {Object.entries(group).map((v) => (
        <li key={v[0]}>
          <p>
            <span>{v[0]}</span>
          </p>
          <RawItemView items={v[1]} />
        </li>
      ))}
    </ul>
  )
}
