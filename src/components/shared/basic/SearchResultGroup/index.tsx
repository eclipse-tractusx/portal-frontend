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

import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import type { SearchItem } from 'features/info/search/types'
import { SearchResultItem } from '../SearchResultItem'
import { useTranslation } from 'react-i18next'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { useState } from 'react'
import './style.scss'

const SearchResultList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 12,
    paddingRight: 12,
  },
})

export const SearchResultGroup = ({
  category,
  items,
  expr,
  isFirst,
}: {
  category: string
  items: SearchItem[]
  expr?: string
  isFirst: boolean
}) => {
  const { t } = useTranslation('', { keyPrefix: 'global.search' })
  const [all, setAll] = useState(false)
  return (
    <div>
      {!isFirst && <Divider style={{ marginTop: 12, marginBottom: 12 }} />}
      <Typography
        variant="h3"
        className={!isFirst ? 'searchTitle' : 'searchTitle margin-top-20'}
      >
        {t(`category.${category}`)}
      </Typography>
      <SearchResultList component="nav" disablePadding>
        {(all ? items : items.slice(0, 5)).map((item) => (
          <SearchResultItem key={item.id} item={item} expr={expr} />
        ))}
        {items.length > 5 && (
          <Typography
            sx={{
              marginTop: '20px',
              cursor: 'pointer',
              color: '#0f71cb',
              marginLeft: 4,
              fontSize: 14,
            }}
            onClick={() => {
              setAll(!all)
            }}
          >
            {t(all ? 'less' : 'more')}
          </Typography>
        )}
      </SearchResultList>
    </div>
  )
}
