/********************************************************************************
 * Copyright (c) 2024 BMW Group AG
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { SortOption } from '@arena2036/portal-shared-components-construct-x'
import {
  notificationFetchSelector,
  setOrder,
  setSearch,
} from 'features/notification/slice'
import DebouncedSearchInput from 'components/shared/basic/Input/DebouncedSearchInput'
import SortImage from 'components/shared/frame/SortImage'
import { NotificationSortingType } from 'features/notification/types'

export default function NotificationSearch() {
  const order = useSelector(notificationFetchSelector).args.sorting
  const dispatch = useDispatch()
  const { t } = useTranslation('notification')

  const [showOrder, setShowOrder] = useState<boolean>(false)

  const sortOptions = [
    {
      label: t('sortOptions.new'),
      value: NotificationSortingType.DateDesc,
    },
    {
      label: t('sortOptions.oldest'),
      value: NotificationSortingType.DateAsc,
    },
    {
      label: t('sortOptions.unread'),
      value: NotificationSortingType.ReadStatusAsc,
    },
  ]

  return (
    <div className="searchContainer">
      <DebouncedSearchInput
        debounceTime={500}
        onSearch={(expr: string) => dispatch(setSearch(expr))}
      />
      <Box
        onMouseLeave={() => {
          setShowOrder(false)
        }}
        className="sortingMain"
      >
        <SortImage
          onClick={(e) => {
            e.stopPropagation()
            setShowOrder(!showOrder)
          }}
          selected={showOrder}
        />
        <div className="sortSection">
          <SortOption
            show={showOrder}
            selectedOption={order}
            setSortOption={(value: string) => {
              dispatch(setOrder(value as NotificationSortingType))
              setShowOrder(false)
            }}
            sortOptions={sortOptions}
          />
        </div>
      </Box>
    </div>
  )
}
