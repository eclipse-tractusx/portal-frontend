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
import { useState, useEffect, useCallback } from 'react'

import {
  LoadMoreButton,
  Table,
  Typography,
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { type GridPaginationModel } from '@mui/x-data-grid'

import {
  getMaxRows,
  hasMorePages,
  TableVariants,
  type PageLoadingTableProps,
} from './helpers'
import { useTranslation } from 'react-i18next'

import './styles.scss'
import { ProgressLoader } from './ProgressLoader'
const scrollOffset = 350 // Adjust this value for earlier load

export const PageLoadingTable = function <Row, Args>({
  loadLabel,
  fetchHook,
  fetchHookArgs,
  fetchHookRefresh = 0,
  allItems,
  callbackToPage,
  allItemsLoadedHint,
  tableVariant = TableVariants.AUTO_SCROLL,
  ...props
}: PageLoadingTableProps<Row, Args>) {
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [clear, setClear] = useState(true)
  const [loaded, setLoaded] = useState(0)
  const [items, setItems] = useState<Row[]>([])
  const { data, isFetching, isSuccess, error, refetch } = fetchHook({
    page,
    size: pageSize,
    args: {
      ...fetchHookArgs,
      v: loaded,
    },
  })
  const [loading, setLoading] = useState(true)

  const hasMore = data ? hasMorePages(data) : false
  const maxRows = data ? getMaxRows(data) : 0

  // auto-scroll logic
  function nextPage() {
    setPage(page + 1)
  }
  // server-side logic
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    if (newModel.page !== page) setPage(newModel.page)
    if (newModel.pageSize !== pageSize) setPageSize(newModel.pageSize)
  }

  const handleScroll = useCallback(() => {
    const scrollableElement = document.documentElement
    if (
      scrollableElement.scrollHeight - scrollableElement.scrollTop <=
      scrollableElement.clientHeight + scrollOffset
    ) {
      if (hasMore && !isFetching) {
        nextPage()
      }
    }
  }, [hasMore, isFetching])

  useEffect(() => {
    if (!allItems) return
    setLoading(false)
    setItems(allItems.length > 0 ? allItems : [])
  }, [allItems])

  useEffect(() => {
    if (loaded !== fetchHookRefresh) {
      setLoaded(fetchHookRefresh)
      setPage(0)
      setClear(true)
    }
  }, [fetchHookRefresh, loaded])

  useEffect(() => {
    if (isFetching && !loading) setLoading(true)

    if (isSuccess && !isFetching && data?.content) {
      if (clear) {
        setItems([])
        setClear(false)
      } else if (callbackToPage) {
        callbackToPage(data)
      } else {
        setTableVariant(data)
      }
      setLoading(false)
    }
    if (error) {
      setLoading(false)
    }
  }, [isSuccess, isFetching, data, clear, loaded])

  useEffect(() => {
    if (tableVariant === TableVariants.AUTO_SCROLL) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTableVariant = (fetchedData: any) => {
    tableVariant === TableVariants.SERVER_SIDE
      ? setItems(fetchedData.content)
      : setItems((i) => i.concat(data.content))
  }

  const paginationProps =
    tableVariant === TableVariants.SERVER_SIDE
      ? {
          rowCount: maxRows,
          onPaginationModelChange: handlePaginationModelChange,
          pageSizeOptions: [5, 10, 15],
          rowsCountMax: maxRows,
          paginationModel: {
            pageSize,
            page,
          },
          initialState: {
            pagination: {
              paginationModel: {
                pageSize,
                page,
              },
            },
          },
        }
      : {
          hideFooter: true,
          rowsCountMax: maxRows,
        }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function checkEmptyIdentityProvider(payloads: any[]): any[] {
    return payloads.map((payload) => {
      if (
        Array.isArray(payload.identityProvider) &&
        payload.identityProvider.length === 0
      ) {
        return {
          ...payload,
          identityProvider: null,
        }
      }
      return payload
    })
  }

  return (
    <>
      <Box className="cx-table__page-loading--wrapper">
        <Table
          reload={refetch}
          error={error}
          className="cx-table__page-loading"
          rows={checkEmptyIdentityProvider(items)}
          loading={loading && !items.length}
          paginationMode={'server'}
          {...paginationProps} // Conditionally applied props
          {...props}
        />
        {items.length > 0 && loading && (
          <ProgressLoader variant={tableVariant} />
        )}
        {hasMore &&
          items.length > 0 &&
          tableVariant === TableVariants.LOAD_BUTTON && (
            <Box className="cx-table__page-loading--button">
              <LoadMoreButton
                label={loadLabel ?? t('global.table.loadMore')}
                onClick={nextPage}
              />
            </Box>
          )}
        {!hasMore &&
          !loading &&
          items.length > 0 &&
          tableVariant !== TableVariants.SERVER_SIDE && (
            <Typography
              variant="caption3"
              className="cx-table__page-loading--end"
            >
              {allItemsLoadedHint ?? t('global.table.allItemsLoadedHint')}
            </Typography>
          )}
      </Box>
    </>
  )
}
