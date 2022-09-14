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
import {
  isContentPresent,
  isQueryDataPresent,
  addNewAttributes,
  hasMorePages,
  getMaxRows,
} from './components/Helper/helper'

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
  additionalHooks?: any
}

export const PageLoadingTable = function <T>({
  loadLabel,
  fetchHook,
  fetchHookArgs,
  fetchHookRefresh = 0,
  additionalHooks,
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
  const hasMore = hasMorePages(data)
  const maxRows = getMaxRows(data) // Check for top level attributes as BPDM does not has meta attirbute in the response

  useEffect(() => {
    if (loaded !== fetchHookRefresh) {
      setLoaded(fetchHookRefresh)
      setPage(0)
      setClear(true)
    }
  }, [fetchHookRefresh, loaded])

  useEffect(() => {
    if (isSuccess && !isFetching && data && (data.content || data.bpn)) {
      if (clear) {
        setItems([])
        setClear(false)
      } else {
        if (additionalHooks) {
          fetchAndApply(data)
        } else {
          data.content
            ? setItems((i) => i.concat(data.content))
            : setItems([data]) // Search for legal entity based on BPN responses with an object. No content or meta properties available
        }
      }
    }
  }, [isSuccess, isFetching, data, clear, loaded])

  const fetchAndApply = async (data: any) => {
    //BPDM response does not has content attribute. Check for it and proceed
    if (isContentPresent(data)) {
      const result = data.content.map((x: any) => x.legalEntity.bpn)
      if(additionalHooks) {
        await additionalHooks.mutationRequest(result)
        .unwrap()
        .then((payload: any) => {
          //new country attribute && member attributes based on the response
          let finalObj = JSON.parse(JSON.stringify(data?.content))
          finalObj = addNewAttributes(finalObj, payload, additionalHooks.queryData)
          setItems((i) => i.concat(finalObj))
        })
        .catch(() => {
          setItems((i) => i.concat(data.content))
        })
      }
    } else {
      const result = [data.bpn]
      if(additionalHooks) {
        await additionalHooks.mutationRequest(result)
        .unwrap()
        .then((payload: any) => {
          //update for country attribute && update member info
          let finalObj = JSON.parse(JSON.stringify(data))
          finalObj.country = payload[0].legalAddress.country
          if (isQueryDataPresent(additionalHooks.queryData)) {
            finalObj.member = additionalHooks.queryData.includes(finalObj.bpn)
          }
          setItems([finalObj])
        })
        .catch(() => {
          setItems((i) => i.concat([data]))
        })
      }
    }
  }

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
