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
import {
  Table,
  Button,
  TableProps,
  PaginFetchArgs,
} from 'cx-portal-shared-components'
import _ from 'lodash'

export interface PageLoadingTableProps extends Omit<TableProps, 'rows'> {
  loadLabel: string
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  fetchHookRefresh?: number
  mutationHook?: any //this is for making a POST request incase
}

export const MyPageTable = function <T>({
  loadLabel,
  fetchHook,
  fetchHookArgs,
  fetchHookRefresh = 0,
  mutationHook,
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
  const [mutationRequest] = mutationHook() //should be a hook with POST request
  const nextPage = () => setPage(page + 1)
  const hasMore =
    data?.page < data?.totalPages - 1 ||
    (data?.meta && data.meta.page < data.meta.totalPages - 1)
  const maxRows = data?.totalElements ?? data?.meta?.totalElements ?? 0 // Check for top level attributes as BPDM does not has meta attirbute in the response

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
        if (mutationHook) {
          fetchAndApply(data)
        } else {
          data.content
            ? setItems((i) => i.concat(data.content))
            : setItems([data]) // Search for BPN does response with an object. No content or meta properties available
        }
      }
    }
  }, [isSuccess, isFetching, data, clear, loaded])

  //POST request call
  const fetchAndApply = async (data: any) => {
    const result =
      data && data.content
        ? data.content.map((x: any) => x.legalEntity.bpn)
        : [data.bpn]
    await mutationRequest(result)
      .unwrap()
      .then((payload: any) => {
        //TODO : Should not be in the component. As of now, this logic is for mutating an object to add country property
        let finalObj =
          data && data.content
            ? JSON.parse(JSON.stringify(data?.content))
            : JSON.parse(JSON.stringify(data))
        data && data.content
          ? finalObj.map((x: any) => {
              payload.map((y: any) => {
                if (x.legalEntity.bpn === y.legalEntity) {
                  x.legalEntity.country = y.legalAddress.country
                }
              })
            })
          : (finalObj.country = payload[0].legalAddress.country)
        setItems((i) => i.concat(finalObj))
      })
      .catch((error: any) => {
        setItems((i) => i.concat(data.content))
        console.log(error)
      })
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
