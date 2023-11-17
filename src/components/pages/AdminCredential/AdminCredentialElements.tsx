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
import { SubscriptionStatus } from 'features/apps/apiSlice'
import { setSearchInput } from 'features/appManagement/actions'
import { useDispatch } from 'react-redux'
import {
  CircleProgress,
  PageLoadingTable,
} from '@catena-x/portal-shared-components'

interface FetchHookArgsType {
  filterType: string
  expr: string
}

enum FilterType {
  ALL = 'all',
  OPEN = 'open',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
}

enum StatusType {
  APPROVE = 'approve',
  DECLINE = 'decline',
}

export default function AdminCredentialElements() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState<number>(0)
  const [group, setGroup] = useState<string>(FilterType.ALL)
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
    if (viewValue === FilterType.OPEN)
      setFilterValueAPI(SubscriptionStatus.PENDING)
    else if (viewValue === FilterType.CONFIRMED)
      setFilterValueAPI(SubscriptionStatus.ACTIVE)
    else if (viewValue === FilterType.DECLINED)
      setFilterValueAPI(SubscriptionStatus.INACTIVE)
    else setFilterValueAPI('')
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  useEffect(() => {
    setFetchHookArgs({
      filterType: filterValueAPI,
      expr: searchExpr,
    })
  }, [filterValueAPI, searchExpr])

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
      buttonText: t('content.adminCertificate.tabs.open'),
      buttonValue: FilterType.OPEN,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.confirmed'),
      buttonValue: FilterType.CONFIRMED,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.declined'),
      buttonValue: FilterType.DECLINED,
      onButtonClick: setView,
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
      renderCell: ({ row }: { row: CredentialData }) => (
        <ArticleOutlinedIcon
          className="document-icon"
          onClick={() =>
            handleDownloadClick(
              row.document.documentId,
              row.document.documentName
            )
          }
        />
      ),
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
      />
    </div>
  )
}
