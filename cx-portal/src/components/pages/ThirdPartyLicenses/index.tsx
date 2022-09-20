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

import { SearchInput } from 'cx-portal-shared-components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from 'features/info/licenses/actions'
import { itemsSelector } from 'features/info/licenses/slice'
import debounce from 'lodash.debounce'
import StageHeader from 'components/shared/frame/StageHeader'

export default function ThirdPartyLicenses() {
  const { t } = useTranslation('footer', { keyPrefix: 'licenses' })
  const dispatch = useDispatch()
  const [filterExpr, setFilterExpr] = useState<string>('')
  const [filter, setFilter] = useState<RegExp>(/./)
  const items = useSelector(itemsSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        setFilter(new RegExp(expr, 'i'))
      }, 300),
    [setFilter]
  )

  const doFilter = useCallback(
    (expr: string) => {
      setFilterExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  return (
    <main>
      <StageHeader title={t('title')} />
      <section>
        <SearchInput
          margin="normal"
          autoFocus={true}
          value={filterExpr}
          onChange={(event) => doFilter(event.target.value)}
        />
        <ul>
          {items?.data.body
            .filter(
              (pkg: string[]) =>
                filter.test(pkg[0]) ||
                filter.test(pkg[2]) ||
                filter.test(pkg[5])
            )
            .map((pkg: string[], i: number) => (
              <li key={i}>
                <a href={`https://www.npmjs.com/package/${pkg[0]}`}>{pkg[0]}</a>
                <span> {pkg[1]} </span>
                <span> {pkg[2]} </span>
              </li>
            ))}
        </ul>
      </section>
    </main>
  )
}
