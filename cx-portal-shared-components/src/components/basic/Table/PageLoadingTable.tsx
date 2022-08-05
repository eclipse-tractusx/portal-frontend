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

export interface PageLoadingTableProps extends Omit<TableProps, 'rows'> {
  loadLabel: string
  fetch: (page: number, id?: string) => any
  id?: string
}

export const PageLoadingTable = function <T>({
  loadLabel,
  fetch,
  id,
  ...props
}: PageLoadingTableProps) {
  const [page, setPage] = useState(0)
  const { data, isFetching, isSuccess } = id ? fetch(page, id) : fetch(page)
  const [items, setItems] = useState<T[]>([])
  const hasMore = data?.meta && data.meta.page < data.meta.totalPages - 1
  const nextPage = () => setPage(page + 1)
  useEffect(() => {
    if (isSuccess && !isFetching) {
      setItems((i) => i.concat(data.content))
    }
  }, [isSuccess, isFetching, data])

  return (
    <>
      <Table
        rowCount={props.rowCount || 100}
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
