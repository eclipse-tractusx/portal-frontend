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

import { useReducer } from 'react'
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

type TabButtonsType = {
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

enum ActionKind {
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
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  payload: any
}

const initialState: State = {
  searchExpr: '',
  showModal: false,
  selected: FilterType.ALL,
  sortOption: SortType.NEW,
  sortingType: SortType.DATEDESC,
}

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
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

export default function CompanyCertificates() {
  const { t } = useTranslation()

  const { data } = useFetchCertificatesQuery()

  const [{ showModal, selected, sortOption }, setState] = useReducer(
    reducer,
    initialState
  )

  const setBtnView = (e: React.MouseEvent<HTMLInputElement>) => {
    setState({
      type: ActionKind.SET_SORTING_TYPE,
      payload: e.currentTarget.value,
    })
    setState({ type: ActionKind.SET_SELECTED, payload: e.currentTarget.value })
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

  const handleSortOption = (value: string) => {
    setState({
      type: ActionKind.SET_SORT_SHOW_MODAL,
      payload: {
        sortOption: value,
        showModal: false,
      },
    })
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
                setState({
                  type: ActionKind.SET_SHOW_MODAL,
                  payload: false,
                })
              }}
              className="filterSection"
            >
              <ViewSelector views={tabButtons} activeView={selected} />
              <div
                style={{
                  position: 'relative',
                }}
              >
                <SortImage
                  onClick={() => {
                    setState({
                      type: ActionKind.SET_SHOW_MODAL,
                      payload: true,
                    })
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
          {data && <CompanyCertificateElements data={data.content} />}
        </div>
      </div>
    </main>
  )
}
