/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { useReducer, useCallback } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import {
  Typography,
  SearchInput,
  ViewSelector,
  SortOption,
  Button,
} from '@catena-x/portal-shared-components'
import SortImage from 'components/shared/frame/SortImage'
import './CertificateCredentials.scss'
import { OVERLAYS } from 'types/Constants'
import {
  CertificateResponse,
  useFetchCertificatesQuery,
} from 'features/certification/certificationApiSlice'
import { CertificateCard } from 'components/shared/basic/CertificateCard'

enum FilterType {
  UPLOADED = 'Uploaded',
  PENDING = 'Pending',
  ACTIVE = 'Active',
  DECLINED = 'Declined',
  EXPIRED = 'Expired',
}

enum SortType {
  NEW = 'new',
  DATEDESC = 'DateDesc',
  TITLE = 'title',
  NAMEASC = 'NameAsc',
}

enum ActionKind {
  SET_SEARCH_EXPR = 'SET_SEARCH_EXPR',
  SET_SHOW_MODAL = 'SET_SHOW_MODAL',
  SET_SELECTED = 'SET_SELECTED',
  SET_SORT_OPTION = 'SET_SORT_OPTION',
  SET_SORTING_TYPE = 'SET_SORTING_TYPE',
  SET_SORT_SHOW_MODAL = 'SET_SORT_SHOW_MODAL',
}

type State = {
  searchExpr: string
  showModal: boolean
  selected: string
  sortOption: string
  sortingType: string
}

type Action = {
  type: string
  payload: any
}

const initialState: State = {
  searchExpr: '',
  showModal: false,
  selected: FilterType.UPLOADED,
  sortOption: SortType.NEW,
  sortingType: SortType.DATEDESC,
}

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case ActionKind.SET_SEARCH_EXPR:
      return { ...state, searchExpr: payload }
    case ActionKind.SET_SHOW_MODAL:
      return { ...state, showModal: payload }
    case ActionKind.SET_SELECTED:
      return { ...state, selected: payload }
    case ActionKind.SET_SORT_OPTION:
      return { ...state, sortOption: payload }
    case ActionKind.SET_SORT_SHOW_MODAL:
      return {
        ...state,
        sortOption: payload.sortOption,
        showModal: payload.showModal,
      }
    default:
      return state
  }
}

export default function CertificateCredentials() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { data } = useFetchCertificatesQuery()

  const [{ searchExpr, showModal, selected, sortOption }, setState] =
    useReducer(reducer, initialState)

  const setBtnView = (e: React.MouseEvent<HTMLInputElement>) => {
    setState({
      type: ActionKind.SET_SORTING_TYPE,
      payload: e.currentTarget.value,
    })
    setState({ type: ActionKind.SET_SELECTED, payload: e.currentTarget.value })
  }

  const sortOptions = [
    {
      label: t('content.certificates.sort.name'),
      value: SortType.NEW,
    },
    {
      label: t('content.certificates.sort.date'),
      value: SortType.TITLE,
    },
  ]

  const tabButtons: any[] = [
    {
      buttonText: t('content.certificates.tabs.uploadedCertificates'),
      buttonValue: FilterType.UPLOADED,
      onButtonClick: setBtnView,
    },
    {
      buttonText: t('content.certificates.tabs.pending'),
      buttonValue: FilterType.PENDING,
      onButtonClick: setBtnView,
    },
    {
      buttonText: t('content.certificates.tabs.active'),
      buttonValue: FilterType.ACTIVE,
      onButtonClick: setBtnView,
    },
    {
      buttonText: t('content.certificates.tabs.declined'),
      buttonValue: FilterType.DECLINED,
      onButtonClick: setBtnView,
    },
    {
      buttonText: t('content.certificates.tabs.expired'),
      buttonValue: FilterType.EXPIRED,
      onButtonClick: setBtnView,
    },
  ]

  const handleSortOption = (value: string) => {
    setState({
      type: ActionKind.SET_SORT_SHOW_MODAL,
      payload: {
        sortOption: value,
        showModal: false,
      },
    })
  }

  const handleSearch = useCallback((expr: string) => {
    setState({ type: ActionKind.SET_SEARCH_EXPR, payload: expr })
  }, [])

  return (
    <main className="certificate-main">
      <div className="certificate-section">
        <div className="container">
          <Typography variant="h2" className="heading">
            {t('content.certificates.heading')}
          </Typography>
          <Trans>
            <Typography variant="body1" className="description">
              {t('content.certificates.description')}
            </Typography>
          </Trans>
          <div className="mainContainer">
            <div className="searchContainer">
              <SearchInput
                value={searchExpr}
                placeholder={t('content.certificates.search')}
                onChange={(e) => handleSearch(e.target.value)}
                autoComplete="off"
                autoFocus={false}
              />
            </div>
            <div
              onMouseLeave={() =>
                setState({
                  type: ActionKind.SET_SHOW_MODAL,
                  payload: false,
                })
              }
              className="filterSection"
            >
              <ViewSelector views={tabButtons} activeView={selected} />
              <SortImage
                onClick={() =>
                  setState({
                    type: ActionKind.SET_SHOW_MODAL,
                    payload: true,
                  })
                }
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
            <div className="uploadBtn">
              <Button
                size="small"
                onClick={() =>
                  dispatch(show(OVERLAYS.UPDATE_CERTIFICATE, 'userId'))
                }
              >
                {t('content.certificates.uploadCertificate')}
              </Button>
            </div>
            <Grid container spacing={2} className="certificate-section">
              {data?.map((item: CertificateResponse) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  className="certificate-card"
                  key={item.credentialType}
                >
                  <CertificateCard
                    credentialType={item.credentialType}
                    ssiDetailData={item.ssiDetailData}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          <div style={{ height: '66px' }}></div>
        </div>
      </div>
    </main>
  )
}
