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

import debounce from 'lodash.debounce'
import { useCallback, useMemo, useState } from 'react'
import { SearchInput } from '@catena-x/portal-shared-components'
import type { SxProps, Theme } from '@mui/material'

const DebouncedSearchInput = ({
  sx = {},
  placeholder = '',
  value = '',
  onSearch,
  debounceTime = 300,
}: {
  sx?: SxProps<Theme>
  placeholder?: string
  value?: string
  onSearch: (expr: string) => void
  debounceTime?: number
}) => {
  const [searchExpr, setSearchExpr] = useState<string>(value ?? '')

  const debouncedSearch = useMemo(() => debounce(onSearch, debounceTime), [])

  const doSearch = useCallback(
    (expr: string) => {
      setSearchExpr(expr)
      debouncedSearch(expr)
    },
    [debouncedSearch]
  )

  return (
    <SearchInput
      sx={sx}
      placeholder={placeholder}
      value={searchExpr}
      onChange={(e) => {
        doSearch(e.target.value)
      }}
    />
  )
}

export default DebouncedSearchInput
