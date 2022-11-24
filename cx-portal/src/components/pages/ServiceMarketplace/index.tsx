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

import { useState } from 'react'
import { useGetNotificationsQuery } from 'features/notification/apiSlice'
import { CXNotificationContent } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import ServicesElements from './ServicesElements'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import './ServiceMarketplace.scss'
import {
  SearchInput,
  Typography,
  ViewSelector,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'
import { SortOption } from 'components/shared/basic/SortOption'
import { useFetchServicesQuery } from 'features/serviceMarketplace/serviceApiSlice'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

export default function ServiceMarketplace() {
  const { t } = useTranslation()
  const { data } = useGetNotificationsQuery(null)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('All Active Apps')
  const [sortOption, setSortOption] = useState<string>('new')

  const { data: allServices } = useFetchServicesQuery(0)
  const services = allServices && allServices.content

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('notification.sortOptions.new'),
      value: 'new',
    },
    {
      label: t('notification.sortOptions.priority'),
      value: 'priority',
    },
    {
      label: t('notification.sortOptions.unread'),
      value: 'unread',
    },
  ]

  const filterButtons = [
    {
      buttonText: t('content.serviceMarketplace.sortOptions.all'),
      buttonValue: t('content.serviceMarketplace.sortOptions.all'),
      onButtonClick: setView,
    },
    {
      buttonText: t('content.serviceMarketplace.sortOptions.appRequest'),
      buttonValue: t('content.serviceMarketplace.sortOptions.appRequest'),
      onButtonClick: setView,
    },
    {
      buttonText: t('content.serviceMarketplace.sortOptions.appRequest'),
      buttonValue: t('content.serviceMarketplace.sortOptions.appRequest'),
      onButtonClick: setView,
    },
  ]

  const groups = groupBy(
    data?.content?.map((item) => ({
      ...item,
      contentParsed: item.content && JSON.parse(item.content),
    })),
    (item: CXNotificationContent) => dayjs(item.created).format('YYYY-MM-DD')
  )

  return (
    <main className="serviceMarketplace">
      <Typography className="newServices" variant="h5">
        {t('content.serviceMarketplace.newServices')}
      </Typography>
      <Typography className="recommendations" variant="body1">
        {t('content.serviceMarketplace.recommendations')}
      </Typography>
      <hr className="recommendations-divider" />
      <section>
        <div className="searchContainer">
          <SearchInput
            placeholder={t('notification.search')}
            value={searchExpr}
            autoFocus={false}
            onChange={(e) => setSearchExpr(e.target.value)}
          />
        </div>
        <div className="filterSection">
          <ViewSelector activeView={selected} views={filterButtons} />

          <div
            className="iconSection"
            onClick={() => {
              setShowModal(!showModal)
            }}
          >
            <SortIcon sx={{ fontSize: 20, color: '#939393' }} />
          </div>
          {showModal && (
            <SortOption
              selectedOption={sortOption}
              setSortOption={(value: string) => {
                setSortOption(value)
                setShowModal(!showModal)
              }}
              sortOptions={sortOptions}
            />
          )}
        </div>
        <ServicesElements />
      </section>
      <div className="services-main">
        <Box className="services-section">
          <section className="services-section-content">
            <Typography
              sx={{ fontFamily: 'LibreFranklin-Light' }}
              variant="h3"
              className="section-title"
            >
              {t('content.serviceMarketplace.allServices')}
            </Typography>
          </section>
        </Box>
      </div>
    </main>
  )
}
