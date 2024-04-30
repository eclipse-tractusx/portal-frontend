/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import './AdminCredential.scss'
import {
  type CredentialData,
  type CredentialResponse,
  useApproveCredentialMutation,
  useDeclineCredentialMutation,
  useFetchCredentialsSearchQuery,
} from 'features/certification/certificationApiSlice'
import { download } from 'utils/downloadUtils'
import { useFetchNewDocumentByIdMutation } from 'features/appManagement/apiSlice'
import { error, success } from 'services/NotifyService'
import { uniqueId } from 'lodash'
import { SubscriptionStatus } from 'features/apps/types'
import { setSearchInput } from 'features/appManagement/actions'
import { useDispatch } from 'react-redux'
import {
  CircleProgress,
  PageLoadingTable,
} from '@nidhi.garg/portal-shared-components'

interface FetchHookArgsType {
  filterType: string
  sortingType?: string
  expr: string
}

enum FilterType {
  ALL = '',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  INACTIVE = 'INACTIVE',
}

enum StatusType {
  APPROVE = 'approve',
  DECLINE = 'decline',
}

enum SortType {
  BPNLASC = 'BpnlAsc',
  BPNLDESC = 'BpnlDesc',
}

export default function AdminCredentialElements() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState<number>(0)
  const [group, setGroup] = useState<string>(FilterType.ALL)
  const [sortOption, setSortOption] = useState<string>(SortType.BPNLASC)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [filterValueAPI, setFilterValueAPI] = useState<string>('')
  const [fetchHookArgs, setFetchHookArgs] = useState<FetchHookArgsType>()
  const [approveLoading, setApproveLoading] = useState<string>()
  const [declineLoading, setDeclineLoading] = useState<string>()

  const [getDocumentById] = useFetchNewDocumentByIdMutation()
  const [approveCredential] = useApproveCredentialMutation()
  const [declineCredential] = useDeclineCredentialMutation()

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setFilterValueAPI(viewValue)
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  useEffect(() => {
    console.log('sortOption', sortOption)
    setFetchHookArgs({
      filterType: filterValueAPI,
      sortingType: sortOption,
      expr: searchExpr,
    })
  }, [filterValueAPI, sortOption, searchExpr])

  const onValidate = (expr: string) => {
    const validateExpr = /^[ A-Za-z0-9]{1,1000}$/.test(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById(documentId).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const handleApproveDecline = async (
    credentialId: string,
    status: StatusType
  ) => {
    status === StatusType.APPROVE
      ? setApproveLoading(credentialId)
      : setDeclineLoading(credentialId)
    const APIRequest =
      status === StatusType.APPROVE ? approveCredential : declineCredential
    await APIRequest(credentialId)
      .unwrap()
      .then(() => {
        status === StatusType.APPROVE
          ? success(t('content.adminCertificate.approvedMessage'))
          : error(t('content.adminCertificate.declinedMessage'))
        setRefresh(Date.now())
      })
      .catch(() => {
        error(t('content.adminCertificate.errorMessage'))
      })
    setApproveLoading('')
    setDeclineLoading('')
  }

  const filterButtons = [
    {
      buttonText: t('content.adminCertificate.tabs.all'),
      buttonValue: FilterType.ALL,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.pending'),
      buttonValue: FilterType.PENDING,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.active'),
      buttonValue: FilterType.ACTIVE,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.revoked'),
      buttonValue: FilterType.REVOKED,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.inactive'),
      buttonValue: FilterType.INACTIVE,
      onButtonClick: setView,
    },
  ]

  const sortOptions = [
    {
      label: t('content.adminCertificate.sort.bpnlasc'),
      value: SortType.BPNLASC,
    },
    {
      label: t('content.adminCertificate.sort.bpnldesc'),
      value: SortType.BPNLDESC,
    },
  ]

  const columns = [
    {
      field: 'credentialType',
      headerName: t('content.adminCertificate.table.crendentialType'),
      flex: 2.5,
    },
    {
      field: 'companyName',
      headerName: t('content.adminCertificate.table.companyInfo'),
      flex: 2,
    },
    {
      field: 'useCase',
      headerName: t('content.adminCertificate.table.certificate'),
      flex: 1.5,
      renderCell: ({ row }: { row: CredentialData }) => (
        <>{row.useCase ?? 'N/A'}</>
      ),
    },
    {
      field: 'document',
      headerName: t('content.adminCertificate.table.document'),
      flex: 1.5,
      renderCell: ({ row }: { row: CredentialData }) =>
        row.documents.map((document) => {
          return (
            <div className="documenticon-main">
              <ArticleOutlinedIcon
                className={`${
                  document.documentId ? 'document-icon' : 'document-disabled'
                }`}
                onClick={() =>
                  document.documentId &&
                  handleDownloadClick(
                    document.documentId,
                    document.documentName
                  )
                }
              />
            </div>
          )
        }),
    },
    {
      field: 'credentialDetailId',
      headerName: '',
      flex: 2.5,
      renderCell: ({ row }: { row: CredentialData }) => (
        <>
          {row.participantStatus === SubscriptionStatus.PENDING && (
            <>
              <Button
                size="small"
                color="error"
                variant="contained"
                className="statusBtn"
                endIcon={
                  declineLoading === row.credentialDetailId && (
                    <CircleProgress
                      thickness={5}
                      size={20}
                      variant="indeterminate"
                      colorVariant="secondary"
                    />
                  )
                }
                onClick={() =>
                  handleApproveDecline(
                    row.credentialDetailId,
                    StatusType.DECLINE
                  )
                }
              >
                {t('global.actions.decline')}
              </Button>
              <Button
                size="small"
                color="success"
                variant="contained"
                className="statusBtn ml-10"
                endIcon={
                  approveLoading === row.credentialDetailId && (
                    <CircleProgress
                      thickness={5}
                      size={20}
                      variant="indeterminate"
                      colorVariant="secondary"
                    />
                  )
                }
                onClick={() =>
                  handleApproveDecline(
                    row.credentialDetailId,
                    StatusType.APPROVE
                  )
                }
              >
                {t('global.actions.confirm')}
              </Button>
            </>
          )}
        </>
      ),
    },
  ]

  return (
    <div className="recommended-main">
      <PageLoadingTable<CredentialResponse[], FetchHookArgsType>
        autoFocus={false}
        searchExpr={searchExpr}
        alignCell="start"
        toolbarVariant={'searchAndFilter'}
        hasBorder={false}
        columnHeadersBackgroundColor={'transparent'}
        searchPlaceholder={t('content.adminCertificate.search')}
        //searchInputData={searchInputData}
        onSearch={(expr: string) => {
          if (!onValidate(expr)) return
          setRefresh(Date.now())
          setSearchExpr(expr)
        }}
        searchDebounce={1000}
        title=""
        loadLabel={t('global.actions.more')}
        fetchHook={useFetchCredentialsSearchQuery}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => uniqueId(row.companyId)}
        columns={columns}
        defaultFilter={group}
        filterViews={filterButtons}
        defaultSortOption={sortOption}
        sortOptions={sortOptions}
        onSortClick={(value) => {
          setSortOption(value)
        }}
      />
    </div>
  )
}
