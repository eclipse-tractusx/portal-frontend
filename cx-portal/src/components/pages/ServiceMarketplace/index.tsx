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

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ServicesElements from './ServicesElements'
import RecommendedServices from './RecommendedServices'
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
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('All Active Apps')
  const [sortOption, setSortOption] = useState<string>('new')
  const [recommendedServices, setRecommendedServices] = useState<any>([])
  const [allServices, setAllServices] = useState<any>([])

  const { data } = useFetchServicesQuery(0)
  const services = data && data.content

  useEffect(() => {
    if (services && services.length > 0) {
      console.log('services', services)
      var indexToSplit = 2
      setRecommendedServices(services.slice(0, indexToSplit))
      setAllServices(services.slice(indexToSplit + 1))
    }
  }, [services])

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
        {recommendedServices && recommendedServices.length && (
          <RecommendedServices services={recommendedServices} />
        )}
      </section>
      {allServices && allServices.length && (
        <ServicesElements services={allServices} />
      )}
    </main>
  )
}
