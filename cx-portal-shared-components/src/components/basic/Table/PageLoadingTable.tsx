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
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { Table, TableProps } from '.'
import { Button } from '../Button'

export type PaginFetchArgs = {
  page: number
  args?: any
}

export type PaginMeta = {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
}

export type PaginResult<T> = {
  meta: PaginMeta
  content: T[]
}

export interface PageLoadingTableProps extends Omit<TableProps, 'rows'> {
  loadLabel: string
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  fetchHookRefresh?: number
}

export const PageLoadingTable = function <T>({
  loadLabel,
  fetchHook,
  fetchHookArgs,
  fetchHookRefresh = 0,
  ...props
}: PageLoadingTableProps) {
  const [page, setPage] = useState(0)
  const [clear, setClear] = useState(true)
  const [loaded, setLoaded] = useState(0)
  const [items, setItems] = useState<T[]>([])
  const { data, isFetching, isSuccess } = fetchHook({
    page: page,
    args: {
      ...fetchHookArgs,
      v: loaded,
    },
  })
  const nextPage = () => setPage(page + 1)
  const hasMore = data?.meta && data.meta.page < data.meta.totalPages - 1
  const maxRows = data?.meta?.totalElements ?? 0

  useEffect(() => {
    if (loaded !== fetchHookRefresh) {
      setLoaded(fetchHookRefresh)
      setPage(0)
      setClear(true)
    }
  }, [fetchHookRefresh, loaded])

  useEffect(() => {
    if (isSuccess && !isFetching && data && data.content) {
      if (clear) {
        setItems([])
        setClear(false)
      } else {
        setItems((i) => i.concat(data.content))
      }
    }
  }, [isSuccess, isFetching, data, clear, loaded])

  return (
    <>
      <Table
        rowsCount={items.length}
        rowsCountMax={maxRows}
        hideFooter={items.length < (props.rowCount || 100)}
        loading={isFetching}
        rows={items}
        {...props}
      />
      {hasMore && (
        <Box
          sx={{
            width: '100%',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button onClick={nextPage}>{loadLabel || 'load more'}</Button>
        </Box>
      )}
    </>
  )
}
