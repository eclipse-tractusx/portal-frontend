/********************************************************************************
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

import { useTranslation, Trans } from 'react-i18next'
import {
  Typography,
  ViewSelector,
  SortOption,
  Button,
} from '@arena2036/portal-shared-components-construct-x'
import SortImage from 'components/shared/frame/SortImage'
import './style.scss'
import { ROLES } from 'types/Constants'
import CompanyCertificateElements from './CompanyCertificateElements'
import {
  type ComapnyCertificateData,
  useFetchCertificatesQuery,
} from 'features/companyCertification/companyCertificateApiSlice'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import UploadCompanyCertificate from './UploadCompanyCerificate'
import LoadingProgress from 'components/shared/basic/LoadingProgress'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { userHasPortalRole } from 'services/AccessService'

interface TabButtonsType {
  buttonText: string
  buttonValue: FilterType
  onButtonClick: (e: React.MouseEvent<HTMLInputElement>) => void
}

export enum FilterType {
  ALL = 'All',
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export enum SortType {
  CertificateTypeAsc = 'CertificateTypeAsc',
  CertificateTypeDesc = 'CertificateTypeDesc',
  ExpiryDateAsc = 'ExpiryDateAsc',
  ExpiryDateDesc = 'ExpiryDateDesc',
}

export default function CompanyCertificates(): JSX.Element {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<string>(
    SortType.CertificateTypeAsc
  )
  const [page, setPage] = useState<number>(0)
  const [filter, setFilter] = useState<string>(FilterType.ALL)
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const { data, isFetching } = useFetchCertificatesQuery({
    filter: filter === FilterType.ALL ? '' : filter,
    sortOption,
    page,
  })
  const [elements, setElements] = useState<ComapnyCertificateData[]>([])
  const setBtnView = (e: React.MouseEvent<HTMLInputElement>): void => {
    setElements([])
    setPage(0)
    setFilter(e.currentTarget.value)
  }

  useEffect(() => {
    if (data)
      setElements(page > 0 ? (i) => i.concat(data?.content) : data.content)
  }, [data])

  const loadMore = (val: number) => {
    setPage(val)
  }

  useEffect(() => {
    setPage(0)
  }, [])

  const sortOptions = [
    {
      label: t('content.companyCertificate.sort.nameasc'),
      value: SortType.CertificateTypeAsc,
    },
    {
      label: t('content.companyCertificate.sort.namedsc'),
      value: SortType.CertificateTypeDesc,
    },
    {
      label: t('content.companyCertificate.sort.dateasc'),
      value: SortType.ExpiryDateAsc,
    },
    {
      label: t('content.companyCertificate.sort.datedsc'),
      value: SortType.ExpiryDateDesc,
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
    setElements([])
    setSortOption(value)
  }

  return (
    <main className="company-certificate-main">
      <Box className="company-certificate-section">
        <Box className="container">
          <Typography variant="h2" className="heading">
            {t('content.companyCertificate.heading')}
          </Typography>
          <Trans>
            <Typography variant="body1" className="description">
              {t('content.companyCertificate.description')}
            </Typography>
          </Trans>
          <Box className="mainContainer">
            <Box
              onMouseLeave={() => {
                setShowModal(false)
              }}
              className="filterSection"
            >
              <ViewSelector views={tabButtons} activeView={filter} />
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <SortImage
                  onClick={() => {
                    setShowModal(true)
                  }}
                  selected={showModal}
                />
                <Box className="sortSection">
                  <SortOption
                    show={showModal}
                    sortOptions={sortOptions}
                    selectedOption={sortOption}
                    setSortOption={handleSortOption}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="uploadBtn">
              <Box>
                <Button
                  startIcon={<FileUploadOutlinedIcon />}
                  size="small"
                  onClick={() => {
                    setUploadModal(true)
                  }}
                  disabled={
                    !userHasPortalRole(ROLES.UPLOAD_COMPANY_CERTIFICATE)
                  }
                >
                  {t('content.companyCertificate.uploadCertificate')}
                </Button>
              </Box>
            </Box>
          </Box>
          {isFetching && (
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingProgress />
            </Box>
          )}
          {!isFetching && elements.length === 0 && (
            <Typography variant="body1" className="noData">
              {t('content.companyCertificate.noData')}
            </Typography>
          )}
          {elements.length > 0 && (
            <CompanyCertificateElements data={elements} />
          )}
          {uploadModal && (
            <UploadCompanyCertificate
              handleClose={() => {
                setUploadModal(false)
              }}
            />
          )}
          {data && data.meta.totalPages > page + 1 && (
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  loadMore(page + 1)
                }}
              >
                {t('global.actions.more')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </main>
  )
}
