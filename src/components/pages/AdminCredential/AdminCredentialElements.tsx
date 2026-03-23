/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import './style.scss'
import {
  type CredentialData,
  type CredentialResponse,
  useApproveCredentialMutation,
  useDeclineCredentialMutation,
  useRevokeCredentialMutation,
  useFetchCredentialsSearchQuery,
  StatusEnum,
  useFetchSsiDocumentByIdMutation,
} from 'features/certification/certificationApiSlice'
import { download } from 'utils/downloadUtils'
import { error, success } from 'services/NotifyService'
import { uniqueId } from 'lodash'
import { setSearchInput } from 'features/appManagement/actions'
import { useDispatch } from 'react-redux'
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  PageLoadingTable,
  LoadingButton,
  StatusTag,
  Tooltips,
} from '@arena2036/portal-shared-components-construct-x'
import { ROLES } from 'types/Constants'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { userHasSsiCredentialRole } from 'services/AccessService'

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
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState<number>(0)
  const [group, setGroup] = useState<string>(FilterType.PENDING)
  const [sortOption, setSortOption] = useState<string>(SortType.BPNLASC)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [filterValueAPI, setFilterValueAPI] = useState<string>(
    FilterType.PENDING
  )
  const [fetchHookArgs, setFetchHookArgs] = useState<FetchHookArgsType>()
  const [approveDeclineLoading, setApproveDeclineLoading] = useState<string>()
  const [openRevokeOverlay, setOpenRevokeOverlay] = useState<boolean>(false)
  const [credentialData, setCredentialData] = useState<CredentialData>()
  const [revokeLoading, setRevokeLoading] = useState<boolean>(false)

  const [getDocumentById] = useFetchSsiDocumentByIdMutation()
  const [approveCredential] = useApproveCredentialMutation()
  const [declineCredential] = useDeclineCredentialMutation()
  const [revokeCredential] = useRevokeCredentialMutation()

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setFilterValueAPI(viewValue)
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  useEffect(() => {
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
    } catch (err) {
      error(t('content.adminCertificate.errorMessage'))
    }
  }

  const handleApproveDecline = async (
    credentialId: string,
    status: StatusType
  ) => {
    setApproveDeclineLoading(credentialId)
    const APIRequest =
      status === StatusType.APPROVE ? approveCredential : declineCredential
    await APIRequest(credentialId)
      .unwrap()
      .then(() => {
        success(
          t(
            `content.adminCertificate.${status === StatusType.APPROVE ? 'approvedMessage' : 'declinedMessage'}`
          )
        )
        setRefresh(Date.now())
      })
      .catch(() => {
        error(t('content.adminCertificate.errorMessage'))
      })
    setApproveDeclineLoading('')
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

  const renderApproveDeclineBtn = (row: CredentialData) => {
    if (row.participantStatus === StatusEnum.PENDING) {
      return (
        <div className="approveDeclineBtn">
          <Button
            size="small"
            color="success"
            variant="contained"
            className="statusBtn ml-10"
            disabled={approveDeclineLoading === row.credentialDetailId}
            onClick={() =>
              handleApproveDecline(row.credentialDetailId, StatusType.APPROVE)
            }
          >
            {t('global.actions.confirm')}
          </Button>
          <Button
            className={`hexagon ${approveDeclineLoading === row.credentialDetailId && 'disabledDecline'}`}
            disabled={approveDeclineLoading === row.credentialDetailId}
            onClick={() =>
              !approveDeclineLoading &&
              handleApproveDecline(row.credentialDetailId, StatusType.DECLINE)
            }
          >
            <Typography variant="body3">X</Typography>
          </Button>
        </div>
      )
    } else if (
      userHasSsiCredentialRole(ROLES.REVOKE_CREDENTIALS_ISSUER) &&
      row.participantStatus === StatusEnum.ACTIVE
    ) {
      return (
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
          }}
          tooltipPlacement="top-start"
          tooltipText={t('content.adminCertificate.table.revoke')}
          children={
            <SettingsBackupRestoreIcon
              className="revokeBtn"
              onClick={() => {
                setOpenRevokeOverlay(true)
                setCredentialData(row)
              }}
            />
          }
        />
      )
    }
  }

  const columns = [
    {
      field: 'credentialType',
      headerName: t('content.adminCertificate.table.crendentialType'),
      flex: 3,
      renderCell: ({ row }: { row: CredentialData }) =>
        i18n.exists(`content.adminCertificate.table.type.${row.credentialType}`)
          ? t(`content.adminCertificate.table.type.${row.credentialType}`)
          : row.credentialType,
    },
    {
      field: 'bpnl',
      headerName: t('content.adminCertificate.table.companyInfo'),
      flex: 2.5,
    },
    {
      field: 'useCase',
      headerName: t('content.adminCertificate.table.certificate'),
      flex: 2,
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
          {row.documents?.map((document) => (
            <div
              className={
                document.documentId ? 'documenticon-main' : 'document-disabled'
              }
              key={document.documentId || document.documentName}
              title={
                document.documentId
                  ? ''
                  : t('content.adminCertificate.noDocumentAvailable')
              }
            >
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
          ))}
        </>
      ),
    },
    {
      field: 'credentialDetailId',
      headerName: t('content.adminCertificate.table.status'),
      flex: 2,
      renderCell: ({ row }: { row: CredentialData }) => (
        <StatusTag
          color={
            row.participantStatus === StatusEnum.INACTIVE ? 'declined' : 'label'
          }
          label={row.participantStatus}
          sx={{
            height: '25px',
          }}
          size="small"
        />
      ),
    },
    {
      field: 'approveDecline',
      headerName: t('content.adminCertificate.table.action'),
      flex: 2.5,
      renderCell: ({ row }: { row: CredentialData }) =>
        renderApproveDeclineBtn(row),
    },
  ]

  const handleRevokeConfirm = async (credentialId: string) => {
    setRevokeLoading(true)
    try {
      await revokeCredential(credentialId).unwrap()
      success(t('content.adminCertificate.revokeOverlay.success'))
    } catch (err) {
      error(t('content.adminCertificate.revokeOverlay.error'))
    }
    setRevokeLoading(false)
    setOpenRevokeOverlay(false)
  }

  return (
    <>
      <Dialog
        open={openRevokeOverlay}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader
          title={t('content.adminCertificate.revokeOverlay.title')}
        />
        <DialogContent>
          <div className="revokeOverlay">
            <Typography variant="body2" className="description">
              {t('content.adminCertificate.revokeOverlay.description')}
            </Typography>
            <Typography variant="body3" className="subDesc">
              {t('content.adminCertificate.revokeOverlay.subDesc')}
            </Typography>
            <Typography variant="body3">
              {`${credentialData?.credentialType} ${credentialData?.externalTypeDetail ? credentialData?.externalTypeDetail.version : ''}`}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenRevokeOverlay(false)
            }}
          >
            {t('global.actions.close')}
          </Button>
          {revokeLoading ? (
            <LoadingButton
              color="primary"
              helperText=""
              helperTextColor="success"
              label=""
              loadIndicator={t('global.actions.loading')}
              loading
              size="medium"
              onButtonClick={() => {
                // do nothing
              }}
              sx={{ marginLeft: '10px' }}
            />
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                handleRevokeConfirm(credentialData?.credentialDetailId ?? '')
              }
            >
              {t('global.actions.confirm')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
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
          disableColumnSelector={true}
        />
      </div>
    </>
  )
}
