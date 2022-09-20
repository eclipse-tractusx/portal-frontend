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

import debounce from 'lodash.debounce'
import { useTranslation } from 'react-i18next'
import { SearchInput } from 'cx-portal-shared-components'
import { useState, useMemo, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch, fetchSearch } from 'features/info/search/actions'
import './search-section.scss'
import PageService from 'services/PageService'
import { searchExprSelector } from 'features/info/search/slice'

export const label = 'Search'

export default function SearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentExpr = useSelector(searchExprSelector)
  const [searchExpr, setSearchExpr] = useState<string>(currentExpr)

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string) => {
        //PageService.scrollTo(label)
        dispatch(expr ? fetchSearch(expr) : clearSearch())
      }, 400),
    [dispatch]
  )

  const doSearch = useCallback(
    (expr: string) => {
      setSearchExpr(expr)
      debouncedSearch(expr)
    },
    [debouncedSearch]
  )

  const reference = PageService.registerReference(label, useRef(null))

  return (
    <div ref={reference} className="search-section">
      <SearchInput
        placeholder={t('content.home.searchSection.inputPlaceholder')}
        value={searchExpr}
        autoFocus={true}
        onChange={(e) => doSearch(e.target.value)}
      />
    </div>
  )
}
