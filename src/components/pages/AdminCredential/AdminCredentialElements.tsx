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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { PageLoadingTable } from '@catena-x/portal-shared-components'
import './AdminCredential.scss'
import {
  CredentialData,
  CredentialResponse,
  useApproveCredentialMutation,
  useDeclineCredentialMutation,
  useFetchCredentialsQuery,
} from 'features/certification/certificationApiSlice'
import { download } from 'utils/downloadUtils'
import { useFetchNewDocumentByIdMutation } from 'features/appManagement/apiSlice'
import { error, success } from 'services/NotifyService'

export interface DummyData {
  date: string
  companyInfo: string
  certificate: string
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

  const [group, setGroup] = useState<string>(FilterType.ALL)
  const [expr, setExpr] = useState<string>('')
  const [refresh, setRefresh] = useState<number>(0)

  const [getDocumentById] = useFetchNewDocumentByIdMutation()
  const [approveCredential] = useApproveCredentialMutation()
  const [declineCredential] = useDeclineCredentialMutation()

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setGroup(viewValue)
  }

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById(documentId).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      return download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const handleApproveDecline = async (
    credentialId: string,
    status: StatusType
  ) => {
    const APIRequest =
      status === StatusType.APPROVE ? approveCredential : declineCredential
    await APIRequest(credentialId)
      .unwrap()
      .then(() => {
        status === StatusType.APPROVE
          ? success(t('content.adminCertificate.approvedMessage'))
          : error(t('content.adminCertificate.declinedMessage'))
      })
      .catch(() => {
        error(t('content.adminCertificate.errorMessage'))
      })
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
      field: 'companyId',
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
      flex: 2,
      renderCell: ({ row }: { row: CredentialData }) => (
        <>
          <ArticleOutlinedIcon className="document-icon" />
          <button
            className="document-button-link"
            onClick={() =>
              handleDownloadClick(
                row.document.documentId,
                row.document.documentName
              )
            }
          >
            {row.document.documentName}
          </button>
        </>
      ),
    },
    {
      field: 'credentialDetailId',
      headerName: '',
      flex: 2.5,
      renderCell: ({ row }: { row: CredentialData }) => (
        <>
          <Button
            size="small"
            color="error"
            variant="contained"
            className="statusBtn"
            onClick={() =>
              handleApproveDecline(row.credentialDetailId, StatusType.DECLINE)
            }
          >
            {t('global.actions.decline')}
          </Button>
          <Button
            size="small"
            color="success"
            variant="contained"
            className="statusBtn ml-10"
            onClick={() =>
              handleApproveDecline(row.credentialDetailId, StatusType.APPROVE)
            }
          >
            {t('global.actions.confirm')}
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="recommended-main">
      <PageLoadingTable<CredentialResponse[]>
        alignCell="start"
        toolbarVariant={'searchAndFilter'}
        hasBorder={false}
        columnHeadersBackgroundColor={'transparent'}
        searchExpr={expr}
        searchPlaceholder={t('content.adminCertificate.search')}
        onSearch={(expr: string) => {
          if (expr !== '') return
          setRefresh(Date.now())
          setExpr(expr)
        }}
        searchDebounce={1000}
        title=""
        loadLabel={t('global.actions.more')}
        fetchHook={useFetchCredentialsQuery}
        fetchHookArgs={{ expr }}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.companyId}
        columns={columns}
        defaultFilter={group}
        filterViews={filterButtons}
      />
    </div>
  )
}
