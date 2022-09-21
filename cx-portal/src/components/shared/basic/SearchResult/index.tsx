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

import { groupBy } from 'lodash'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { SearchItem } from 'features/info/search/types'
import { SearchResultGroup } from '../SearchResultGroup'

export const SearchResult = ({
  expr,
  items,
}: {
  expr?: string
  items: SearchItem[]
}) => {
  const groupedItems = groupBy(items, (item: SearchItem) => item.category)
  const groupList = Object.entries(groupedItems).sort(
    (a: [string, SearchItem[]], b: [string, SearchItem[]]) =>
      a[0].localeCompare(b[0])
  )
  return (
    <Box sx={{ display: 'flex' }}>
      <Paper elevation={5} sx={{ width: 700, padding: 4, borderRadius: 4 }}>
        {groupList.map((item: [string, SearchItem[]], index: number) => (
          <SearchResultGroup
            key={item[0]}
            category={item[0]}
            expr={expr}
            items={item[1]}
            isFirst={index === 0}
          />
        ))}
      </Paper>
    </Box>
  )
}
