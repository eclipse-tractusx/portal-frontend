/********************************************************************************
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

import { useSelector, useDispatch } from 'react-redux'
import {
  searchExprSelector,
  searchItemSelector,
} from 'features/info/search/slice'
import { SearchResult } from 'components/shared/basic/SearchResult'
import './style.scss'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { useEffect, useState } from 'react'
import { clearSearch } from 'features/info/search/actions'

export default function SearchResultSection() {
  const searchExpr = useSelector(searchExprSelector)
  const dispatch = useDispatch()
  const searchItems = useSelector(searchItemSelector)
  const [canShowNow, setCanShowNow] = useState<boolean>(false)
  useEffect(() => {
    searchExpr.length === 0
      ? setCanShowNow(false)
      : setTimeout(() => {
          setCanShowNow(true)
        }, 1000)
  }, [searchExpr])

  useEffect(() => {
    dispatch(clearSearch())
  }, [])

  return searchItems.length > 0 ? (
    <div className="search-result-section">
      <SearchResult expr={searchExpr} items={searchItems} />
    </div>
  ) : (
    <>
      {canShowNow && searchExpr.length > 0 && (
        <div className="search-result-section">
          <Typography variant="body1" className="not-found">
            No search results found
          </Typography>
        </div>
      )}
    </>
  )
}
