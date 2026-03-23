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

import { Cards } from '@arena2036/portal-shared-components-construct-x'
import './style.scss'
import { useGetItemsQuery } from 'features/info/news/apiSlice'

export default function NewsSection() {
  const { data: items = [] } = useGetItemsQuery()

  return (
    <section className="news-section">
      <Cards
        items={items}
        columns={3}
        buttonText="Details"
        imageSize="normal"
        imageShape="round"
        variant="text-only"
      />
    </section>
  )
}
