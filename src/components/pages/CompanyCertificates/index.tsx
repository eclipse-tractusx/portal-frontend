/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useTranslation, Trans } from 'react-i18next'
import {
  Typography,
  ViewSelector,
  SortOption,
  Button,
} from '@catena-x/portal-shared-components'
import SortImage from 'components/shared/frame/SortImage'
import './CompanyCertificate.scss'
import { ROLES } from 'types/Constants'
import CompanyCertificateElements from './CompanyCertificateElements'
import UserService from 'services/UserService'
import { useFetchCertificatesQuery } from 'features/companyCertification/companyCertificateApiSlice'
import { useState } from 'react'

interface TabButtonsType {
  buttonText: string
  buttonValue: FilterType
  onButtonClick: (e: React.MouseEvent<HTMLInputElement>) => void
}

enum FilterType {
  ALL = 'All',
  INACTIVE = 'Inactive',
  ACTIVE = 'Active',
}

enum SortType {
  NEW = 'new',
  DATEDESC = 'DateDesc',
  TITLE = 'title',
  NAMEASC = 'NameAsc',
}

export default function CompanyCertificates(): JSX.Element {
  const { t } = useTranslation()

  const { data } = useFetchCertificatesQuery()

  const [showModal, setShowModal] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<string>(SortType.NEW)
  const [filter, setFilter] = useState<string>(FilterType.ALL)

  const setBtnView = (e: React.MouseEvent<HTMLInputElement>): void => {
    setFilter(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('content.companyCertificate.sort.name'),
      value: SortType.NEW,
    },
    {
      label: t('content.companyCertificate.sort.date'),
      value: SortType.TITLE,
    },
  ]

  const tabButtons: TabButtonsType[] = [
    {
      buttonText: t('content.companyCertificate.tabs.all'),
      buttonValue: FilterType.ALL,
      onButtonClick: setBtnView,
    },
    {
      buttonText: t('content.companyCertificate.tabs.active'),
      buttonValue: FilterType.ACTIVE,
      onButtonClick: setBtnView,
    },
    {
      buttonText: t('content.companyCertificate.tabs.inactive'),
      buttonValue: FilterType.INACTIVE,
      onButtonClick: setBtnView,
    },
  ]

  const handleSortOption = (value: string): void => {
    setSortOption(value)
  }

  return (
    <main className="company-certificate-main">
      <div className="company-certificate-section">
        <div className="container">
          <Typography variant="h2" className="heading">
            {t('content.companyCertificate.heading')}
          </Typography>
          <Trans>
            <Typography variant="body1" className="description">
              {t('content.companyCertificate.description')}
            </Typography>
          </Trans>
          <div className="mainContainer">
            <div
              onMouseLeave={() => {
                setShowModal(false)
              }}
              className="filterSection"
            >
              <ViewSelector views={tabButtons} activeView={filter} />
              <div
                style={{
                  position: 'relative',
                }}
              >
                <SortImage
                  onClick={() => {
                    setShowModal(true)
                  }}
                  selected={showModal}
                />
                <div className="sortSection">
                  <SortOption
                    show={showModal}
                    sortOptions={sortOptions}
                    selectedOption={sortOption}
                    setSortOption={handleSortOption}
                  />
                </div>
              </div>
            </div>
            <div className="uploadBtn">
              <div>
                <Button
                  size="small"
                  onClick={() => {
                    // no action
                  }}
                  disabled={
                    !UserService.hasRole(ROLES.UPLOAD_COMPANY_CERTIFICATE)
                  }
                >
                  {t('content.companyCertificate.uploadCertificate')}
                </Button>
              </div>
            </div>
          </div>
          {data != null && <CompanyCertificateElements data={data.content} />}
        </div>
      </div>
    </main>
  )
}
