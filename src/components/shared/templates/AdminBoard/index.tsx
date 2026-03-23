/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { useEffect, useReducer, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material'
import debounce from 'lodash.debounce'
import {
  SearchInput,
  ViewSelector,
  SortOption,
  PageHeader2,
  LoadMoreButton,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import './style.scss'
import AdminBoardElements from './AdminBoardElements'
import { currentSuccessType } from 'features/adminBoard/slice'
import type {
  ServiceContent,
  ServiceRequestBody,
} from 'features/adminBoard/serviceAdminBoardApiSlice'
import type { AppRequestBody } from 'features/adminBoard/adminBoardApiSlice'
import { useNavigate } from 'react-router-dom'
import SortImage from 'components/shared/frame/SortImage'
import { PAGES } from 'types/Constants'

export interface TabButtonsType {
  buttonText: string
  buttonValue: string
  onButtonClick: (e: React.MouseEvent<HTMLInputElement>) => void
}

enum FilterType {
  INREVIEW = 'InReview',
  ALL = 'All',
}

enum ViewActionEnum {
  STATUSID = 'STATUSID',
  SORTOPTION = 'SORTOPTION',
  SEARCH = 'SEARCH',
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
  SET_APP_CARDS = 'SET_APP_CARDS',
  SET_PAGE = 'SET_PAGE',
  SET_STATUS_ID = 'SET_STATUS_ID',
  SET_SORTING_TYPE = 'SET_SORTING_TYPE',
  SET_FETCH_ARGS = 'SET_FETCH_ARGS',
  SET_PAGE_FETCH_ARGS = 'SET_PAGE_FETCH_ARGS',
  SET_PAGE_STATUS_FETCH_ARGS = 'SET_PAGE_STATUS_FETCH_ARGS',
  SET_SUBSCRIPTION = 'SET_SUBSCRIPTION',
  SET_PAGE_SORT_ARGS = 'SET_PAGE_SORT_ARGS',
  SET_REQUEST_BODY = 'SET_REQUEST_BODY',
  SET_SORT_SHOW_MODAL = 'SET_SORT_SHOW_MODAL',
  SET_APPS_AND_APP_CARDS = 'SET_APPS_AND_APP_CARDS',
}

type State = {
  searchExpr: string
  showModal: boolean
  selected: string
  sortOption: string
  appCards: ServiceContent[]
  page: number
  statusId: string
  sortingType: string
  fetchArgs: ServiceRequestBody | AppRequestBody
  apps: ServiceContent[]
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
  selected: FilterType.INREVIEW,
  sortOption: SortType.NEW,
  appCards: [],
  page: 0,
  statusId: FilterType.INREVIEW,
  sortingType: SortType.DATEDESC,
  fetchArgs: {
    page: 0,
    statusId: FilterType.INREVIEW,
    sortingType: SortType.DATEDESC,
    expr: '',
  },
  apps: [],
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
    case ActionKind.SET_APP_CARDS:
      return { ...state, appCards: payload }
    case ActionKind.SET_PAGE:
      return { ...state, page: payload }
    case ActionKind.SET_SORTING_TYPE:
      return { ...state, sortingType: payload }
    case ActionKind.SET_FETCH_ARGS:
      return { ...state, fetchArgs: payload }
    case ActionKind.SET_REQUEST_BODY:
      return {
        ...state,
        page: payload.page,
        statusId: payload.statusId,
        fetchArgs: payload.fetchArgs,
        sortingType: payload.sortingType,
        expr: payload.expr,
      }
    case ActionKind.SET_PAGE_SORT_ARGS:
      return {
        ...state,
        page: payload.page,
        sortingType: payload.sortingType,
        fetchArgs: payload.fetchArgs,
      }
    case ActionKind.SET_PAGE_FETCH_ARGS:
      return {
        ...state,
        page: payload.page,
        fetchArgs: payload.fetchArgs,
      }
    case ActionKind.SET_STATUS_ID:
      return {
        ...state,
        statusId: payload,
      }
    case ActionKind.SET_SORT_SHOW_MODAL:
      return {
        ...state,
        sortOption: payload.sortOption,
        showModal: payload.showModal,
      }
    case ActionKind.SET_APPS_AND_APP_CARDS:
      return {
        ...state,
        apps: setCards(state, payload),
        appCards: setCards(state, payload),
      }
    default:
      return state
  }
}

const setCards = (
  state: {
    appCards: ServiceContent[]
  },
  payload: {
    meta: {
      page: number
    }
    content: ServiceContent[]
  }
) => {
  if (payload?.meta) {
    return payload.meta.page === 0
      ? payload.content
      : state.appCards.concat(payload.content)
  } else {
    return []
  }
}

type CommonAdminBoardType = {
  headerTitle: string
  searchText: string
  filterOptionText: {
    all: string
    open: string
  }
  sortOptionText: {
    newFirst: string
    AppTitle: string
  }
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  fetchQuery: (Obj: ServiceRequestBody | AppRequestBody) => any
  loadMoreButtonText?: string
  isDynamicSearchEnabled?: boolean
  type?: string
  successApproveMsg?: string
  errorApproveMsg?: string
  successDeclineMsg?: string
  errorDeclineMsg?: string
}

export default function CommonAdminBoard({
  headerTitle,
  searchText,
  filterOptionText,
  sortOptionText,
  fetchQuery,
  loadMoreButtonText = 'Load More',
  isDynamicSearchEnabled = false,
  type = PAGES.APP_ADMIN_BOARD_DETAIL,
  successApproveMsg,
  errorApproveMsg,
  successDeclineMsg,
  errorDeclineMsg,
}: CommonAdminBoardType) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [
    {
      searchExpr,
      showModal,
      selected,
      sortOption,
      appCards,
      page,
      statusId,
      sortingType,
      fetchArgs,
      apps,
    },
    setState,
  ] = useReducer(reducer, initialState)

  const isDecisionSuccess = useSelector(currentSuccessType)

  const { data, refetch, isFetching, isSuccess } = fetchQuery(fetchArgs)

  useEffect(() => {
    if (data?.content)
      setState({ type: ActionKind.SET_APPS_AND_APP_CARDS, payload: data })
  }, [data])

  useEffect(() => {
    refetch()
  }, [isDecisionSuccess, refetch])

  const setBtnView = (e: React.MouseEvent<HTMLInputElement>) => {
    setState({
      type: ActionKind.SET_SORTING_TYPE,
      payload: e.currentTarget.value,
    })
    setState({ type: ActionKind.SET_SELECTED, payload: e.currentTarget.value })
    resetAppCards(e.currentTarget.value, ViewActionEnum.STATUSID)
  }

  const handleSortOption = (value: string) => {
    setState({
      type: ActionKind.SET_SORT_SHOW_MODAL,
      payload: {
        sortOption: value,
        showModal: false,
      },
    })
    resetAppCards(
      value === SortType.TITLE ? SortType.NAMEASC : SortType.DATEDESC,
      ViewActionEnum.SORTOPTION
    )
  }

  const resetAppCards = useCallback(
    (value: string, type: string) => {
      setState({
        type: ActionKind.SET_REQUEST_BODY,
        payload: {
          page: 0,
          statusId: type === ViewActionEnum.STATUSID ? value : statusId,
          sortingType: type === ViewActionEnum.SORTOPTION ? value : sortingType,
          fetchArgs: {
            page: 0,
            statusId: type === ViewActionEnum.STATUSID ? value : statusId,
            sortingType:
              type === ViewActionEnum.SORTOPTION ? value : sortingType,
            expr: type === ViewActionEnum.SEARCH ? value : searchExpr,
          },
        },
      })
    },
    [statusId, sortingType, searchExpr]
  )

  const sortOptions = [
    {
      label: sortOptionText.newFirst,
      value: SortType.NEW,
    },
    {
      label: sortOptionText.AppTitle,
      value: SortType.TITLE,
    },
  ]

  interface TabButtonsType {
    buttonText: string
    buttonValue: string
    onButtonClick: (e: React.MouseEvent<HTMLInputElement>) => void
  }

  const tabButtons: TabButtonsType[] = [
    {
      buttonText: filterOptionText.open,
      buttonValue: FilterType.INREVIEW,
      onButtonClick: setBtnView,
    },
    {
      buttonText: filterOptionText.all,
      buttonValue: FilterType.ALL,
      onButtonClick: setBtnView,
    },
  ]

  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        if (apps && isDynamicSearchEnabled) {
          resetAppCards(expr, ViewActionEnum.SEARCH)
        } else {
          setState({
            type: ActionKind.SET_APP_CARDS,
            payload: expr
              ? apps.filter((app: ServiceContent) => {
                  const name = app.title || app.name
                  return (
                    app.provider?.toLowerCase().includes(expr.toLowerCase()) ||
                    name?.toLowerCase().includes(expr.toLowerCase())
                  )
                })
              : apps,
          })
        }
      }, 300),
    [apps, isDynamicSearchEnabled, resetAppCards]
  )

  const handleSearch = useCallback(
    (expr: string) => {
      setState({ type: ActionKind.SET_SEARCH_EXPR, payload: expr })
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  const nextPage = () => {
    setState({
      type: ActionKind.SET_PAGE_FETCH_ARGS,
      payload: {
        page: page + 1,
        fetchArgs: {
          page: page + 1,
          statusId,
          sortingType,
        },
      },
    })
  }

  const onViewDetails = (id: string) => {
    navigate(`/${type}/${id}`)
  }

  return (
    <div className="adminBoard">
      <PageHeader2 title={headerTitle} topPage={true} headerHeight={200} />
      <div className="mainContainer">
        <div className="searchContainer">
          <SearchInput
            placeholder={searchText}
            value={searchExpr}
            autoFocus={false}
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
            autoComplete="off"
          />
        </div>
        <div
          className="filterSection"
          onMouseLeave={() => {
            setState({
              type: ActionKind.SET_SHOW_MODAL,
              payload: false,
            })
          }}
        >
          <ViewSelector activeView={selected} views={tabButtons} />
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
              selectedOption={sortOption}
              setSortOption={handleSortOption}
              sortOptions={sortOptions}
            />
          </div>
        </div>
      </div>
      <div className="admin-board-main">
        <div style={{ height: '60px' }}></div>
        <div className="mainContainer">
          {isFetching ? (
            <div className="loading-progress">
              <CircleProgress
                variant="indeterminate"
                colorVariant="primary"
                size={50}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </div>
          ) : (
            <AdminBoardElements
              apps={appCards}
              onClick={onViewDetails}
              type={type}
              successApproveMsg={successApproveMsg}
              errorApproveMsg={errorApproveMsg}
              successDeclineMsg={successDeclineMsg}
              errorDeclineMsg={errorDeclineMsg}
              isSuccess={isSuccess}
              refetch={refetch}
            />
          )}
          {!isFetching &&
            appCards?.length > 0 &&
            data?.meta &&
            data?.meta?.totalPages > page + 1 && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '30px',
                }}
              >
                <LoadMoreButton onClick={nextPage} label={loadMoreButtonText} />
              </div>
            )}
        </div>
        <div style={{ height: '66px' }}></div>
      </div>
    </div>
  )
}
