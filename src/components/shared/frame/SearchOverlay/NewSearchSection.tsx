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

import debounce from 'lodash.debounce'
import { useTranslation } from 'react-i18next'
import { SearchInput } from '@arena2036/portal-shared-components-construct-x'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch, fetchSearch } from 'features/info/search/actions'
import './style.scss'
import PageService from 'services/PageService'
import { searchExprSelector } from 'features/info/search/slice'
import type { AppDispatch } from 'features/store'

export const label = 'Search'

export default function NewSearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const currentExprssion = useSelector(searchExprSelector)
  const [searchExpression, setSearchExpression] =
    useState<string>(currentExprssion)

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string) => {
        dispatch(expr ? fetchSearch(expr) : clearSearch())
      }, 400),
    [dispatch]
  )

  const onSearch = useCallback(
    (expr: string) => {
      setSearchExpression(expr)
      debouncedSearch(expr)
    },
    [debouncedSearch]
  )

  useEffect(() => {
    setSearchExpression('')
  }, [])

  const reference = PageService.registerReference(label, useRef(null))

  return (
    <div ref={reference} className="new-search-section">
      <SearchInput
        placeholder={t('content.home.searchSection.inputPlaceholder')}
        value={searchExpression}
        autoFocus={true}
        onChange={(e) => {
          onSearch(e.target.value)
        }}
      />
    </div>
  )
}
